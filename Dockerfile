FROM node:20-alpine as build
WORKDIR /avatar_frontend
COPY package*.json ./
RUN npm install
COPY . ./
CMD ["npm", "start"]