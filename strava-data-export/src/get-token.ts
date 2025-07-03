import axios from "axios";
import * as dotenv from "dotenv";

dotenv.config();

async function getToken() {
  const clientId = process.env.STRAVA_CLIENT_ID;
  const clientSecret = process.env.STRAVA_CLIENT_SECRET;
  
  if (!clientId || !clientSecret) {
    console.error("Missing STRAVA_CLIENT_ID or STRAVA_CLIENT_SECRET in .env file");
    process.exit(1);
  }

  // If we have an authorization code, exchange it for tokens
  const authCode = process.argv[2];
  
  if (!authCode) {
    console.log("=================================");
    console.log("STRAVA API AUTHORIZATION PROCESS");
    console.log("=================================");
    console.log("\nStep 1: Open this URL in your browser:");
    console.log(`https://www.strava.com/oauth/authorize?client_id=${clientId}&redirect_uri=http://localhost&response_type=code&scope=activity:read_all,profile:read_all`);
    console.log("\nStep 2: After authorization, copy the 'code' parameter from the redirect URL");
    console.log("For example, if redirected to http://localhost/?state=&code=abc123, copy 'abc123'");
    console.log("\nStep 3: Run this script again with the code as a parameter:");
    console.log("node dist/get-token.js CODE_FROM_STEP_2");
    process.exit(0);
  }

  try {
    console.log("Exchanging authorization code for tokens...");
    const response = await axios.post("https://www.strava.com/oauth/token", {
      client_id: clientId,
      client_secret: clientSecret,
      code: authCode,
      grant_type: "authorization_code"
    });

    console.log("\n=================================");
    console.log("SUCCESS! AUTHENTICATION TOKENS RECEIVED");
    console.log("=================================");
    console.log("\nCopy these values to your .env file:");
    console.log(`\nSTRAVA_ACCESS_TOKEN=${response.data.access_token}`);
    console.log(`STRAVA_REFRESH_TOKEN=${response.data.refresh_token}`);
    console.log(`STRAVA_TOKEN_EXPIRES_AT=${response.data.expires_at}`);
    console.log("\nThen run the main script: node dist/index.js");
  } catch (error: any) {
    console.error("Error getting tokens:", error.response?.data || error.message);
  }
}

getToken();
