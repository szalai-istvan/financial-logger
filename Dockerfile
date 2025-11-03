FROM node:20.15-alpine

WORKDIR /app

COPY . .

RUN rm -rf ./dist
RUN npm install
RUN npm run compile
RUN rm -rf ./src

EXPOSE 3000
CMD ["npm", "run", "start"]