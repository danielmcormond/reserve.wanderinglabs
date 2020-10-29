
### PRD
docker pull 302062960021.dkr.ecr.us-east-1.amazonaws.com/wanderinglabs/scraper-recreation-gov:latest
docker run -d --env-file ./.recreation-gov.env 302062960021.dkr.ecr.us-east-1.amazonaws.com/wanderinglabs/scraper-recreation-gov:latest


### DEV
npm link scraper-wandering-labs-shared

docker run -d --env-file ./.env 302062960021.dkr.ecr.us-east-1.amazonaws.com/wanderinglabs/scraper-recreation-gov:latest


Docker creds for prd.. run this locally:
aws ecr get-login --no-include-email
$(aws ecr get-login --no-include-email --region us-east-1)
