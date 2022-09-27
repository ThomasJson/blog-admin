import './tagDetailScreen.scss';
import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const TagDetailScreen = () => {
  const { id } = useParams();
  const [tag, setTag] = useState(null);

  useEffect(() => {
    fetch("http://blog-api.loc/tag/" + id, {
      method: "POST",
      body: JSON.stringify({
        with: ["appuser", { article: "article_tag" }],
      }),
    })
      .then((resp) => resp.json())
      .then((json) => {
        setTag(json);
      });
  }, [id]);

  return (
    <>
      <h1>{tag?.title}</h1>

      <div className="articles-by-tag-container">
        {tag?.articles_list.map((article) => {

          return (

            <div
              key={article.Id_article}
              className="card card-margin"
              style={{ width: "18rem" }}
            >
              {/* {article &&
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
                })} */}

              <div className="card-body">
                <h5 className="card-title">{article.title}</h5>
                <p className="card-text">
                  Publié le : {new Date(article.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>
          );
        })}
      </div>

    </>
  );
};

export default TagDetailScreen;
