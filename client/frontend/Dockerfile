FROM node:16 as build
 
WORKDIR /app/client/frontend
 
COPY package.json /app/client/frontend

RUN npm install --legacy-peer-deps

COPY . /app/client/frontend

COPY ./.env.dev /app/client/frontend/.env

RUN npm run build

# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:1.17.8-alpine

COPY --from=build /app/client/frontend/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY ./nginx.conf /etc/nginx/conf.d

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]