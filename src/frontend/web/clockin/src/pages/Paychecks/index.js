import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Paycheck from "./Paycheck/index";
import PaycheckForm from "./PaycheckForm";
import { getPaychecks, deletePaycheck } from "../../services/paycheckService";
import useAuthentication from "../../hooks/useAuthentication";

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
    <div>
      {paychecks.map((paycheck) => (
        <Paycheck
          paycheck={paycheck}
          handleDeletePaycheck={handleDeletePaycheck}
          key={paycheck.id}
        />
      ))}
      <h1>Criar um novo contracheque</h1>
      <PaycheckForm setPaychecks={setPaychecks} />
    </div>
  );
}
