FROM node:12.18.3

WORKDIR /app

COPY . /app

RUN npm install

CMD npm start

EXPOSE 3000