import React from "react";
import { useParams } from "react-router-dom";
// Récupérer l’id de la route
import { useState, useEffect } from "react";

const ArticleDetailScreen = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  console.log("article:", article);

  useEffect(() => {
    fetch("http://blog-api.loc/article/" + id, {
      method: "POST",
      body: JSON.stringify({
        with: ["appuser", "theme", "comment", "image", { tag: "article_tag" }],
      }),
    })
      .then((resp) => {
        return resp.json();
      })

      .then((json) => {
        setArticle(json);
      });
  }, [id]);

  return (
    <>
      <h1>Détail de l'article : {article?.title}</h1>
      <b>Publié par : </b> {article?.appUser?.pseudo}
      <br />
      <b>Date de Publication : </b> {article?.created_at}
      <br />
      <b>Thème : </b> {article?.theme?.title}
      <br />
      <div>
        Mots-clés :
        {article?.tags_list.map((tag) => {
          return <span className="badge bg-secondary ms-2">{tag.title}</span>;
        })}
      </div>
      <b>Contenu : </b> {article?.content}
      <br />
      {article &&
        Object.values(article.images_list).map((img) => {
          return <img key={img.Id_image} src={img.src} alt={img.alt} />;
        })}
      <br />
      <h3>Commentaires</h3>
      {article &&
        Object.values(article?.comments_list).map((comment) => {
          return (
            <div key={comment.Id_comment}>
              <span>{comment.title}</span>
              <br />
              <span>publié le {comment.created_at}</span>
              <br />
              <span>{comment.content}</span>
            </div>
          );
        })}
    </>
  );
};

export default ArticleDetailScreen;
