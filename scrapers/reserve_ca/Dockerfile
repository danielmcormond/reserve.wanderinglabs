FROM node:8.11-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json package-lock.json .babelrc /usr/src/app/
COPY src /usr/src/app/src

RUN npm install
RUN npm run build
RUN npm prune --production
RUN npm install pm2 -g

EXPOSE 3003
CMD ["pm2-runtime", "src/config/server.production.yml"]
