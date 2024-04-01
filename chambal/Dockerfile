FROM node:16
WORKDIR /app/chambal
COPY package.json /app/chambal
RUN npm install
COPY . /app/chambal
COPY ./.env.dev /app/chambal/.env
EXPOSE 5006
CMD [ "node", "index.js" ]