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
./deploy.sh rec1 157.230.187.97
./deploy.sh use-direct 104.248.226.121

./deploy-all.sh reserve-america scraper-oct-21
./deploy-all.sh reserve-ca scraper-oct-21
./deploy-all.sh recreation-gov scraper-sfo-oct-24

#### All together now

docker-compose build reserve-ca && docker-compose push reserve-ca && ./deploy.sh reserve-ca {ip}

docker-compose build reserve-america && docker-compose push reserve-america && ./deploy.sh reserve-america {ip}

docker-compose build recreation-gov && docker-compose push recreation-gov && ./deploy.sh recreation-gov {ip}

docker-compose build rec1 && docker-compose push rec1 && ./deploy.sh rec1 {ip}

#### Helpful Commands

doctl compute tag list

doctl compute droplet list --tag-name scraper-oct-24
doctl compute droplet list --format PublicIPv4 --tag-name scraper-oct-24 --no-header

doctl compute droplet delete --tag-name scraper-oct-24

doctl compute droplet create --image 72318240 --size s-1vcpu-1gb --region nyc1 --tag-name scraper-oct-24 --wait --ssh-keys $DIGITAL_OCEAN_SSH ReserveScraper1 ReserveScraper2 ReserveScraper3 ReserveScraper4 ReserveScraper5

doctl compute droplet create --image 72318240 --size s-1vcpu-1gb --region sfo2 --tag-name scraper-sfo-oct-24 --wait --ssh-keys $DIGITAL_OCEAN_SSH ReserveScraper-1-11-21-1 ReserveScraper-1-11-21-2 ReserveScraper-1-11-21-3 ReserveScraper-1-11-21-4 ReserveScraper-1-11-21-5 ReserveScraper-1-11-21-6 ReserveScraper-1-11-21-7 ReserveScraper-1-11-21-8 ReserveScraper-1-11-21-9

---

## TODO


# Add the New Relic Infrastructure Agent gpg key \
curl -s https://download.newrelic.com/infrastructure_agent/gpg/newrelic-infra.gpg | sudo apt-key add - && \
\
# Create a configuration file and add your license key \
echo "license_key: XXX" | sudo tee -a /etc/newrelic-infra.yml && \
\
# Create the agent’s yum repository \
printf "deb [arch=amd64] https://download.newrelic.com/infrastructure_agent/linux/apt bionic main" | sudo tee -a /etc/apt/sources.list.d/newrelic-infra.list && \
\
# Update your apt cache \
sudo apt-get update && \
\
# Run the installation script \
sudo apt-get install newrelic-infra -y


logs:
  - name: docker-logs
    file: /var/lib/docker/containers/*/*.log
