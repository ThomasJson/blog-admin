import React from "react";
import { useParams } from "react-router-dom";
// Récupérer l’id de la route
import { useState, useEffect } from "react";

const AccountDetailScreen = () => {
  const { id } = useParams();
  const [account, setAccount] = useState(null);

  useEffect(() => {
    fetch("http://blog-api.loc/appuser/" + id)
      .then((resp) => resp.json())
      .then((json) => {
        setAccount(json);
      });
  }, [id]);

  return (
    <>
      <h1>Détail du compte : {account?.pseudo}</h1>
    </>
  );
};

export default AccountDetailScreen;