FROM node:21.6-slim
WORKDIR /app
COPY ./ ./
RUN apt-get update&&apt-get update -y\
&&npm update -g npm\
&&npm config delete proxy\
&&npm config delete http-proxy\
&&npm config delete https-proxy\
&&npm install\
&&npm install vite@4.0.0
