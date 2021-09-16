FROM node:latest

# Create directory.
RUN mkdir -p /usr/src/shwanbot9000
WORKDIR /usr/src/shwanbot9000

# Copy package manifest and restore packages.
COPY package.json /usr/src/shwanbot9000
RUN npm install

COPY . /usr/src/shwanbot9000

CMD ["node", "index.js"]
