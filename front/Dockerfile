FROM node:20.8-slim
WORKDIR /app
RUN npm update -g npm
COPY ./package*.json ./
RUN npm install
RUN npm install vite@latest --save-dev
COPY ./ ./
