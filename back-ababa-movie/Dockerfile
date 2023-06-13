FROM node:alpine

WORKDIR /app

COPY package*.json ./

RUN npm install
RUN npm rebuild bcrypt 

COPY .env ./
COPY prisma ./prisma/

COPY . .

RUN npx prisma generate
# RUN npx prisma migrate dev --name init


EXPOSE 5000

CMD ["npm", "start"]