import './themeDetailScreen.scss';
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
      <h1>{theme?.title}</h1>
      <img src={theme?.img_src} alt="Pic" style={{ width: "600px" }} />
      <h2 className='mt-5'>Articles :</h2>
      <div className="themed-articles-container">
        {theme?.articles_list.map((article) => {
          return (
            <div className="themed-articles" key={article.Id_article}>
              <p className='mb-2'>
                <b className="me-2 ">{article.title}</b>
              </p>

              <p>
                publié le {new Date(article.created_at).toLocaleDateString()}
              </p>

              <p>par {article?.appUser?.pseudo}</p>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ThemeDetailScreen;
