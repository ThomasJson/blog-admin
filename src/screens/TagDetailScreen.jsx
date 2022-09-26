import React from "react";
import { useParams } from "react-router-dom";
// Récupérer l’id de la route
import { useState, useEffect } from "react";

const TagDetailScreen = () => {
  const { id } = useParams();
  const [tag, setTag] = useState(null);

  useEffect(() => {
    fetch("http://blog-api.loc/tag/" + id, {
      method: "POST",
      body: JSON.stringify({
        with: [{ article: "article_tag" }],
      }),
    })
      .then((resp) => resp.json())
      .then((json) => {
        setTag(json);
      });
  }, [id]);

  return (
    <>
      <h1>Détail du mot-clé : {tag?.title}</h1>
      <p>Liste des articles reliés</p>
      <div>
        Articles :
        {tag?.articles_list.map((article) => {
          return <span className="badge bg-secondary ms-2">{article.title} / publié le {article.created_at}</span>;
        })}
      </div>
    </>
  );
};

export default TagDetailScreen;
