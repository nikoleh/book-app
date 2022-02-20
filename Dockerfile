FROM node:16

WORKDIR /usr/src/app

COPY server/package*.json ./server/

RUN npm --prefix ./server install

COPY server ./server

RUN npm --prefix ./server run build

CMD ["node","server/index.js"]