# Strava Run Data Export

This script downloads your run data from Strava for January to June 2021 and exports it to a CSV file.

## Setup

1. **Install dependencies**:

```bash
cd strava-data-export
npm install
```

2. **Strava API Access**:

You'll need to create a Strava API application and obtain the necessary credentials:

- Go to [https://www.strava.com/settings/api](https://www.strava.com/settings/api)
- Create an API application
- Note your Client ID and Client Secret
- For the initial authorization, visit the following URL in your browser (replace YOUR_CLIENT_ID with your actual client ID):
  
```
https://www.strava.com/oauth/authorize?client_id=YOUR_CLIENT_ID&redirect_uri=http://localhost&response_type=code&scope=activity:read_all
```

- After authorization, you'll be redirected to a URL with a code parameter
- Use this code to get your refresh token:

```bash
curl -X POST https://www.strava.com/oauth/token \
  -F client_id=YOUR_CLIENT_ID \
  -F client_secret=YOUR_CLIENT_SECRET \
  -F code=AUTHORIZATION_CODE_FROM_PREVIOUS_STEP \
  -F grant_type=authorization_code
```

3. **Configure environment variables**:

Create a `.env` file in the project root and add your Strava API credentials:

```
STRAVA_CLIENT_ID=your_client_id_here
STRAVA_CLIENT_SECRET=your_client_secret_here
STRAVA_REFRESH_TOKEN=your_refresh_token_here
```

## Usage

1. **Build the TypeScript code**:

```bash
npm run build
```

2. **Run the script**:

```bash
npm start
```

The script will:
- Authenticate with Strava API
- Download all run activities from January to June 2021
- Export the data to a CSV file in the `output` directory

## Output

The CSV file will contain the following information for each run:
- ID
- Name
- Type
- Date
- Distance (km)
- Duration (minutes)
- Moving Time (minutes)
- Elevation Gain (m)
- Average Speed (km/h)
- Maximum Speed (km/h)
- Average Heart Rate (if available)
- Maximum Heart Rate (if available)
- Calories (if available)

The output file will be saved as `output/strava_runs_2021_jan_to_june.csv`.
