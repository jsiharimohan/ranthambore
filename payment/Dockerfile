FROM node:16
WORKDIR /app/payment
COPY package.json /app/payment
RUN npm install
COPY . /app/payment
COPY ./.env.dev /app/payment/.env
EXPOSE 5002
CMD [ "node", "index.js" ]