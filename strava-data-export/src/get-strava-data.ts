import axios from "axios";
import * as fs from "fs";
import * as path from "path";
import { createObjectCsvWriter } from "csv-writer";

/**
 * One-script solution to download all Strava runs
 */
async function getStravaData() {
  try {
    console.log("========================================");
    console.log("STRAVA RUN DATA EXPORTER");
    console.log("========================================");
    
    // Step 1: Get authorization
    const clientId = process.argv[2];
    const clientSecret = process.argv[3];
    const authCode = process.argv[4];
    
    if (!clientId || !clientSecret) {
      console.log("\nUsage: node get-strava-data.js CLIENT_ID CLIENT_SECRET [AUTH_CODE]");
      console.log("\nStep 1: Visit https://www.strava.com/settings/api and create an API application");
      console.log("Step 2: Copy your Client ID and Client Secret");
      console.log("Step 3: Run this script with those values");
      console.log(`\nExample: node dist/get-strava-data.js 12345 a1b2c3d4e5f6`);
      console.log("\nIf this is your first time running the script, it will give you a URL to authorize with Strava.");
      console.log("After authorizing, you'll get a code that you'll need to run the script again with that code.");
      process.exit(1);
    }
    
    let accessToken = "";
    
    // If auth code is provided, exchange it for an access token
    if (authCode) {
      console.log("\nExchanging authorization code for access token...");
      try {
        const tokenResponse = await axios.post("https://www.strava.com/oauth/token", {
          client_id: clientId,
          client_secret: clientSecret,
          code: authCode,
          grant_type: "authorization_code"
        });
        
        accessToken = tokenResponse.data.access_token;
        console.log("✅ Access token obtained successfully!");
      } catch (error: any) {
        console.error("❌ Error exchanging authorization code:");
        console.error(error.response?.data || error.message);
        process.exit(1);
      }
    } else {
      // If no auth code is provided, generate the authorization URL
      console.log("\nFirst, you need to authorize this app with your Strava account.");
      console.log("\n1. Open this URL in your browser:");
      console.log(`https://www.strava.com/oauth/authorize?client_id=${clientId}&redirect_uri=http://localhost&response_type=code&scope=activity:read_all,profile:read_all`);
      console.log("\n2. Click 'Authorize' on the Strava page");
      console.log("\n3. You'll be redirected to localhost (which may show an error page, that's OK)");
      console.log("\n4. Copy the 'code' parameter from the URL in your browser's address bar");
      console.log("   For example, if redirected to http://localhost/?state=&code=abc123def456, copy 'abc123def456'");
      console.log("\n5. Run this script again with the code as the third parameter:");
      console.log(`   node dist/get-strava-data.js ${clientId} ${clientSecret} YOUR_CODE_HERE`);
      process.exit(0);
    }
    
    // Step 2: Fetch activities
    console.log("\nFetching your Strava activities...");
    
    const activities = [];
    let page = 1;
    let hasMoreActivities = true;
    
    while (hasMoreActivities) {
      try {
        console.log(`Fetching page ${page}...`);
        const response = await axios.get("https://www.strava.com/api/v3/athlete/activities", {
          headers: {
            Authorization: `Bearer ${accessToken}`
          },
          params: {
            per_page: 100,
            page: page
          }
        });
        
        if (response.data.length === 0) {
          hasMoreActivities = false;
        } else {
          activities.push(...response.data);
          console.log(`Retrieved ${response.data.length} activities from page ${page}`);
          page++;
        }
      } catch (error: any) {
        console.error(`❌ Error fetching activities:`);
        console.error(error.response?.data || error.message);
        hasMoreActivities = false;
      }
    }
    
    console.log(`\n✅ Total activities retrieved: ${activities.length}`);
    
    // Step 3: Filter runs
    const runs = activities.filter(activity => activity.type === "Run");
    console.log(`✅ Total runs: ${runs.length}`);
    
    // Step 4: Format for CSV
    const csvData = runs.map(run => ({
      id: run.id,
      name: run.name,
      date: run.start_date,
      distance_km: Math.round((run.distance / 1000) * 100) / 100,
      duration_minutes: Math.round((run.elapsed_time / 60) * 100) / 100,
      moving_time_minutes: Math.round((run.moving_time / 60) * 100) / 100,
      elevation_gain_m: run.total_elevation_gain,
      avg_speed_kmh: Math.round((run.average_speed * 3.6) * 100) / 100,
      max_speed_kmh: Math.round((run.max_speed * 3.6) * 100) / 100,
      avg_heartrate: run.average_heartrate,
      max_heartrate: run.max_heartrate,
      calories: run.calories
    }));
    
    // Step 5: Export to CSV
    const outputDir = path.join(__dirname, "../output");
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    const outputFile = path.join(outputDir, "strava_all_runs.csv");
    
    const csvWriter = createObjectCsvWriter({
      path: outputFile,
      header: [
        { id: "id", title: "ID" },
        { id: "name", title: "Name" },
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
    
    await csvWriter.writeRecords(csvData);
    console.log(`\n✅ Data successfully exported to ${outputFile}`);
    
  } catch (error: any) {
    console.error("❌ An error occurred:");
    console.error(error.message);
    process.exit(1);
  }
}

getStravaData();
