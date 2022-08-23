FROM node:alpine
WORKDIR /code
COPY package.json .
RUN npm install
COPY . .
RUN npm run build

FROM nginx
COPY --from=0 /code/build /usr/share/nginx/html