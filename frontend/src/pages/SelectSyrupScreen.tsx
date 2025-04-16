import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import Layout from "../components/Layout";
import IngredientCard from "../components/IngredientCard";
import { useOrderStore } from "../store/orderStore";
import { Ingredient } from "../types/order";
import { TEXTS } from "../constants/texts";

const SelectSyrupScreen: React.FC = () => {
  const navigate = useNavigate();
  const setSyrup = useOrderStore((state) => state.setSyrup);
  const [syrups, setSyrups] = useState<Ingredient[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    axios
      .get<Ingredient[]>("/api/ingredients")
      .then((res) => {
        const allIngredients = res.data as (Ingredient & {
          category?: { orderIndex: number };
        })[];
        // Фильтруем ингредиенты категории "сиропы/сахар" (orderIndex === 3)
        const syrupItems = allIngredients.filter(
          (item) => item.category?.orderIndex === 3
        );
        setSyrups(syrupItems);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const handleSelectSyrup = (syrup: Ingredient | null) => {
    setSyrup(syrup);
    navigate("/select-topping");
  };

  return (
    <Layout>
      <div className="flex flex-col items-center text-white px-4">
        <h2 className="text-2xl font-semibold mb-6">{TEXTS.selectSyrup.title}</h2>
        {loading ? (
          <p>{TEXTS.common.loading}</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-4 max-w-4xl">
            {/* Опция "Без сиропа" */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0 }}
            >
              <IngredientCard
                ingredient={null}
                title={TEXTS.selectSyrup.noneOption}
                onSelect={() => handleSelectSyrup(null)}
              />
            </motion.div>
            {syrups.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: (index + 1) * 0.05 }}
              >
                <IngredientCard
                  ingredient={item}
                  title={item.name}
                  onSelect={() => handleSelectSyrup(item)}
                />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default SelectSyrupScreen;
