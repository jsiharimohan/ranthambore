FROM node:16
WORKDIR /app/package
COPY package.json /app/package
RUN npm install
COPY . /app/package
COPY ./.env.dev /app/package/.env
EXPOSE 5001
CMD [ "node", "index.js" ]