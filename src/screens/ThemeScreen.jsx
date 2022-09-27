import "./themeScreen.scss";
import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ThemeScreen = () => {
  const [themes, setThemes] = useState([]);

  const navigate = useNavigate();

  // Nous utilisons un useEffect qui ne s’exécute qu’une fois
  // (au chargement du composant)

  useEffect(() => {
    fetch("http://blog-api.loc/theme")
      .then((resp) => resp.json())
      // Une fois les données récupérées,
      // nous mettons à jour le state (avec set...)

      // Pour afficher les mots-clés par ordre alphabétique,
      // nous modifions le useEffect en ajoutant un
      // sort sur le json reçu de l’api rest
      .then((json) => {
        json = json.sort((a, b) => {
          return a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1;
        });
        setThemes(json);
      });
  }, []);

  return (
    <>
      <h1>Liste des Thèmes</h1>
      {/* nous utilisons map sur le state tags afin de créer les lignes 
      dans le tbody du tableau */}
      <div className="themes-container">
        {themes.map((theme) => {
          return (
            <button
              key={theme.Id_theme}
              onClick={() => {
                navigate(`/theme/${theme.Id_theme}`);
              }}
              className="style-4"
            >
              {theme.title}
            </button>
          );
        })}
      </div>
    </>
  );
};

export default ThemeScreen;
