FROM node:18

WORKDIR /app

COPY package*.json ./

# Устанавливаем зависимости до копирования остального кода
RUN npm install

COPY . .

RUN npx prisma generate

CMD ["npm", "run", "start"]
