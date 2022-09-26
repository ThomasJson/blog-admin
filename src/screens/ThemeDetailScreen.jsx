import React from "react";
import { useParams } from "react-router-dom";
// Récupérer l’id de la route
import { useState, useEffect } from "react";

const ThemeDetailScreen = () => {
  const { id } = useParams();
  const [theme, setTheme] = useState(null);

  useEffect(() => {
    fetch("http://blog-api.loc/themeDetail/" + id)
      .then((resp) => {
        return resp.json();
      })

      .then((json) => {
        setTheme(json);
      });
  }, [id]);

  return (
    <>
      <h1>Thème : {theme?.title}</h1> 
      <img src={theme?.img_src} alt="Pic" style={{width: '600px'}} />
      <h2>Liste des articles :</h2>

      {theme?.articles_list.map((article) => {
        return (
          <div key={article.Id_article}>
            <b className="me-2">{article.title}</b>
            publié le {new Date(article.created_at).toLocaleDateString()}
            <span className="ms-2">par {article?.appUser?.pseudo}</span>
          </div>
        );
      })}
      <br />
    </>
  );
};

export default ThemeDetailScreen;
