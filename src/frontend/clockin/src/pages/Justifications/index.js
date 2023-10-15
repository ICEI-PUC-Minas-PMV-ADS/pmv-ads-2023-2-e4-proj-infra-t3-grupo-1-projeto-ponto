import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import JustificationForm from "./components/JustificationForm";
import {
  deleteJustification,
  getJustifications,
} from "../../services/JustificationsService";
import Justification from "./components/Justification";
import useAuthentication from "../../hooks/useAuthentication";

export default function Justifications() {
  const [justifications, setJustifications] = useState([]);
  const { isTokenValid } = useAuthentication();
  const params = useParams();

  const handleDeleteJustification = async (id) => {
    try {
      const response = await deleteJustification(id);
      const newJustifications = justifications.filter(
        (justification) => justification.id !== id
      );
      setJustifications(newJustifications);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    isTokenValid();
    async function fetchData(id) {
      try {
        const response = await getJustifications(id);
        if (Array.isArray(response.data)) {
          setJustifications(response.data);
        } else {
          console.error(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchData(params.userId);
  }, [params.userId, isTokenValid]);

  return (
    <div>
      <div>
        <h1>Justificativas de ponto: </h1>
        <div>
          {justifications.map((justification) => {
            return (
              <div key={justification.id}>
                <Justification
                  justification={justification}
                  handleDeleteJustification={handleDeleteJustification}
                  setJustifications={setJustifications}
                />
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
