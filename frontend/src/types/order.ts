// Общие типы данных для Cups, Ingredients и Order (соответствуют бэкенду)
export interface Cup {
  id: number;
  label: string;
  volume_ml: number;
  price_base: number;
}

export interface Ingredient {
  id: number;
  name: string;
  categoryId: number;
  sub_category?: string | null;
  volume_ml: number;
  price: number;
  image_url?: string | null;
  // При получении из API включена категория
  category?: {
    id: number;
    name: string;
    orderIndex: number;
  };
}

// Элемент заказа (ингредиент в составе напитка)
export interface OrderItem {
  ingredientId: number;
  quantity: number;
  added_stage: string;
  temperature: string;
}

// Полезная нагрузка для создания заказа (отправляется на /api/orders)
export interface OrderPayload {
  cupId: number;
  shopId: number;
  items: OrderItem[];
}
