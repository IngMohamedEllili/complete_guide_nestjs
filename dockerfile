FROM node:12.13.1
WORKDIR /app
COPY ./ /app/
#COPY ./node_modules /app/node_modules
CMD ["npm","run","start:dev"]
