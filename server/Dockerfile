FROM node:20.8-slim
RUN mkdir /usr/src/app
RUN mkdir /usr/src/app/node_modules
WORKDIR /usr/src/app
RUN apt-get update -y
RUN npm update -g npm
RUN npm install -g sequelize-cli
COPY ./ ./
RUN npm install
