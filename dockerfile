FROM node:8-alpine

RUN apk update

RUN npm install -g serverless \
    npm install -g serverless-offline \
    npm install -g yarn

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn

COPY . .

EXPOSE 3000

CMD [ "sls", "offline" ]