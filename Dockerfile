FROM node:20.15.0-alpine

WORKDIR /app

CMD ["yarn", "run", "dev"]

COPY ./package.json .

RUN yarn install

COPY . .

#docker build -t danvoron/coolforms:latest  .
#docker push danvoron/coolforms:latest