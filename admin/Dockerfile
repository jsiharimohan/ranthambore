FROM node:16
WORKDIR /app/admin
COPY package.json /app/admin
RUN npm install
RUN npm install multer
COPY . /app/admin
COPY ./.env.dev /app/admin/.env
EXPOSE 5005
CMD [ "node", "index.js" ]