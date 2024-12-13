FROM node:18

WORKDIR /app

COPY . .
COPY ./.env.example ./.env

RUN npm install

RUN npm run build

EXPOSE 3333

CMD ["npm", "run", "docker"]