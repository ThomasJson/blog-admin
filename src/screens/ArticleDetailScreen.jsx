import React from "react";
import { useParams } from "react-router-dom";
// Récupérer l’id de la route
import { useState, useEffect } from "react";

const ArticleDetailScreen = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    fetch("http://blog-api.loc/article/" + id, {
      method: "POST",
      body: JSON.stringify({ with: ["appuser", "theme"] }),
    })
      .then((resp) => {

        return resp.json()})
      
      .then((json) => {
        setArticle(json);
      });

  }, [id]);

  return (
    <>
      <h1>Détail de l'article : {article?.account?.pseudo}</h1>
      <b>Date de Publication : </b> {article?.created_at}
      <br />
      <b>Thème : </b> {article?.theme?.title}
      <br />
      <b>Contenu : </b> {article?.content}
    </>
  );
};

export default ArticleDetailScreen;
