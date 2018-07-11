FROM keymetrics/pm2:latest-alpine

WORKDIR /src

COPY . .
RUN npm install --production

CMD ["pm2-runtime", "start", "pm2.json", "--env", "production"]
