"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const sync_1 = require("csv-parse/sync");
const csv_writer_1 = require("csv-writer");
/**
 * Filters runs from January to June 2021 from a CSV file
 */
async function filterRuns() {
    try {
        // Read the CSV file
        const inputPath = path.join(__dirname, "../output/strava_all_runs.csv");
        const outputPath = path.join(__dirname, "../output/strava_runs_2021_jan_to_june.csv");
        console.log(`Reading data from ${inputPath}...`);
        const csvData = fs.readFileSync(inputPath, "utf8");
        // Parse the CSV data
        const records = (0, sync_1.parse)(csvData, {
            columns: true,
            skip_empty_lines: true
        });
        console.log(`Total records: ${records.length}`);
        // Filter records from January to June 2021
        const startDate = new Date("2021-01-01T00:00:00Z");
        const endDate = new Date("2021-06-30T23:59:59Z");
        const filteredRuns = records.filter((run) => {
            const runDate = new Date(run.Date);
            return runDate >= startDate && runDate <= endDate;
        });
        console.log(`Filtered runs (Jan-Jun 2021): ${filteredRuns.length}`);
        if (filteredRuns.length === 0) {
            console.log("No runs found in the specified date range.");
            return;
        }
        // Write the filtered data to a new CSV
        const csvWriter = (0, csv_writer_1.createObjectCsvWriter)({
            path: outputPath,
            header: Object.keys(records[0]).map(id => ({ id, title: id }))
        });
        await csvWriter.writeRecords(filteredRuns);
        console.log(`Filtered data saved to ${outputPath}`);
    }
    catch (error) {
        console.error("Error filtering runs:", error.message);
    }
}
filterRuns();
