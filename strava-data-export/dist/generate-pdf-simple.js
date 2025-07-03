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
var pdfkit = require("pdfkit");
var axios_1 = require("axios");
var sync_1 = require("csv-parse/sync");
/**
 * Sanitizes text to ensure PDF compatibility
 */
function sanitizeText(text) {
    if (!text)
        return "";
    return text.replace(/[^\x20-\x7E]/g, "");
}
/**
 * Generates a PDF report from Strava runs data with ASCII encoding
 */
function generatePdf() {
    return __awaiter(this, void 0, void 0, function () {
        var inputPath, outputPath, csvData, records, doc_1, stream, logoUrl, logoResponse, logoBuffer, totalDistance_1, totalDuration_1, totalElevation_1, tableTop, rowHeight_1, rowPosition_1, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    console.log("Generating PDF report from Strava runs data...");
                    inputPath = "/Users/lukaschylik/Projects/lukaschylik/strava-data-export/output/strava_runs_2025_jan_to_june.csv";
                    outputPath = "/Users/lukaschylik/Projects/lukaschylik/strava-data-export/output/strava_runs_2025_jan_to_june.pdf";
                    console.log("Reading data from ".concat(inputPath, "..."));
                    csvData = fs.readFileSync(inputPath, "utf8");
                    records = (0, sync_1.parse)(csvData, {
                        columns: true,
                        skip_empty_lines: true
                    });
                    console.log("Processing ".concat(records.length, " runs..."));
                    doc_1 = new pdfkit["default"]({
                        margin: 50,
                        size: "A4"
                    });
                    stream = fs.createWriteStream(outputPath);
                    doc_1.pipe(stream);
                    logoUrl = "https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/323_Strava_logo-512.png";
                    return [4 /*yield*/, axios_1["default"].get(logoUrl, { responseType: "arraybuffer" })];
                case 1:
                    logoResponse = _a.sent();
                    logoBuffer = Buffer.from(logoResponse.data);
                    // Add header with Strava logo
                    doc_1.image(logoBuffer, 50, 45, { width: 80 })
                        .fillColor("#000000")
                        .fontSize(22)
                        .font("Helvetica-Bold")
                        .text("Strava Runs Report", 140, 50)
                        .fontSize(16)
                        .font("Helvetica")
                        .text("January to June 2025", 140, 80);
                    totalDistance_1 = 0;
                    totalDuration_1 = 0;
                    totalElevation_1 = 0;
                    records.forEach(function (run) {
                        totalDistance_1 += parseFloat(run["Distance (km)"]);
                        totalDuration_1 += parseFloat(run["Duration (minutes)"]);
                        totalElevation_1 += parseFloat(run["Elevation Gain (m)"]);
                    });
                    // Add summary section
                    doc_1.moveDown(3)
                        .fillColor("#000000")
                        .fontSize(14)
                        .font("Helvetica-Bold")
                        .text("Summary", { underline: true });
                    doc_1.moveDown()
                        .fillColor("#000000")
                        .fontSize(12)
                        .font("Helvetica")
                        .text("Total Runs: ".concat(records.length))
                        .text("Total Distance: ".concat(totalDistance_1.toFixed(2), " km"))
                        .text("Total Duration: ".concat((totalDuration_1 / 60).toFixed(2), " hours"))
                        .text("Total Elevation Gain: ".concat(totalElevation_1.toFixed(0), " m"))
                        .text("Average Distance per Run: ".concat((totalDistance_1 / records.length).toFixed(2), " km"));
                    // Add table of runs
                    doc_1.addPage();
                    doc_1.fillColor("#000000")
                        .fontSize(16)
                        .font("Helvetica-Bold")
                        .text("Detailed Runs", { underline: true });
                    tableTop = 100;
                    rowHeight_1 = 20;
                    rowPosition_1 = tableTop + 30;
                    // Draw table header
                    doc_1.rect(50, tableTop - 10, 500, 30)
                        .fillOpacity(0.3)
                        .fill("#DDDDDD");
                    doc_1.fillOpacity(1)
                        .fillColor("#000000")
                        .fontSize(10)
                        .font("Helvetica-Bold")
                        .text("Date", 60, tableTop)
                        .text("Name", 150, tableTop)
                        .text("Distance (km)", 300, tableTop)
                        .text("Duration (min)", 380, tableTop)
                        .text("Elevation (m)", 460, tableTop);
                    // Draw table rows
                    records.forEach(function (run, i) {
                        try {
                            // Format date simply to avoid locale issues
                            var date = new Date(run.Date);
                            var formattedDate = "".concat(date.getMonth() + 1, "/").concat(date.getDate(), "/").concat(date.getFullYear());
                            // Sanitize name
                            var name_1 = sanitizeText(run.Name || "");
                            var displayName = name_1.length > 20 ? name_1.substring(0, 17) + "..." : name_1;
                            // Format values
                            var distance = parseFloat(run["Distance (km)"]).toFixed(2);
                            var duration = parseFloat(run["Duration (minutes)"]).toFixed(1);
                            var elevation = parseFloat(run["Elevation Gain (m)"]).toFixed(1);
                            // Add row background for alternating rows
                            if (i % 2 === 0) {
                                doc_1.rect(50, rowPosition_1 - 5, 500, rowHeight_1)
                                    .fillOpacity(0.2)
                                    .fill("#DDDDDD");
                            }
                            // Reset opacity for text and draw row data
                            doc_1.fillOpacity(1)
                                .fillColor("#000000")
                                .fontSize(9)
                                .font("Helvetica")
                                .text(formattedDate, 60, rowPosition_1)
                                .text(displayName, 150, rowPosition_1)
                                .text(distance, 300, rowPosition_1)
                                .text(duration, 380, rowPosition_1)
                                .text(elevation, 460, rowPosition_1);
                        }
                        catch (err) {
                            console.error("Error processing run:", err);
                        }
                        rowPosition_1 += rowHeight_1;
                        // Add a new page if needed
                        if (rowPosition_1 > doc_1.page.height - 50) {
                            doc_1.addPage();
                            rowPosition_1 = 50;
                            // Re-add header on new page
                            doc_1.fillColor("#000000")
                                .fontSize(10)
                                .font("Helvetica-Bold")
                                .text("Date", 60, 30)
                                .text("Name", 150, 30)
                                .text("Distance (km)", 300, 30)
                                .text("Duration (min)", 380, 30)
                                .text("Elevation (m)", 460, 30);
                            doc_1.moveTo(50, 50)
                                .lineTo(550, 50)
                                .stroke();
                        }
                    });
                    // Add page number
                    doc_1.fontSize(8)
                        .text("Page 1 of 1", 50, doc_1.page.height - 50, { align: "center", width: doc_1.page.width - 100 });
                    // Finalize PDF
                    doc_1.end();
                    console.log("PDF report generated successfully at ".concat(outputPath));
                    console.log("You can now open the PDF file to view your Strava runs report.");
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    console.error("Error generating PDF:", error_1.message);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
// Execute the function
generatePdf();
