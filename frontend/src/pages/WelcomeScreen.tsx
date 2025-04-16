import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import Button from "../components/Button";
import { TEXTS } from "../constants/texts";

const WelcomeScreen: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="flex flex-col items-center">
        {/* Логотип приложения */}
        <img
          src="/assets/logo.png"
          alt="Coffee&Craft"
          className="mb-8 w-64 h-64 object-contain"
        />
        {/* Кнопка "Начать" для перехода к выбору чашки */}
        <Button onClick={() => navigate("/select-cup")}>
          {TEXTS.welcome.buttonStart}
        </Button>
      </div>
    </Layout>
  );
};

export default WelcomeScreen;
