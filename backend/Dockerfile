FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY tsconfig.json ./
COPY src ./src
RUN mkdir -p /app/uploads

EXPOSE 3000

CMD ["npm", "run", "dev"]
