import React from "react";
import { useParams } from "react-router-dom";
// Récupérer l’id de la route
import { useState, useEffect } from "react";

const TagDetailScreen = () => {
  const { id } = useParams();
  const [tag, setTag] = useState(null);

  useEffect(() => {
    fetch("http://blog-api.loc/tag/" + id)
      .then((resp) => resp.json())
      .then((json) => {
        setTag(json);
      });
  }, [id]);

  return (
    <>
      <h1>Détail du mot-clé : {tag?.title}</h1>
    </>
  );
};

export default TagDetailScreen;