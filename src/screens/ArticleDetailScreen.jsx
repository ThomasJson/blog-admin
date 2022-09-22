import React from "react";
import { useParams } from "react-router-dom";
// Récupérer l’id de la route
import { useState, useEffect } from "react";

const ArticleDetailScreen = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    fetch("http://blog-api.loc/article/" + id)
      .then((resp) => resp.json())
      .then((json) => {
        setArticle(json);
      });
  }, [id]);

  return (
    <>
      <h1>Détail du mot-clé : {article?.title}</h1>
        <p>Date : {article?.created_at}</p>
        <p>Contenu : {article?.content}</p>
    </>
  );
};

export default ArticleDetailScreen;
