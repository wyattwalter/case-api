FROM node:14-alpine

WORKDIR /usr/src/app

COPY package.json yarn.lock ./
RUN whoami
RUN ls -l /usr/src/app
RUN yarn install

COPY . .
RUN yarn build

ENTRYPOINT ["yarn"]
EXPOSE 3000