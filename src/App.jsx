import "./App.css";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./Routes/AppRoutes";
import { Routes, Route} from "react-router-dom";
import HomePage from "./pages/Home";
import Detail from "./pages/Detail";
import { DarkModeProvider } from "./context/DarkModeContext";

function App() {
  return (
    <div>
      <DarkModeProvider>
        <BrowserRouter>
            <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/Details/:id" element={<Detail />} />
          </Routes>
        </BrowserRouter>
      </DarkModeProvider>
    </div>
  );
}

export default App;
