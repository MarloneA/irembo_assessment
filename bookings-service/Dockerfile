ARG NODE_VERSION=20.4.0

FROM node:${NODE_VERSION}-alpine

WORKDIR /app/bookings-service

COPY package.json ./

COPY prisma ./prisma/

RUN npm install 

COPY . .

EXPOSE 8081

CMD ["npm", "run", "start:migrate:prod"]