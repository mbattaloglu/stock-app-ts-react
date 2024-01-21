import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import StockDetails from "./pages/stock-details";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/stockDetails/:symbol" element={<StockDetails />} />
    </Routes>
  );
};

export default App;
