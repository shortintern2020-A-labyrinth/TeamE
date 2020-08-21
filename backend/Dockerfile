FROM node:12
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm ci --only=production

COPY . .
EXPOSE 3000
CMD ["node", "server.js"]
