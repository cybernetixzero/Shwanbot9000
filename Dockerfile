# syntax=docker/dockerfile:1
FROM node:alpine

ENV NODE_ENV=production

RUN apk add --no-cache git
RUN apk add --no-cache openssh

WORKDIR /app

RUN git clone https://github.com/cybernetixzero/Shwanbot9000.git /app
RUN npm install

CMD ["node", "."]