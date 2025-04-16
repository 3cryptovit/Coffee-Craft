import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import Layout from "../components/Layout";
import IngredientCard from "../components/IngredientCard";
import { useOrderStore } from "../store/orderStore";
import { Ingredient } from "../types/order";
import { TEXTS } from "../constants/texts";

const SelectMilkScreen: React.FC = () => {
  const navigate = useNavigate();
  const setMilk = useOrderStore((state) => state.setMilk);
  const [milks, setMilks] = useState<Ingredient[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    axios
      .get<Ingredient[]>("/api/ingredients")
      .then((res) => {
        const allIngredients = res.data as (Ingredient & {
          category?: { orderIndex: number };
        })[];
        // Фильтруем ингредиенты категории "молоко" (orderIndex === 2)
        const milkItems = allIngredients.filter(
          (item) => item.category?.orderIndex === 2
        );
        setMilks(milkItems);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const handleSelectMilk = (milk: Ingredient) => {
    setMilk(milk);
    navigate("/select-syrup");
  };

  return (
    <Layout>
      <div className="flex flex-col items-center text-white px-4">
        <h2 className="text-2xl font-semibold mb-6">{TEXTS.selectMilk.title}</h2>
        {loading ? (
          <p>{TEXTS.common.loading}</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-4 max-w-4xl">
            {milks.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <IngredientCard
                  ingredient={item}
                  title={item.name}
                  onSelect={() => handleSelectMilk(item)}
                />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default SelectMilkScreen;
