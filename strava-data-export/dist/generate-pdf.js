"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var fs = require("fs");
var axios_1 = require("axios");
var sync_1 = require("csv-parse/sync");
var PDFDocument = require("pdfkit");
/**
 * Safely sanitizes text to ensure PDF compatibility
 */
function sanitizeText(text) {
    if (!text)
        return "";
    // Remove emojis and special characters
    return text.replace(/[^\x20-\x7E]/g, "");
}
/**
 * Generates a PDF report from Strava runs data
 * Uses strict ASCII encoding for maximum compatibility
 */
function generatePdf() {
    return __awaiter(this, void 0, void 0, function () {
        var inputPath, outputPath, csvData, records, doc_1, stream, logoUrl, logoResponse, logoBuffer, totalDistance_1, totalDuration_1, totalElevation_1, months_1, monthCounts_1, tableTop, columnSpacing, columnPositions_1, i, rowPosition_1, rowHeight_1, currentPage_1, totalPages, error_1, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    console.log("Generating PDF report from Strava runs data...");
                    inputPath = "/Users/lukaschylik/Projects/lukaschylik/strava-data-export/output/strava_runs_2025_jan_to_june.csv";
                    outputPath = "/Users/lukaschylik/Projects/lukaschylik/strava-data-export/output/strava_runs_2025_jan_to_june.pdf";
                    console.log("Reading data from ".concat(inputPath, "..."));
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    csvData = fs.readFileSync(inputPath, "ascii");
                    records = (0, sync_1.parse)(csvData, {
                        columns: true,
                        skip_empty_lines: true,
                        encoding: "ascii",
                        relax_column_count: true
                    });
                    console.log("Processing ".concat(records.length, " runs..."));
                    doc_1 = new PDFDocument({
                        margin: 50,
                        size: "A4",
                        layout: "portrait",
                        info: {
                            Title: "Strava Runs Report - Jan to Jun 2025",
                            Author: "Strava Data Export Tool",
                            User: "Lukáš Chylík",
                            UserEmail: "chylik.lukas@gmail.com"
                        }
                    });
                    stream = fs.createWriteStream(outputPath);
                    doc_1.pipe(stream);
                    logoUrl = "https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/323_Strava_logo-512.png";
                    return [4 /*yield*/, axios_1["default"].get(logoUrl, { responseType: "arraybuffer" })];
                case 2:
                    logoResponse = _a.sent();
                    logoBuffer = Buffer.from(logoResponse.data);
                    // Add header with Strava logo
                    doc_1.image(logoBuffer, 50, 45, { width: 80 })
                        .fillColor("#000000") // Ensure text is black
                        .fontSize(22)
                        .font("Helvetica-Bold")
                        .text("Strava Runs Report", 140, 50)
                        .fontSize(16)
                        .font("Helvetica")
                        .text("January to June 2025", 140, 80);
                    // Add user information
                    doc_1.moveDown(1)
                        .fillColor("#000000")
                        .fontSize(12)
                        .font("Helvetica")
                        .text("User: Lukas Chylik", 140, 105)
                        .text("User Email: chylik.lukas@gmail.com", 140, 120);
                    // Add summary section
                    doc_1.moveDown(2)
                        .fillColor("#000000") // Ensure text is black
                        .fontSize(14)
                        .font("Helvetica-Bold")
                        .text("Summary", { underline: true });
                    totalDistance_1 = 0;
                    totalDuration_1 = 0;
                    totalElevation_1 = 0;
                    months_1 = ["January", "February", "March", "April", "May", "June"];
                    monthCounts_1 = {};
                    months_1.forEach(function (month) {
                        monthCounts_1[month] = 0;
                    });
                    records.forEach(function (run) {
                        totalDistance_1 += parseFloat(run["Distance (km)"]);
                        totalDuration_1 += parseFloat(run["Duration (minutes)"]);
                        totalElevation_1 += parseFloat(run["Elevation Gain (m)"]);
                        var date = new Date(run.Date);
                        var monthIndex = date.getMonth();
                        if (monthIndex >= 0 && monthIndex <= 5) { // January to June
                            var slovakMonth = months_1[monthIndex];
                            monthCounts_1[slovakMonth] = (monthCounts_1[slovakMonth] || 0) + 1;
                        }
                    });
                    doc_1.moveDown()
                        .fillColor("#000000") // Ensure text is black
                        .fontSize(12)
                        .font("Helvetica")
                        .text("Total Runs: ".concat(records.length))
                        .text("Total Distance: ".concat(totalDistance_1.toFixed(2), " km"))
                        .text("Total Duration: ".concat((totalDuration_1 / 60).toFixed(2), " hours"))
                        .text("Total Elevation Gain: ".concat(totalElevation_1.toFixed(0), " m"))
                        .text("Average Distance per Run: ".concat((totalDistance_1 / records.length).toFixed(2), " km"));
                    // Add distribution by month
                    doc_1.moveDown(2)
                        .fillColor("#000000") // Ensure text is black
                        .fontSize(14)
                        .font("Helvetica-Bold")
                        .text("Runs by Month", { underline: true });
                    doc_1.moveDown()
                        .fillColor("#000000") // Ensure text is black
                        .fontSize(12)
                        .font("Helvetica");
                    months_1.forEach(function (month) {
                        doc_1.text("".concat(month, ": ").concat(monthCounts_1[month], " runs"));
                    });
                    // Add table of runs
                    doc_1.addPage();
                    doc_1.fillColor("#000000") // Ensure text is black
                        .fontSize(16)
                        .font("Helvetica-Bold")
                        .text("Detailed Runs", { underline: true });
                    tableTop = 100;
                    columnSpacing = [80, 150, 70, 70, 70];
                    columnPositions_1 = [50];
                    for (i = 1; i < columnSpacing.length; i++) {
                        columnPositions_1[i] = columnPositions_1[i - 1] + columnSpacing[i - 1];
                    }
                    // Draw table header with light gray background
                    doc_1.rect(50, tableTop - 10, 500, 30)
                        .fillOpacity(0.3)
                        .fill("#DDDDDD");
                    // Set text color explicitly to black
                    doc_1.fillOpacity(1) // Reset opacity for text
                        .fillColor("#000000")
                        .fontSize(10)
                        .font("Helvetica-Bold")
                        .text("Date", columnPositions_1[0], tableTop)
                        .text("Name", columnPositions_1[1], tableTop)
                        .text("Distance (km)", columnPositions_1[2], tableTop)
                        .text("Duration (min)", columnPositions_1[3], tableTop)
                        .text("Elevation (m)", columnPositions_1[4], tableTop);
                    doc_1.moveTo(50, tableTop + 20)
                        .lineTo(550, tableTop + 20)
                        .stroke();
                    rowPosition_1 = tableTop + 30;
                    rowHeight_1 = 25;
                    currentPage_1 = 1;
                    records.forEach(function (run, i) {
                        // Check if we need a new page
                        if (rowPosition_1 > 750) {
                            doc_1.addPage();
                            rowPosition_1 = 70;
                            currentPage_1++;
                            // Redraw header on new page
                            doc_1.fillColor("#000000") // Ensure text is black
                                .fontSize(10)
                                .font("Helvetica-Bold")
                                .text("Date", columnPositions_1[0], rowPosition_1 - 20)
                                .text("Name", columnPositions_1[1], rowPosition_1 - 20)
                                .text("Distance (km)", columnPositions_1[2], rowPosition_1 - 20)
                                .text("Duration (min)", columnPositions_1[3], rowPosition_1 - 20)
                                .text("Elevation (m)", columnPositions_1[4], rowPosition_1 - 20);
                            doc_1.moveTo(50, rowPosition_1)
                                .lineTo(550, rowPosition_1)
                                .stroke();
                            rowPosition_1 += 10;
                        }
                        try {
                            // Format date in simple format to avoid locale issues
                            var date = new Date(run.Date);
                            var year = date.getFullYear();
                            var month = date.getMonth() + 1;
                            var day = date.getDate();
                            var formattedDate = "".concat(month, "/").concat(day, "/").concat(year);
                            // Sanitize run name to ensure ASCII compatibility
                            var name_1 = sanitizeText(run.Name || "");
                            name_1 = name_1.length > 18 ? name_1.substring(0, 15) + "..." : name_1;
                            // Ensure all numeric values are properly formatted
                            var distance = parseFloat(run["Distance (km)"]).toFixed(2);
                            var duration = parseFloat(run["Duration (minutes)"]).toFixed(1);
                            var elevation = parseFloat(run["Elevation Gain (m)"]).toFixed(1);
                            doc_1.fillColor("#000000") // Ensure text is black
                                .fontSize(9)
                                .font("Helvetica")
                                .text(formattedDate, columnPositions_1[0], rowPosition_1)
                                .text(name_1, columnPositions_1[1], rowPosition_1)
                                .text(distance, columnPositions_1[2], rowPosition_1)
                                .text(duration, columnPositions_1[3], rowPosition_1)
                                .text(elevation, columnPositions_1[4], rowPosition_1);
                        }
                        catch (err) {
                            console.error("Error processing run: ".concat(JSON.stringify(run)));
                            console.error(err);
                        }
                        // Add light gray background for alternating rows
                        if (i % 2 === 0) {
                            doc_1.rect(50, rowPosition_1 - 5, 500, rowHeight_1)
                                .fillOpacity(0.2)
                                .fill("#DDDDDD");
                        }
                        // Reset fill opacity and color for text after drawing backgrounds
                        doc_1.fillOpacity(1)
                            .fillColor("#000000");
                        rowPosition_1 += rowHeight_1;
                    });
                    totalPages = currentPage_1;
                    // Add footer to current page
                    doc_1.fillColor("#000000") // Ensure text is black
                        .fontSize(8)
                        .text("Page ".concat(currentPage_1, " of ").concat(totalPages), 50, doc_1.page.height - 50, { align: "center", width: doc_1.page.width - 100 });
                    // Finalize PDF
                    doc_1.end();
                    console.log("PDF report generated successfully at ".concat(outputPath));
                    console.log("You can now open the PDF file to view your Strava runs report.");
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.error("Error reading or parsing CSV:", error_1.message);
                    return [3 /*break*/, 4];
                case 4: return [3 /*break*/, 6];
                case 5:
                    error_2 = _a.sent();
                    console.error("Error generating PDF:", error_2.message);
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
}
generatePdf();
