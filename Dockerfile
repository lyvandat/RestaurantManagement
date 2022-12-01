FROM node:17

WORKDIR /usr/src

COPY package*.json ./

RUN npm install prettier -g

RUN npm install

COPY . .

RUN npm run start

EXPOSE 1337

CMD [ "node", "src/index.js"]