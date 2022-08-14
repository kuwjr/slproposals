FROM node:alpine
WORKDIR /frontend_code
COPY package.json .
RUN npm install
COPY . .
EXPOSE 3000
COPY . .
CMD ["npm", "run", "start"]