FROM node:12.13.1 as development
WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
#COPY ./node_modules /app/node_modules
CMD ["npm","run","start:dev"]

FROM MySQL:latest
ENV MYSQL_NAME: sql-db
ENV MYSQL_DATABASE: db
ENV MYSQL_USER: root
ENV MYSQL_ROOT_PASSWORD: Box2home.
EXPOSE 3306:3306