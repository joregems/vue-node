FROM node:21.6-slim
# RUN mkdir /usr/src/app
# RUN mkdir /usr/src/app/node_modules
WORKDIR /usr/src/app
COPY ./ ./
RUN apt-get update&&apt-get update -y\
&&npm update -g npm\
&&npm config delete proxy\
&&npm config delete http-proxy\
&&npm config delete https-proxy
RUN npm install\
&&npm install -g sequelize-cli@6.6.1
