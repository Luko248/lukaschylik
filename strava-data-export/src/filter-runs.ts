import * as fs from "fs";
import * as path from "path";
import { parse } from "csv-parse/sync";
import { createObjectCsvWriter } from "csv-writer";

/**
 * Filters runs from January to June 2021 from a CSV file
 */
async function filterRuns(): Promise<void> {
  try {
    // Read the CSV file
    const inputPath = path.join(__dirname, "../output/strava_all_runs.csv");
    const outputPath = path.join(__dirname, "../output/strava_runs_2021_jan_to_june.csv");
    
    console.log(`Reading data from ${inputPath}...`);
    const csvData = fs.readFileSync(inputPath, "utf8");
    
    // Parse the CSV data
    const records = parse(csvData, {
      columns: true,
      skip_empty_lines: true
    });
    
    console.log(`Total records: ${records.length}`);
    
    // Filter records from January to June 2021
    const startDate = new Date("2021-01-01T00:00:00Z");
    const endDate = new Date("2021-06-30T23:59:59Z");
    
    const filteredRuns = records.filter((run: any) => {
      const runDate = new Date(run.Date);
      return runDate >= startDate && runDate <= endDate;
    });
    
    console.log(`Filtered runs (Jan-Jun 2021): ${filteredRuns.length}`);
    
    if (filteredRuns.length === 0) {
      console.log("No runs found in the specified date range.");
      return;
    }
    
    // Write the filtered data to a new CSV
    const csvWriter = createObjectCsvWriter({
      path: outputPath,
      header: Object.keys(records[0]).map(id => ({ id, title: id }))
    });
    
    await csvWriter.writeRecords(filteredRuns);
    console.log(`Filtered data saved to ${outputPath}`);
    
  } catch (error: any) {
    console.error("Error filtering runs:", error.message);
  }
}

filterRuns();
