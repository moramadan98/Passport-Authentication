FROM node:lts-alpine3.18

WORKDIR /app

RUN adduser -S mohamed

COPY package*.json .

RUN npm install

COPY . .

USER mohamed

ENV pass=momo

EXPOSE 8000

CMD [ "npm","start" ]


