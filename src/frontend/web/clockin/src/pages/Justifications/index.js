import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import JustificationForm from "./components/JustificationForm";
import {
  deleteJustification,
  getJustifications,
} from "../../services/justificationsService";
import Justification from "./components/Justification";
import useAuthentication from "../../hooks/useAuthentication";
import styles from "./index.module.css";

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
    <div className={styles.containerJustifications}>
      <div className={styles.contentJustifications}>
        <h2 className={styles.titulo}>Justificativas de ponto</h2>
        <div className={styles.justificationsScroll}>
          <div className={styles.justificationsGerador}>
            {justifications.map((justification) => {
              return (
                <div
                  className={styles.justificationsItens}
                  key={justification.id}
                >
                  <Justification
                    justification={justification}
                    handleDeleteJustification={handleDeleteJustification}
                    setJustifications={setJustifications}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className={styles.contentAddJustifications}>
        <h2 className={styles.titulo}>Criar uma nova justificativa</h2>
        <div className={styles.formAddJustifications}>
          <JustificationForm setJustifications={setJustifications} />
        </div>
      </div>
    </div>
  );
}
