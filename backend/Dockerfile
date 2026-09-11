FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY tsconfig.json ./
COPY prisma.config.ts ./
COPY prisma ./prisma
COPY src ./src
RUN mkdir -p /app/uploads

RUN npm run db:generate

EXPOSE 3000

CMD ["npm", "run", "dev"]
