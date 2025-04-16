# CoffeeCraft API

## 🧠 Краткое описание

CoffeeCraft — это система управления кофейней с возможностью интерактивного создания напитков, управления ингредиентами, заказами и персоналом. Мы строим REST API на Node.js с использованием Express и Prisma, база данных — PostgreSQL, инфраструктура — Docker.

## 🎯 Цель

Реализовать backend API, поддерживающий:

- Авторизацию бариста (JWT)
- Оформление и отслеживание заказов
- Просмотр и управление ингредиентами
- Управление рецептами напитков
- Поддержку ролей: barista, owner, user (на будущее)

## 🧩 Роли и доступ

| Роль       | Кто это                   | Права                                                        |
|------------|---------------------------|--------------------------------------------------------------|
| `user`     | Покупатель                | Видит меню, может оформить заказ (без авторизации пока)     |
| `barista`  | Сотрудник кофейни         | Авторизуется, управляет ингредиентами, заказами, рецептами  |
| `owner`    | Владелец всей сети        | Видит все заказы, создаёт кофейни и бариста                 |

## 📚 API Endpoints

### ✅ Публичные:

- `GET /ingredients` — список всех ингредиентов
- `GET /recipes` — список рецептов
- `POST /order` — оформить заказ

### 🔐 Только для `barista` и `owner`:

- `PATCH /ingredient/:id/toggle` — включить/выключить ингредиент
- `POST /recipes` — создать рецепт
- `GET /orders` — список заказов кофейни
- `PATCH /order/:id/status` — обновить статус заказа
- `POST /auth/login` — вход с JWT

## 🧰 Технологический стек

- **Backend:** Node.js, Express, TypeScript  
- **ORM:** Prisma  
- **База данных:** PostgreSQL  
- **CI/CD & DevOps:** Docker, Docker Compose  
- **Авторизация:** JWT  
- **Frontend:** React + Vite (в разработке)

## 🚧 Текущий статус

- [x] БД и Prisma настроены
- [x] Seed выполнен
- [x] Docker-инфраструктура работает
- [x] JWT авторизация для barista реализована
- [ ] API для заказов и рецептов в процессе
- [ ] Swagger / Postman — планируется

## ⚙️ Примеры использования

### Авторизация

```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6...
```

### Создание заказа:

```http
POST /order
Content-Type: application/json

{
  "shopId": 1,
  "cupId": 3,
  "items": [
    {
      "ingredientId": 1,
      "quantity": 1,
      "added_stage": "base",
      "temperature": "hot"
    }
  ]
}
```

## 🚀 Запуск проекта

1. Клонируйте репозиторий
2. Установите зависимости:
   ```bash
   npm install
   ```
3. Запустите Docker-контейнеры:
   ```bash
   docker-compose up -d
   ```
4. Примените миграции:
   ```bash
   npm run migrate
   ```
5. Запустите seed:
   ```bash
   npm run seed
   ```

## 📝 Лицензия

MIT 