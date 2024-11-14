FROM  node:23-alpine

WORKDIR /app

COPY package.json .

RUN yarn install

COPY . .

EXPOSE 5173

CMD [ "yarn", "dev" ]



