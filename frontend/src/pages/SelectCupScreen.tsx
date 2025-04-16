import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import Layout from "../components/Layout";
import { useOrderStore } from "../store/orderStore";
import { Cup as CupType } from "../types/order";
import { TEXTS } from "../constants/texts";

const SelectCupScreen: React.FC = () => {
  const navigate = useNavigate();
  const setCup = useOrderStore((state) => state.setCup);
  const [cups, setCups] = useState<CupType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCups = async () => {
      try {
        const response = await axios.get<CupType[]>("/api/cups");
        console.log("Ответ от /api/cups:", response.data);
        setCups(Array.isArray(response.data) ? response.data : []);
        setError(null);
      } catch (err) {
        console.error("Error fetching cups:", err);
        setError("Не удалось загрузить список чашек");
        setCups([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCups();
  }, []);

  const handleSelectCup = (cup: CupType) => {
    setCup(cup);
    navigate("/select-base");
  };

  return (
    <Layout>
      <div className="flex flex-col items-center text-white">
        <h2 className="text-2xl font-semibold mb-6">{TEXTS.selectCup.title}</h2>
        {loading ? (
          <p>{TEXTS.common.loading}</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : cups.length === 0 ? (
          <p>{TEXTS.selectCup.noCups}</p>
        ) : (
          <div className="flex justify-center gap-8 flex-wrap">
            {Array.isArray(cups) && cups.map((cup, index) => (
              <motion.div
                key={cup.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleSelectCup(cup)}
                className="cursor-pointer flex flex-col items-center"
              >
                <img
                  src={`/assets/cups/cup_${cup.id}.png`}
                  alt={cup.label}
                  className="w-32 h-32 object-contain mb-2"
                />
                <span className="text-lg">{cup.label}</span>
                <span className="text-sm text-gray-400">{cup.volume_ml} мл</span>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default SelectCupScreen;
