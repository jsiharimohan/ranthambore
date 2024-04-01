FROM node:16
WORKDIR /app/safari
COPY package.json /app/safari
RUN npm install
COPY . /app/safari
COPY ./.env.dev /app/safari/.env
EXPOSE 5003
CMD [ "node", "index.js" ]