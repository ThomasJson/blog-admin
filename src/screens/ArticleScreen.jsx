import "./articleScreen.css";
import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ArticleScreen = () => {
  const [articles, setArticles] = useState([]);

  const navigate = useNavigate();

  // Nous utilisons un useEffect qui ne s’exécute qu’une fois
  // (au chargement du composant)

  useEffect(() => {
    fetch("http://blog-api.loc/article/0", {
      method: "POST",
      body: JSON.stringify({ with: ["appuser", "theme", "image"] }),
    })
      .then((resp) => resp.json())
      // Une fois les données récupérées,
      // nous mettons à jour le state (avec set...)

      // Pour afficher les mots-clés par ordre alphabétique,
      // nous modifions le useEffect en ajoutant un
      // sort sur le json reçu de l’api rest
      .then((json) => {
        // json = json.sort((a, b) => {
        //   return a.pseudo.toLowerCase() > b.pseudo.toLowerCase() ? 1 : -1;
        // });
        setArticles(json);
      });
  }, []);

  return (
    <>
      <h1>Liste des Articles</h1>
      <div className="articles-container">
        {articles.map((article) => {
          return (
            <>
              <div>
                <div
                  key={article.Id_article}
                  className="card card-margin"
                  style={{ width: "18rem" }}
                >
                  {article &&
                    Object.values(article.images_list).map((img) => {
                      return (
                        <img
                          key={img.Id_image}
                          src={img.src}
                          alt={img.alt}
                          style={{ width: "100%", height: "200px" }}
                          className="card-img-top"
                        />
                      );
                    })}

                  <div className="card-body">
                    <h5 className="card-title">{article.title}</h5>
                    <p className="card-text">
                      Publié le : {article.created_at}
                    </p>
                    <p className="card-text">
                      Auteur : {article?.appUser?.pseudo}
                    </p>
                    <p className="card-text">Thème : {article?.theme?.title}</p>
                    <div
                      onClick={() => {
                        navigate(`/article/${article.Id_article}`);
                      }}
                      class="btn btn-primary"
                    >
                      Lire l'article
                    </div>
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

export default ArticleScreen;
