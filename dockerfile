FROM node:16-alpine
WORKDIR /home/app
COPY package*.json ./
COPY tsconfig.json ./
RUN npm i
COPY . .
RUN npm run build
EXPOSE 3000
ENTRYPOINT [ "node","dist/server.js" ]