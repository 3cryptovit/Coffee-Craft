import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import Cup from "../components/Cup";
import Button from "../components/Button";
import { useOrderStore } from "../store/orderStore";
import { TEXTS } from "../constants/texts";
import { OrderPayload } from "../types/order";
import axios from "axios";

const FinalScreen: React.FC = () => {
  const navigate = useNavigate();
  const {
    selectedCup,
    selectedBase,
    selectedMilk,
    selectedSyrup,
    selectedTopping,
    clearOrder,
  } = useOrderStore();

  // Расчёт итогового объёма и цены
  const totalVolume = selectedCup ? selectedCup.volume_ml : 0;
  let totalPrice = 0;
  if (selectedCup) totalPrice += selectedCup.price_base;
  if (selectedBase) totalPrice += selectedBase.price;
  if (selectedMilk) totalPrice += selectedMilk.price;
  if (selectedSyrup) totalPrice += selectedSyrup.price;
  if (selectedTopping) totalPrice += selectedTopping.price;

  const handlePlaceOrder = async () => {
    if (!selectedCup) return;
    // Формируем данные заказа для отправки на бекенд
    const order: OrderPayload = {
      cupId: selectedCup.id,
      shopId: 1,
      items: [],
    };
    if (selectedBase) {
      order.items.push({
        ingredientId: selectedBase.id,
        quantity: 1,
        added_stage: "BASE",
        temperature: "hot",
      });
    }
    if (selectedMilk) {
      order.items.push({
        ingredientId: selectedMilk.id,
        quantity: 1,
        added_stage: "MILK",
        temperature: "hot",
      });
    }
    if (selectedSyrup) {
      order.items.push({
        ingredientId: selectedSyrup.id,
        quantity: 1,
        added_stage: "SYRUP",
        temperature: "hot",
      });
    }
    if (selectedTopping) {
      order.items.push({
        ingredientId: selectedTopping.id,
        quantity: 1,
        added_stage: "TOPPING",
        temperature: "hot",
      });
    }

    try {
      await axios.post("/api/orders", order);
      alert(TEXTS.final.orderSuccess);
      clearOrder();
      navigate("/");
    } catch (error) {
      console.error(error);
      alert(TEXTS.final.orderError);
    }
  };

  return (
    <Layout>
      <div className="flex flex-col items-center text-white text-center px-4">
        <h2 className="text-2xl font-semibold mb-4">{TEXTS.final.title}</h2>
        {/* Визуализация собранного напитка */}
        <Cup />
        {/* Информация об объёме и цене */}
        {selectedCup && (
          <p className="mt-4 mb-6 text-lg">
            {TEXTS.final.volume}: {totalVolume} мл | {TEXTS.final.price}: {totalPrice} ₽
          </p>
        )}
        {/* Кнопка отправки заказа */}
        <Button onClick={handlePlaceOrder}>{TEXTS.final.orderButton}</Button>
      </div>
    </Layout>
  );
};

export default FinalScreen;
