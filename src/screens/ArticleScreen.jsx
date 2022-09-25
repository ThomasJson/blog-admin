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
      body: JSON.stringify({ with: ["appuser", "theme"] }),
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
      <table>
        <tbody>
          {articles.map((article) => {
            return (
              <tr
                key={article.Id_article}
                onClick={() => {
                  navigate(`/article/${article.Id_article}`);
                }}
              >
                <td>
                  <b>Titre </b> {article.title}
                  <br />
                </td>

                <td>
                  <b>Date de publication : </b> {article.created_at}
                  <br />
                </td>

                <td>
                  <b>Auteur : </b> {article?.appUser?.pseudo}
                  <br />
                </td>

                <td>
                  <b>Thème : </b> {article?.theme?.title}
                  <br />
                </td>

              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default ArticleScreen;