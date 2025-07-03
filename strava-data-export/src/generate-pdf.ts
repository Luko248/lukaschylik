import * as fs from "fs";
import PDFDocument from "pdfkit";
import axios from "axios";
import { parse } from "csv-parse/sync";

/**
 * Safely sanitizes text to ensure PDF compatibility
 */
function sanitizeText(text: string): string {
  if (!text) return "";
  // Remove emojis and special characters
  return text.replace(/[^\x20-\x7E]/g, "");
}

/**
 * Generates a PDF report from Strava runs data
 * Uses strict ASCII encoding for maximum compatibility
 */
async function generatePdf(): Promise<void> {
  try {
    console.log("Generating PDF report from Strava runs data...");
    
    const inputPath = "/Users/lukaschylik/Projects/lukaschylik/strava-data-export/output/strava_runs_2025_jan_to_june.csv";
    const outputPath = "/Users/lukaschylik/Projects/lukaschylik/strava-data-export/output/strava_runs_2025_jan_to_june.pdf";
    
    console.log(`Reading data from ${inputPath}...`);
    
    try {
      // Read and parse the CSV file with strict error handling
      const csvData = fs.readFileSync(inputPath, "ascii");
      
      // Parse CSV data with ASCII encoding
      const records = parse(csvData, {
        columns: true,
        skip_empty_lines: true,
        encoding: "ascii",
        relax_column_count: true
      });
    
    console.log(`Processing ${records.length} runs...`);
    
      // Create basic PDF document with minimal configuration
      const doc = new PDFDocument({
        margin: 50,
        size: "A4",
        layout: "portrait",
        info: {
          Title: "Strava Runs Report - Jan to Jun 2025",
          Author: "Strava Data Export Tool"
        }
      });
    
    // Pipe PDF to output file
    const stream = fs.createWriteStream(outputPath);
    doc.pipe(stream);
    
    // Download Strava logo (PNG format)
    const logoUrl = "https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/323_Strava_logo-512.png";
    const logoResponse = await axios.get(logoUrl, { responseType: "arraybuffer" });
    const logoBuffer = Buffer.from(logoResponse.data);
    
    // Add header with Strava logo
    doc.image(logoBuffer, 50, 45, { width: 80 })
      .fillColor("#000000") // Ensure text is black
      .fontSize(22)
      .font("Helvetica-Bold")
      .text("Strava Runs Report", 140, 50)
      .fontSize(16)
      .font("Helvetica")
      .text("January to June 2025", 140, 80);
    
    // Add summary section
    doc.moveDown(3)
      .fillColor("#000000") // Ensure text is black
      .fontSize(14)
      .font("Helvetica-Bold")
      .text("Summary", { underline: true });
    
    // Calculate summary statistics
    let totalDistance = 0;
    let totalDuration = 0;
    let totalElevation = 0;
    const months = ["January", "February", "March", "April", "May", "June"];
    const monthCounts: Record<string, number> = {};
    
    months.forEach(month => {
      monthCounts[month] = 0;
    });
    
    records.forEach((run: any) => {
      totalDistance += parseFloat(run["Distance (km)"]);
      totalDuration += parseFloat(run["Duration (minutes)"]);
      totalElevation += parseFloat(run["Elevation Gain (m)"]);
      
      const date = new Date(run.Date);
      const monthIndex = date.getMonth();
      if (monthIndex >= 0 && monthIndex <= 5) { // January to June
        const slovakMonth = months[monthIndex];
        monthCounts[slovakMonth] = (monthCounts[slovakMonth] || 0) + 1;
      }
    });
    
    doc.moveDown()
      .fillColor("#000000") // Ensure text is black
      .fontSize(12)
      .font("Helvetica")
      .text(`Total Runs: ${records.length}`)
      .text(`Total Distance: ${totalDistance.toFixed(2)} km`)
      .text(`Total Duration: ${(totalDuration / 60).toFixed(2)} hours`)
      .text(`Total Elevation Gain: ${totalElevation.toFixed(0)} m`)
      .text(`Average Distance per Run: ${(totalDistance / records.length).toFixed(2)} km`);
    
    // Add distribution by month
    doc.moveDown(2)
      .fillColor("#000000") // Ensure text is black
      .fontSize(14)
      .font("Helvetica-Bold")
      .text("Runs by Month", { underline: true });
    
    doc.moveDown()
      .fillColor("#000000") // Ensure text is black
      .fontSize(12)
      .font("Helvetica");
    
    months.forEach(month => {
      doc.text(`${month}: ${monthCounts[month]} runs`);
    });
    
    // Add table of runs
    doc.addPage();
    doc.fillColor("#000000") // Ensure text is black
      .fontSize(16)
      .font("Helvetica-Bold")
      .text("Detailed Runs", { underline: true });
    
    const tableTop = 100;
    const columnSpacing = [80, 150, 70, 70, 70];
    const columnPositions = [50];
    
    for (let i = 1; i < columnSpacing.length; i++) {
      columnPositions[i] = columnPositions[i - 1] + columnSpacing[i - 1];
    }
    
    // Draw table header with light gray background
    doc.rect(50, tableTop - 10, 500, 30)
      .fillOpacity(0.3)
      .fill("#DDDDDD");
      
    // Set text color explicitly to black
    doc.fillOpacity(1) // Reset opacity for text
      .fillColor("#000000")
      .fontSize(10)
      .font("Helvetica-Bold")
      .text("Date", columnPositions[0], tableTop)
      .text("Name", columnPositions[1], tableTop)
      .text("Distance (km)", columnPositions[2], tableTop)
      .text("Duration (min)", columnPositions[3], tableTop)
      .text("Elevation (m)", columnPositions[4], tableTop);
    
    doc.moveTo(50, tableTop + 20)
      .lineTo(550, tableTop + 20)
      .stroke();
    
    // Draw table rows
    let rowPosition = tableTop + 30;
    const rowHeight = 25;
    let currentPage = 1;
    
    records.forEach((run: any, i: number) => {
      // Check if we need a new page
      if (rowPosition > 750) {
        doc.addPage();
        rowPosition = 70;
        currentPage++;
        
        // Redraw header on new page
        doc.fillColor("#000000") // Ensure text is black
          .fontSize(10)
          .font("Helvetica-Bold")
          .text("Date", columnPositions[0], rowPosition - 20)
          .text("Name", columnPositions[1], rowPosition - 20)
          .text("Distance (km)", columnPositions[2], rowPosition - 20)
          .text("Duration (min)", columnPositions[3], rowPosition - 20)
          .text("Elevation (m)", columnPositions[4], rowPosition - 20);
        
        doc.moveTo(50, rowPosition)
          .lineTo(550, rowPosition)
          .stroke();
        
        rowPosition += 10;
      }
      
      try {
        // Format date in simple format to avoid locale issues
        const date = new Date(run.Date);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const formattedDate = `${month}/${day}/${year}`;
        
        // Sanitize run name to ensure ASCII compatibility
        let name = sanitizeText(run.Name || "");
        name = name.length > 18 ? name.substring(0, 15) + "..." : name;
        
        // Ensure all numeric values are properly formatted
        const distance = parseFloat(run["Distance (km)"]).toFixed(2);
        const duration = parseFloat(run["Duration (minutes)"]).toFixed(1);
        const elevation = parseFloat(run["Elevation Gain (m)"]).toFixed(1);
        
        doc.fillColor("#000000") // Ensure text is black
          .fontSize(9)
          .font("Helvetica")
          .text(formattedDate, columnPositions[0], rowPosition)
          .text(name, columnPositions[1], rowPosition)
          .text(distance, columnPositions[2], rowPosition)
          .text(duration, columnPositions[3], rowPosition)
          .text(elevation, columnPositions[4], rowPosition);
      } catch (err) {
        console.error(`Error processing run: ${JSON.stringify(run)}`);
        console.error(err);
      }
      
      // Add light gray background for alternating rows
      if (i % 2 === 0) {
        doc.rect(50, rowPosition - 5, 500, rowHeight)
          .fillOpacity(0.2)
          .fill("#DDDDDD");
      }
      
      // Reset fill opacity and color for text after drawing backgrounds
      doc.fillOpacity(1)
         .fillColor("#000000");
      
      rowPosition += rowHeight;
    });
    
    const totalPages = currentPage;
    
    // Add footer to current page
    doc.fillColor("#000000") // Ensure text is black
      .fontSize(8)
      .text(
        `Page ${currentPage} of ${totalPages}`,
        50,
        doc.page.height - 50,
        { align: "center", width: doc.page.width - 100 }
      );
    
    // Finalize PDF
    doc.end();
    
    console.log(`PDF report generated successfully at ${outputPath}`);
    console.log("You can now open the PDF file to view your Strava runs report.");
    
    } catch (error: any) {
      console.error("Error reading or parsing CSV:", error.message);
    }
  } catch (error: any) {
    console.error("Error generating PDF:", error.message);
  }
}

generatePdf();
