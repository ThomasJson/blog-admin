import React from "react";
import { useParams } from "react-router-dom";
// Récupérer l’id de la route
import { useState, useEffect } from "react";

const AccountDetailScreen = () => {
  const { id } = useParams();
  const [account, setAccount] = useState(null);

  useEffect(() => {
    fetch("http://blog-api.loc/appuser/" + id, {
      method: "POST",
      body: JSON.stringify({ with: ["account", "role", "article", "comment"] }),
    })
      .then((resp) => resp.json())
      .then((json) => {
        setAccount(json);
      });
  }, [id]);

  return (
    <>
      <h1>Détail de l'utilisateur : {account?.pseudo}</h1>
      <b>email : </b> {account?.account?.login}
      <br />
      <b>role : </b> {account?.role?.title}
      <br />
      {account?.Id_role === "1" && (
        <>
          <h3>Articles rédigés</h3>
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">Titre</th>
                <th scope="col">Date publication</th>
              </tr>
            </thead>
            <tbody>
              {account?.articles_list.map((article) => {
                return (
                  <tr key={article.Id_article}>
                    <td>{article.title}</td>
                    <td>{new Date(article.created_at).toLocaleString()}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      )}
      {account?.Id_role === "2" && (
        <>
          <h3>Articles rédigés</h3>
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">Titre</th>
                <th scope="col">Date publication</th>
              </tr>
            </thead>
            <tbody>
              {Object.values(account?.comments_list).map((comment) => {
                return (
                  <tr key={comment.Id_comment}>
                    <td>{comment.title}</td>
                    <td>{new Date(comment.created_at).toLocaleString()}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      )}
    </>
  );
};

export default AccountDetailScreen;
