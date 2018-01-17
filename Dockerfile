FROM docker-registry.ad.tt.se/ttab/node-boron

# install cron
RUN apt-get update && apt-get install -y cron

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app/
RUN npm install
COPY . /usr/src/app
CMD [ "npm", "start" ]
