RCE = Site


https://washington.goingtocamp.com/RceAvail.aspx?rceId=e9128128-ad35-47a7-928f-d6cfc382286e&nav=4

javascript:SelectRce('f34615e2-2eff-4e20-859b-476b85d50001','13d32c23-a9c8-480d-864e-5670651f193d','e9128128-ad35-47a7-928f-d6cfc382286e');
javascript:SelectRce('f34615e2-2eff-4e20-859b-476b85d50001','13d32c23-a9c8-480d-864e-5670651f193d','53ce4d25-f294-4995-95b9-9073b8f2178b');



https://washington.goingtocamp.com/view.ashx?view=grid&nav=1&order=Next
https://washington.goingtocamp.com/view.ashx?nav=1

# Docker

docker build -t wanderinglabs/scraper-camis:latest .

docker tag wanderinglabs/scraper-camis:latest 302062960021.dkr.ecr.us-east-1.amazonaws.com/wanderinglabs/scraper-camis:latest
docker push 302062960021.dkr.ecr.us-east-1.amazonaws.com/wanderinglabs/scraper-camis:latest

# PRD
docker pull 302062960021.dkr.ecr.us-east-1.amazonaws.com/wanderinglabs/scraper-camis:latest
docker run -d -p 80:3003 --env-file ./.env 302062960021.dkr.ecr.us-east-1.amazonaws.com/wanderinglabs/scraper-camis:latest


# DEV
docker run -d -p 3003:3003 --env-file ./.env wanderinglabs/scraper:camis.0.4

curl -d '{"facilityId":"5112", "baseUrl":"https://washington.goingtocamp.com", "path":"/AlderLake-TacomaPowerPark%2fEast(Sites1-40)%3fCalendar", "concurrency":2}' -H "Content-Type: application/json" -X POST http://192.168.99.100:3003/scrape


curl -d '{"facilityId":"5112", "baseUrl":"https://washington.goingtocamp.com", "path":"/AlderLake-TacomaPowerPark%2fEast(Sites1-40)%3fCalendar", "concurrency":2}' -H "Content-Type: application/json" -X POST http://204.48.25.66/scrape

# PM2

pm2 delete all

pm2 start src/config/server.development.yml --watch


# Claudia Setup

// package.json
"build:install": "cp package.json dist/ && cp claudia.json dist/ && cp production-env.json dist/ && cd dist",
"lambda-create": "claudia create --name ScraperV2_Camis --region us-east-1 --handler index.handler --source dist --set-env-from-json production-env.json",
"lambda-test": "claudia test-lambda --event mock/event.json",
"deploy": "claudia update --source dist --set-env-from-json production-env.json"

// claudia.json
{
  "lambda": {
    "role": "ScraperV2_Camis-executor",
    "name": "ScraperV2_Camis",
    "region": "us-east-1"
  }
}

// production-env.json
{
  "AWS_ACCESS_KEY_ID_WL": "-",
  "AWS_SECRET_ACCESS_KEY_WL": "-",
  "AWS_REGION_WL": "us-east-1",
  "AWS_BUCKET": "availabilities-prd",
  "RESERVE_API_URL": "http://-"
}
