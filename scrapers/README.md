## Docker

#### Build using docker compose

Build all:

`docker-compose build`

Build single:

`docker-compose build reserve-america`

Push:

`docker-compose push`

`docker-compose push reserve-america`

#### Image repo / AWS ECR

AWS ECR logins expire after 12 hrs.

To get a new session locally:

`$(aws ecr get-login --no-include-email --region us-east-1)`

AWS cli is not install on production servers. Run this locally and paste results in a shell of a server that requires docker pull from ECR.

`aws ecr get-login --no-include-email`

#### Deploying

./deploy.sh recreation-gov {ip}
./deploy.sh reserve-america {ip}
./deploy.sh reserve-ca {ip}

./deploy-all.sh reserve-america scraper-jul-15
./deploy-all.sh reserve-ca scraper-jul-15
./deploy-all.sh recreation-gov scraper-jul-15

#### All together now

docker-compose build reserve-ca && docker-compose push reserve-ca && ./deploy.sh reserve-ca {ip}

docker-compose build reserve-america && docker-compose push reserve-america && ./deploy.sh reserve-america {ip}

docker-compose build recreation-gov && docker-compose push recreation-gov && ./deploy.sh recreation-gov {ip}

docker-compose build rec1 && docker-compose push rec1 && ./deploy.sh rec1 {ip}



---

## TODO
