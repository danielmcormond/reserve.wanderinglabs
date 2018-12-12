FROM node:10.14-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json package-lock.json ecosystem.config.js /usr/src/app/
COPY src /usr/src/app/src

RUN npm install
RUN npm prune --production
RUN npm install pm2 -g

CMD ["pm2-runtime", "start", "ecosystem.config.js", "--env", "production"]
