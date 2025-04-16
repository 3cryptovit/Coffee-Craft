import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import Layout from "../components/Layout";
import IngredientCard from "../components/IngredientCard";
import { useOrderStore } from "../store/orderStore";
import { Ingredient } from "../types/order";
import { TEXTS } from "../constants/texts";

const SelectBaseScreen: React.FC = () => {
  const navigate = useNavigate();
  const setBase = useOrderStore((state) => state.setBase);
  const [bases, setBases] = useState<Ingredient[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    axios
      .get<Ingredient[]>("/api/ingredients")
      .then((res) => {
        const allIngredients = res.data as (Ingredient & {
          category?: { orderIndex: number };
        })[];
        // Фильтруем ингредиенты категории основы (orderIndex === 1)
        const baseItems = allIngredients.filter(
          (item) => item.category?.orderIndex === 1
        );
        setBases(baseItems);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const handleSelectBase = (base: Ingredient) => {
    setBase(base);
    navigate("/select-milk");
  };

  return (
    <Layout>
      <div className="flex flex-col items-center text-white px-4">
        <h2 className="text-2xl font-semibold mb-6">{TEXTS.selectBase.title}</h2>
        {loading ? (
          <p>{TEXTS.common.loading}</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-4 max-w-4xl">
            {bases.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <IngredientCard
                  ingredient={item}
                  title={item.name}
                  onSelect={() => handleSelectBase(item)}
                />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default SelectBaseScreen;
