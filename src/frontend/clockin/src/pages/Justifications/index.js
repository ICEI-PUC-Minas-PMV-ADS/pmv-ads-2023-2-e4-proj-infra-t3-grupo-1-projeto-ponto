import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import JustificationForm from "./components/JustificationForm";
import {
  deleteJustification,
  getJustifications,
} from "../../services/JustificationsService";

export default function Justifications() {
  const [justifications, setJustifications] = useState([]);
  const [error, setError] = useState(null);
  const params = useParams();

  const handleDeleteJustification = async (id) => {
    try {
      const response = await deleteJustification(id);
      const newJustifications = justifications.filter(
        (justification) => justification.id !== id
      );
      setJustifications(newJustifications);
      console.log(response);
    } catch (error) {}
  };

  useEffect(() => {
    async function fetchData(id) {
      try {
        const response = await getJustifications(id);
        if (Array.isArray(response.data)) {
          setJustifications(response.data);
        } else {
          setError(response.data);
        }
      } catch (error) {
        setError(error);
      }
    }
    fetchData(params.userId);
  }, [params.userId]);

  return (
    <div>
      <div>
        <h1>Justificativas de ponto: </h1>
        {error && <div>{error}</div>}
        <div>
          {justifications.map((justification) => {
            return (
              <div key={justification.id}>
                <h3>Nome: {justification.name}</h3>
                <h3>Descrição: {justification.description}</h3>
                <button
                  onClick={() => handleDeleteJustification(justification.id)}
                >
                  Excluir
                </button>
              </div>
            );
          })}
        </div>
        <h2>Criar um nova justificativa</h2>
        <JustificationForm setJustifications={setJustifications} />
      </div>
    </div>
  );
}
