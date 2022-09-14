import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [text, setText] = useState("");

  useEffect(() => {
    fetch("http://blog-api.loc/")
      .then((response) => response.text())
      .then((content) => setText(content))
      .catch(err=>console.error(err));
  }, []);

  return (
    <div className="App">
      {text}
    </div>
  );
}

export default App;