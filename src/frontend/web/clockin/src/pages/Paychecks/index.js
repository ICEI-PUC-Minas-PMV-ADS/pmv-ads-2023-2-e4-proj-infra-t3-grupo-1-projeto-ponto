import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Paycheck from "./Paycheck/index";
import PaycheckForm from "./PaycheckForm";
import { getPaychecks, deletePaycheck } from "../../services/paycheckService";
import useAuthentication from "../../hooks/useAuthentication";

import styles from "./index.module.css";

export default function Paychecks() {
  const [paychecks, setPaychecks] = useState([]);
  const { isTokenValid } = useAuthentication();
  const params = useParams();

  const handleDeletePaycheck = async (id) => {
    try {
      const response = await deletePaycheck(id);
      const newPaychecks = paychecks.filter((paycheck) => paycheck.id !== id);
      setPaychecks(newPaychecks);
      console.log(response);
    } catch (error) {}
  };

  useEffect(() => {
    isTokenValid();
    async function fetchData(id) {
      try {
        const response = await getPaychecks(id);
        console.log(response);
        if (Array.isArray(response.data)) {
          setPaychecks(response.data);
        } else {
          console.error(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchData(params.employeeId);
  }, [params.employeeId, isTokenValid]);

  return (
    <div className={styles.containerPaychecks}>
      <div className={styles.contentPaychecks}>
        <div className={styles.geradorPaycheks}>
          {paychecks.length > 0 ? paychecks.map((paycheck) => (
            <Paycheck
              paycheck={paycheck}
              handleDeletePaycheck={handleDeletePaycheck}
              key={paycheck.id}
            />
          )) : <h3>Nenhum registro de ponto encontrado!</h3>}
        </div>
      </div>
      <div className={styles.contentAddPaychecks}>
        <h2 className={styles.tituloAdd}>Criar um novo contracheque</h2>
        <div className={styles.formAddPaychecks}>
          <PaycheckForm setPaychecks={setPaychecks} />
        </div>
      </div>
    </div>
  );
}
