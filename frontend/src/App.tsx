import { Routes, Route } from "react-router-dom";
import WelcomeScreen from "./pages/WelcomeScreen";
import SelectCupScreen from "./pages/SelectCupScreen";
import SelectBaseScreen from "./pages/SelectBaseScreen";
import SelectMilkScreen from "./pages/SelectMilkScreen";
import SelectSyrupScreen from "./pages/SelectSyrupScreen";
import SelectToppingScreen from "./pages/SelectToppingScreen";
import FinalScreen from "./pages/FinalScreen";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<WelcomeScreen />} />
      <Route path="/select-cup" element={<SelectCupScreen />} />
      <Route path="/select-base" element={<SelectBaseScreen />} />
      <Route path="/select-milk" element={<SelectMilkScreen />} />
      <Route path="/select-syrup" element={<SelectSyrupScreen />} />
      <Route path="/select-topping" element={<SelectToppingScreen />} />
      <Route path="/final" element={<FinalScreen />} />
    </Routes>
  );
};

export default App;
