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

AWS ECR logins expire under 24 hrs.

To get a new session locally:

`$(aws ecr get-login --no-include-email --region us-east-1)`

AWS cli is not install on production servers. Run this locally and paste results in a shell of a server that requires docker pull from ECR.

`aws ecr get-login --no-include-email`


---

## TODO

- Consolidate production .env files into one
  - Standardize/Variablize cloudfront log group names
- Deployment solution
  - AWS ECR sessions (docker pull)
  - multiple hosts?
- ESlint not per scraper
- Cleanup ReserveCA linter issues (parse)
- Consolidate .envrc to scraper root.
- Tests
- Bulk of redis loop in Queue to shared
- Better error handling
  - sentry.io or ?
