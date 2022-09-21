import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";

import BaseScreen from "./screens/BaseScreen";
import LandingScreen from "./screens/LandingScreen";
import LoginScreen from "./screens/LoginScreen";
import AccountScreen from "./screens/AccountScreen";
import ArticleScreen from "./screens/ArticleScreen";
import ThemeScreen from "./screens/ThemeScreen";
import TagScreen from "./screens/TagScreen";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<BaseScreen />}>
          <Route index element={<LandingScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/accounts" element={<AccountScreen />} />
          <Route path="/articles" element={<ArticleScreen />} />
          <Route path="/themes" element={<ThemeScreen />} />
          <Route path="/tags" element={<TagScreen />} />
          <Route path="*" element={<h1>404 not found</h1>} />
        </Route>
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
