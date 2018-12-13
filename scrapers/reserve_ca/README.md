
### PRD
docker pull 302062960021.dkr.ecr.us-east-1.amazonaws.com/wanderinglabs/scraper-reserve-ca:latest
docker run -d --env-file ./.reserve-ca.env 302062960021.dkr.ecr.us-east-1.amazonaws.com/wanderinglabs/scraper-reserve-ca:latest


# DEV
npm link scraper-wandering-labs-shared

docker run -d --env-file ./.env 302062960021.dkr.ecr.us-east-1.amazonaws.com/wanderinglabs/scraper-reserve-ca:latest
