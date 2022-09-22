import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const TagScreen = () => {
    
  const [tags, setTags] = useState([]);

  const navigate = useNavigate();

  // Nous utilisons un useEffect qui ne s’exécute qu’une fois
  // (au chargement du composant)

  useEffect(() => {
    fetch("http://blog-api.loc/tag")
      .then((resp) => resp.json())
      // Une fois les données récupérées,
      // nous mettons à jour le state (avec setTags)

      // Pour afficher les mots-clés par ordre alphabétique,
      // nous modifions le useEffect en ajoutant un
      // sort sur le json reçu de l’api rest
      .then((json) => {
        json = json.sort((a, b) => {
          return a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1;
        });
        setTags(json);
      });
  }, []);

  return (
    <>
      <h1>Liste des mots-clés</h1>
      {/* nous utilisons map sur le state tags afin de créer les lignes 
      dans le tbody du tableau */}
      <table>
        <tbody>
          {tags.map((tag) => {
            return (
              <tr key={tag.Id_tag} onClick={()=>{navigate(`/tag/${tag.Id_tag}`);}} >
                <td>{tag.title}</td>
                <td></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default TagScreen;
