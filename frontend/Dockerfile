FROM node:alpine
WORKDIR /code
COPY package.json .
RUN npm install
EXPOSE 3000
COPY . .
CMD ["npm", "run", "start"]