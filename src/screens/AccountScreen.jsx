import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AccountScreen = () => {
    
  const [appUsers, setAppUsers] = useState([]);

  const navigate = useNavigate();

  // Nous utilisons un useEffect qui ne s’exécute qu’une fois
  // (au chargement du composant)

  useEffect(() => {
    fetch("http://blog-api.loc/appuser")
      .then((resp) => resp.json())
      // Une fois les données récupérées,
      // nous mettons à jour le state (avec set...)

      // Pour afficher les mots-clés par ordre alphabétique,
      // nous modifions le useEffect en ajoutant un
      // sort sur le json reçu de l’api rest
      .then((json) => {
        json = json.sort((a, b) => {
          return a.pseudo.toLowerCase() > b.pseudo.toLowerCase() ? 1 : -1;
        });
        setAppUsers(json);
      });
  }, []);

  return (
    <>
      <h1>Liste des Comptes</h1>
      {/* nous utilisons map sur le state tags afin de créer les lignes 
      dans le tbody du tableau */}
      <table>
        <tbody>
          {appUsers.map((user) => {
            return (
              <tr key={user.Id_appUser} onClick={()=>{navigate(`/account/${user.Id_appUser}`);}}>
                <td>{user.pseudo}</td>
                <td></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default AccountScreen;