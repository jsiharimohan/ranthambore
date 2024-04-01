FROM node:16
WORKDIR /app/client/api-gateway
COPY package.json /app/client/api-gateway
RUN npm install
COPY . /app/client/api-gateway
COPY ./.env.dev /app/client/api-gateway/.env
EXPOSE 5004
CMD [ "node", "index.js" ]