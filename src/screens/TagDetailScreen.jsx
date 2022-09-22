import React from 'react';
import { useParams } from 'react-router-dom';
// Récupérer l’id de la route

const TagDetailScreen = () => {
    const {id} = useParams();

    return (
        <>
            <h1>Détail du mot-clé : {id}</h1>
        </>
    );
};

export default TagDetailScreen;