// http://s3.amazonaws.com/availabilities-dev/artifact.zip

docker build -t wanderinglabs/scraper-reserve_ca:latest .

docker run -d -p 3003:3003 --env-file ./.env wanderinglabs/scraper:camis.0.4

curl -d '{"facilityId":"5041", "rcFacilityId":"694", "rcPlaceId":"715"}' -H "Content-Type: application/json" -X POST http://localhost:3003/scrape
curl -d '{"facilityId":"5041", "rcFacilityId":"694", "rcPlaceId":"715"}' -H "Content-Type: application/json" -X POST http://204.48.25.66:81/scrape

curl -d "{\"facilityId\":4986,\"rcFacilityId\":633,\"rcPlaceId\":699,\"hash\":\"bc585c1ed7d6692a3926d1da4f2efc24\"}" -H "Content-Type: application/json" -X POST http://localhost:3003/scrape



# PRD
docker pull 302062960021.dkr.ecr.us-east-1.amazonaws.com/wanderinglabs/scraper-reserve_ca:latest
docker run -d -p 81:3003 --env-file ./.env 302062960021.dkr.ecr.us-east-1.amazonaws.com/wanderinglabs/scraper-reserve_ca:latest


# PM2

pm2 delete all
pm2 start src/config/server.development.yml --watch

