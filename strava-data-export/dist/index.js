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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const dotenv = __importStar(require("dotenv"));
const fs = __importStar(require("fs"));
const csv_writer_1 = require("csv-writer");
const path = __importStar(require("path"));
dotenv.config();
/**
 * Gets authentication tokens for Strava API access
 * @returns Promise with authentication response
 */
async function getAuthTokens() {
    try {
        // Check if we have an authorization code in the environment
        if (process.env.STRAVA_AUTH_CODE) {
            console.log("Using authorization code to get tokens...");
            const response = await axios_1.default.post("https://www.strava.com/oauth/token", {
                client_id: process.env.STRAVA_CLIENT_ID,
                client_secret: process.env.STRAVA_CLIENT_SECRET,
                code: process.env.STRAVA_AUTH_CODE,
                grant_type: "authorization_code"
            });
            // Save the refresh token to the .env file so we can use it next time
            console.log("Tokens obtained. Save these values in your .env file:");
            console.log(`STRAVA_ACCESS_TOKEN=${response.data.access_token}`);
            console.log(`STRAVA_REFRESH_TOKEN=${response.data.refresh_token}`);
            console.log(`STRAVA_TOKEN_EXPIRES_AT=${response.data.expires_at}`);
            return response.data;
        }
        // If we have a refresh token, use it
        else if (process.env.STRAVA_REFRESH_TOKEN) {
            console.log("Using refresh token to get access token...");
            const response = await axios_1.default.post("https://www.strava.com/oauth/token", {
                client_id: process.env.STRAVA_CLIENT_ID,
                client_secret: process.env.STRAVA_CLIENT_SECRET,
                refresh_token: process.env.STRAVA_REFRESH_TOKEN,
                grant_type: "refresh_token"
            });
            return response.data;
        }
        // If we have an access token that hasn't expired, use it directly
        else if (process.env.STRAVA_ACCESS_TOKEN &&
            process.env.STRAVA_TOKEN_EXPIRES_AT &&
            parseInt(process.env.STRAVA_TOKEN_EXPIRES_AT) > Math.floor(Date.now() / 1000)) {
            console.log("Using existing access token...");
            return {
                access_token: process.env.STRAVA_ACCESS_TOKEN,
                refresh_token: "",
                expires_at: parseInt(process.env.STRAVA_TOKEN_EXPIRES_AT)
            };
        }
        // No valid authentication method available
        else {
            throw new Error("No valid authentication method available. Please add STRAVA_AUTH_CODE, STRAVA_REFRESH_TOKEN, or a valid STRAVA_ACCESS_TOKEN to your .env file.");
        }
    }
    catch (error) {
        console.error("Authentication error:", error);
        throw error;
    }
}
/**
 * Fetches activities from Strava API for a given time range
 * @param accessToken - Strava API access token
 * @param startTime - Start timestamp in seconds
 * @param endTime - End timestamp in seconds
 * @returns Array of activities
 */
async function getActivities(accessToken, startTime, endTime) {
    const activities = [];
    let page = 1;
    const perPage = 100;
    let hasMoreActivities = true;
    while (hasMoreActivities) {
        try {
            const response = await axios_1.default.get("https://www.strava.com/api/v3/athlete/activities", {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                },
                params: {
                    after: startTime,
                    before: endTime,
                    per_page: perPage,
                    page: page
                }
            });
            if (response.data.length === 0) {
                hasMoreActivities = false;
            }
            else {
                activities.push(...response.data);
                page++;
            }
        }
        catch (error) {
            console.error(`Error fetching activities for page ${page}:`, error);
            hasMoreActivities = false;
        }
    }
    return activities;
}
/**
 * Filters activities to only include runs
 * @param activities - Array of Strava activities
 * @returns Array of run activities
 */
function filterRunActivities(activities) {
    return activities.filter(activity => activity.type === "Run");
}
/**
 * Formats activities for CSV export
 * @param activities - Array of Strava activities
 * @returns Array of formatted CSV records
 */
function formatActivitiesForCsv(activities) {
    return activities.map(activity => ({
        id: activity.id,
        name: activity.name,
        type: activity.type,
        date: activity.start_date,
        distance_km: Math.round((activity.distance / 1000) * 100) / 100,
        duration_minutes: Math.round((activity.elapsed_time / 60) * 100) / 100,
        moving_time_minutes: Math.round((activity.moving_time / 60) * 100) / 100,
        elevation_gain_m: activity.total_elevation_gain,
        avg_speed_kmh: Math.round((activity.average_speed * 3.6) * 100) / 100,
        max_speed_kmh: Math.round((activity.max_speed * 3.6) * 100) / 100,
        avg_heartrate: activity.average_heartrate,
        max_heartrate: activity.max_heartrate,
        calories: activity.calories
    }));
}
/**
 * Exports activities to CSV file
 * @param activities - Array of formatted CSV records
 * @param filename - Output CSV filename
 */
async function exportToCsv(activities, filename) {
    const csvWriter = (0, csv_writer_1.createObjectCsvWriter)({
        path: filename,
        header: [
            { id: "id", title: "ID" },
            { id: "name", title: "Name" },
            { id: "type", title: "Type" },
            { id: "date", title: "Date" },
            { id: "distance_km", title: "Distance (km)" },
            { id: "duration_minutes", title: "Duration (minutes)" },
            { id: "moving_time_minutes", title: "Moving Time (minutes)" },
            { id: "elevation_gain_m", title: "Elevation Gain (m)" },
            { id: "avg_speed_kmh", title: "Avg Speed (km/h)" },
            { id: "max_speed_kmh", title: "Max Speed (km/h)" },
            { id: "avg_heartrate", title: "Avg Heart Rate" },
            { id: "max_heartrate", title: "Max Heart Rate" },
            { id: "calories", title: "Calories" }
        ]
    });
    await csvWriter.writeRecords(activities);
    console.log(`Data exported to ${filename}`);
}
/**
 * Main function to run the data export process
 */
async function main() {
    try {
        console.log("Starting Strava data export...");
        if (!process.env.STRAVA_CLIENT_ID || !process.env.STRAVA_CLIENT_SECRET) {
            console.error("Missing required environment variables. Please set STRAVA_CLIENT_ID and STRAVA_CLIENT_SECRET in your .env file");
            process.exit(1);
        }
        // Use a very early date as start time (Strava started in 2009)
        const startTime = new Date("2009-01-01T00:00:00Z").getTime() / 1000;
        // Use current time as end time
        const endTime = Date.now() / 1000;
        console.log("Fetching ALL run activities from Strava...");
        console.log(`Date range: ${new Date(startTime * 1000).toISOString()} to ${new Date(endTime * 1000).toISOString()}`);
        // Get authentication tokens
        const authResponse = await getAuthTokens();
        console.log("Authentication successful");
        console.log(`Access token: ${authResponse.access_token.substring(0, 10)}...`);
        // Get all activities (no date filtering)
        const activities = await getActivities(authResponse.access_token, startTime, endTime);
        console.log(`Retrieved ${activities.length} total activities`);
        if (activities.length === 0) {
            console.log("No activities found. This could be due to authentication issues or no activities in your account.");
            console.log("Check your access token and ensure you've granted the necessary permissions.");
        }
        else {
            // Log some example activities to help debug
            console.log("Example activities:");
            for (let i = 0; i < Math.min(3, activities.length); i++) {
                console.log(`- ${activities[i].name} (${activities[i].type}) on ${activities[i].start_date}`);
            }
        }
        // Filter to only include runs
        const runActivities = filterRunActivities(activities);
        console.log(`Filtered to ${runActivities.length} run activities`);
        // Format for CSV export
        const csvData = formatActivitiesForCsv(runActivities);
        // Create output directory if it doesn't exist
        const outputDir = path.join(__dirname, "../output");
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }
        // Export to CSV
        const outputPath = path.join(outputDir, "strava_all_runs.csv");
        await exportToCsv(csvData, outputPath);
        console.log(`Data export completed successfully! File saved to: ${outputPath}`);
    }
    catch (error) {
        console.error("Error in data export process:");
        if (error.response) {
            console.error(`Status: ${error.response.status}`);
            console.error("Response data:", error.response.data);
        }
        else {
            console.error(error);
        }
        process.exit(1);
    }
}
main();
