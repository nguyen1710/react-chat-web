FROM node:23-alpine

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 2312

CMD [ "npm", "run", "dev" ]