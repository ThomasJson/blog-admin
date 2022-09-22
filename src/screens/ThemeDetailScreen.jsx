import React from "react";
import { useParams } from "react-router-dom";
// Récupérer l’id de la route
import { useState, useEffect } from "react";

const ThemeDetailScreen = () => {
  const { id } = useParams();
  const [theme, setTheme] = useState(null);

  useEffect(() => {
    fetch("http://blog-api.loc/theme/" + id)
      .then((resp) => resp.json())
      .then((json) => {
        setTheme(json);
      });
  }, [id]);

  return (
    <>
      <h1>Détail du Thème : {theme?.title}</h1>
      {/* TODO INSERT IMG */}
      <img src={theme?.img_src} alt="pHo" />
    </>
  );
};

export default ThemeDetailScreen;