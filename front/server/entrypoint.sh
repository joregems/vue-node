#!/bin/bash
# npm install -g sequelize-cli@6.6.1
npm install
sleep 5
sequelize db:create
sleep 5
sequelize db:migrate
npm run start
