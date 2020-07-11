
NAME=$1
SERVER=$2

SCRAPER_NAME=scraper-${NAME}
ENV_PROD=$(<.production.env)
DOCKER_LOGIN=`aws ecr get-login --no-include-email`
DOCKER_IMAGE=${DOCKER_REGISTRY}/wanderinglabs/scraper-${NAME}:latest

ssh -oStrictHostKeyChecking=no -T root@${SERVER} << EOSSH
  $DOCKER_LOGIN
  mkdir -p /home/scraper
  echo "$ENV_PROD" > /home/scraper/.env
  docker pull $DOCKER_IMAGE

  docker rm -f $SCRAPER_NAME
  docker run -d --name $SCRAPER_NAME --env-file /home/scraper/.env $DOCKER_IMAGE
EOSSH
