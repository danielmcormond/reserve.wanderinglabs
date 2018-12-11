LPUSH ReserveAmerica '{"facilityId":"3546", "contractCode":"FL", "parkId":"281056", "startDate":"12/09/2018", "endDate":"11/09/2019", "hash":"b1aee70a0e8534f9b68bd4a987b9a156"}'

{"facilityId":"3546", "contractCode":"FL", "parkId":"281056", "startDate":"12/09/2018", "endDate":"11/09/2019", "hash":"b1aee70a0e8534f9b68bd4a987b9a156"}

{"facilityId":"3509", "contractCode":"FL", "parkId":"281005", "startDate":"12/09/2018", "endDate":"11/09/2019", "hash":"b1aee70a0e8534f9b68bd4a987b9a156"}


## Docker

docker build -t wanderinglabs/scraper-reserve-america:latest

docker run -d --env-file ./.env wanderinglabs/scraper-reserve-america:latest


### Production

docker pull 302062960021.dkr.ecr.us-east-1.amazonaws.com/wanderinglabs/scraper-reserve-america:latest
docker run -d --env-file ./.reserve-america.env 302062960021.dkr.ecr.us-east-1.amazonaws.com/wanderinglabs/scraper-reserve-america:latest
