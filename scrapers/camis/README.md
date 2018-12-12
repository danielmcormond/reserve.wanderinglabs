
### PRD
docker pull 302062960021.dkr.ecr.us-east-1.amazonaws.com/wanderinglabs/scraper-camis:latest
docker run -d --env-file ./.camis.env 302062960021.dkr.ecr.us-east-1.amazonaws.com/wanderinglabs/scraper-camis:latest


# DEV
npm link scraper-wandering-labs-shared

docker run -d --env-file ./.env 302062960021.dkr.ecr.us-east-1.amazonaws.com/wanderinglabs/scraper-camis:latest
