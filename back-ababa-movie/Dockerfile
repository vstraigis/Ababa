FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci
RUN npm rebuild bcrypt 

COPY .env ./
COPY prisma ./prisma/

COPY . .

RUN npx prisma generate
# RUN npx prisma migrate dev --name init


EXPOSE 5000

CMD ["npm", "start"]