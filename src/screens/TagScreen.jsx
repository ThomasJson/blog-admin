import "./tagScreen.scss";
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
      <h1>Tags List</h1>
      {/* nous utilisons map sur le state tags afin de créer les lignes 
      dans le tbody du tableau */}
      <div className="tags-container">
        {tags.map((tag) => {
          return (
            <button
              key={tag.Id_tag}
              onClick={() => {
                navigate(`/tag/${tag.Id_tag}`);
              }}
              className="style-4"
            >
              {tag.title}
            </button>
          );
        })}
      </div>

      <button
        className="btn-new-tag mt-5 bg-success"
        onClick={() => {
          document.querySelector(".table").classList.add("show");
          document.querySelector(".inputText").focus();
        }}
      >
        Add New Tag
      </button>

      <table className="table hidden">
        <thead>
          <tr>
            <th>Tag</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className="tBody">
          <tr>
            <td>
              <input type="text" focus="focus" className="inputText" />
            </td>
            <td className="d-flex">
              <form method="" action="">
                <input type="hidden" name="" value="" />
                <button
                  className="disable-btn btn btn-success me-1"
                  name="validate"
                >
                  V
                </button>
                <button
                  onClick={(e) => {
                    // e.preventDefault();
                    document.querySelector(".table").classList.add("hidden");
                  }}
                  className="disable-btn btn btn-danger"
                  name="delete"
                >
                  X
                </button>
              </form>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default TagScreen;
