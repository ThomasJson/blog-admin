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
        body: JSON.stringify({with:['account', 'role']})
    })
      .then((resp) => resp.json())
      .then((json) => {
        setAccount(json);
      });
  }, [id]);

  return (
    <>
      <h1>Détail de l'utilisateur : {account?.pseudo}</h1>
      <b>email : </b> {account?.account?.login}<br/>
      <b>role : </b> {account?.role?.title}<br/>
    </>
  );
};

export default AccountDetailScreen;