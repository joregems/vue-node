#!/bin/bash
sleep 5
sequelize db:create
sleep 5
sequelize db:migrate
npm install
npm run start
