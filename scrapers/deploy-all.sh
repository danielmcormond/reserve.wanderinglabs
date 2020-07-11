
NAME=$1
TAG=$2

SCRAPER_NAME=scraper-${NAME}
ENV_PROD=$(<.production.env)
DOCKER_LOGIN=`aws ecr get-login --no-include-email`
DOCKER_IMAGE=${DOCKER_REGISTRY}/wanderinglabs/scraper-${NAME}:latest

IPS=( $(curl -s -X GET -H "Content-Type: application/json" -H "Authorization: Bearer ${DIGITAL_OCEAN}" "https://api.digitalocean.com/v2/droplets?tag_name=${TAG}" | jq -r '.droplets[].networks.v4[0].ip_address') )

for i in "${IPS[@]}"
do
	echo $i
  sh ./deploy.sh ${NAME} ${i}
done
