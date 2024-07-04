import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import StockWatcherContainer from "./containers/StockWatcherContainer";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StockWatcherContainer />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
