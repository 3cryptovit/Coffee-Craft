// backend/src/prisma/seed.ts
import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Кофейня
  const shop = await prisma.coffeeShop.create({
    data: {
      name: 'CoffeeCraft Лаунж',
      location: 'ул. Кофейная, 1',
    }
  })

  // Пользователь-бариста
  const password = await hash('barista123', 10)
  await prisma.user.create({
    data: {
      username: 'barista1',
      email: 'barista@coffeecraft.ru',
      password,
      role: 'BARISTA',
      shopId: shop.id
    }
  })

  // Категории ингредиентов и ингредиенты
  const categories = [
    {
      name: 'Основа (Кофе / Шоколад)',
      orderIndex: 1,
      ingredients: [
        'Espresso', 'Doppio', 'Triplo', 'Ristretto', 'Lungo', 'Americano',
        'Decaffeinato', 'Instant coffee', 'Cold Brew', 'Nitro Coffee',
        'Горячий шоколад', 'Черный какао', 'Молочный шоколад', 'Белый шоколад'
      ]
    },
    {
      name: 'Молочные компоненты',
      orderIndex: 2,
      ingredients: [
        'Обезжиренное молоко', '2% молоко', '3.2% молоко', 'Топлёное молоко', 'Сгущённое молоко',
        'Миндальное молоко', 'Соевое молоко', 'Овсяное молоко', 'Кокосовое молоко', 'Лактозное молоко',
        'Steamed milk', 'Cold milk', 'Milk foam', 'Cold foam', 'Microfoam',
        'Лёгкие сливки', 'Жирные сливки', 'Взбитые сливки'
      ]
    },
    {
      name: 'Подсластители и сиропы',
      orderIndex: 3,
      ingredients: [
        'Тростниковый сахар', 'Белый сахар',
        'Ванильный сироп', 'Карамельный сироп', 'Шоколадный сироп',
        'Ореховый сироп', 'Кокосовый сироп', 'Лаванда', 'Имбирный пряник',
        'Кленовый сироп', 'Мята', 'Банановый сироп', 'Вишнёвый сироп', 'Малиновый сироп'
      ]
    },
    {
      name: 'Топпинги и добавки',
      orderIndex: 4,
      ingredients: [
        'Молотая корица', 'Тертый шоколад', 'Какао-порошок', 'Шоколадные капли',
        'Маршмеллоу', 'Попкорн', 'Шоколадный шарик',
        'Орехи', 'Лёд', 'Долька лимона', 'Печенье',
        'Шоколадная стружка', 'Кокосовая стружка', 'Пудра'
      ]
    },
    {
      name: 'Алкогольные добавки',
      orderIndex: 5,
      ingredients: [
        'Brandy', 'Baileys', 'Amaretto', 'Whiskey', 'Ром', 'Кофейный ликёр', 'Шоколадный ликёр', 'Ореховый ликёр'
      ]
    },
    {
      name: 'Температура / Подача',
      orderIndex: 6,
      ingredients: [
        'Горячий', 'Тёплый', 'Прохладный', 'Со льдом',
        'С мороженым', 'Фраппе', 'Flat', 'Foamy'
      ]
    }
  ]

  for (const category of categories) {
    const createdCategory = await prisma.ingredientCategory.create({
      data: {
        name: category.name,
        orderIndex: category.orderIndex,
      }
    })

    await prisma.ingredient.createMany({
      data: category.ingredients.map((name, i) => ({
        name,
        categoryId: createdCategory.id,
        volume_ml: 30,
        price: 20,
        max_units: 5
      }))
    })
  }

  // Объёмы чашек
  await prisma.cup.createMany({
    data: [
      { label: 'Small (200 мл)', volume_ml: 200, price_base: 100 },
      { label: 'Medium (300 мл)', volume_ml: 300, price_base: 130 },
      { label: 'Large (400 мл)', volume_ml: 400, price_base: 160 },
      { label: 'XL (500+ мл)', volume_ml: 500, price_base: 200 },
    ]
  })

  console.log('✅ Seed успешно выполнен!')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())