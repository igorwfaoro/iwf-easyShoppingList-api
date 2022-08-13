FROM node:16
WORKDIR /app

ENV PORT=8080
ENV NODE_ENV=development

COPY package.json ./
COPY . .

RUN npm i
RUN npm run build

EXPOSE $PORT
ENTRYPOINT ["node", "./dist/app.js"]