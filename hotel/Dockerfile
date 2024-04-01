FROM node:16
WORKDIR /app/hotel
COPY package.json /app/hotel
RUN npm install
COPY . /app/hotel
COPY ./.env.dev /app/hotel/.env
EXPOSE 5000
CMD [ "node", "index.js" ]