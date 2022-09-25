import React from "react";
import { useParams } from "react-router-dom";
// Récupérer l’id de la route
import { useState, useEffect } from "react";

const ThemeDetailScreen = () => {
  const { id } = useParams();
  const [theme, setTheme] = useState(null);

  useEffect(() => {
    fetch("http://blog-api.loc/theme/" + id, {
      method: "POST",
      body: JSON.stringify({ with: ["article"] }),
    })
      .then((resp) => {

        return resp.json()})
      
      .then((json) => {
        setTheme(json);
      });

  }, [id]);

  return (
    <>
      <h1>Détail du thème : {theme?.title}</h1>
      <img src={theme?.img_src} alt="pHo"/>
      <h2>Liste des articles</h2>

      {theme && Object.values(theme?.articles_list).map((article) => {
                return (
                  
                  <div key={article.Id_article}>
                    <span>{article.title} </span>
                    <span>{article.created_at}</span>
                  </div>
                );
              })}
      <br />
    </>
  );
};

export default ThemeDetailScreen;