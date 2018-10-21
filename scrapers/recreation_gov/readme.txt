
curl -d '{"facilityId":"232445"}' -H "Content-Type: application/json" -X POST http://localhost:3003/scrape


curl -d '{"facilityId":"5112", "baseUrl":"https://washington.goingtocamp.com", "path":"/AlderLake-TacomaPowerPark%2fEast(Sites1-40)%3fCalendar", "concurrency":2}' -H "Content-Type: application/json" -X POST http://204.48.25.66/scrape

# PM2

pm2 delete all

pm2 start src/config/server.development.yaml --watch


# Docker

docker build -t wanderinglabs/scraper-recreation-gov:latest .

docker tag wanderinglabs/scraper-recreation-gov:latest 302062960021.dkr.ecr.us-east-1.amazonaws.com/wanderinglabs/scraper-recreation-gov:latest

docker push 302062960021.dkr.ecr.us-east-1.amazonaws.com/wanderinglabs/scraper-recreation-gov:latest



# PRD

Docker creds for prd.. run this locally:
aws ecr get-login --no-include-email

docker pull 302062960021.dkr.ecr.us-east-1.amazonaws.com/wanderinglabs/scraper-recreation-gov:latest
docker run -d -p 80:3003 --env-file ./.env 302062960021.dkr.ecr.us-east-1.amazonaws.com/wanderinglabs/scraper-recreation-gov:latest
