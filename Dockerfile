FROM node:20-alpine as build
WORKDIR /cybergpt_new
COPY package*.json ./
RUN npm install
COPY . ./
CMD ["npm", "start"]