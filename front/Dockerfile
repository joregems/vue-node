FROM node:20.8-slim
WORKDIR /app
RUN npm update -g npm
COPY ./package*.json ./
RUN npm install
COPY ./ ./
