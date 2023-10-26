import React, { useState } from "react";
import { useParams } from "react-router-dom";
import InputForm from "../../../../components/InputForm";
import { getTimeLogsByEmployeeIdRange } from "../../../../services/timeLogService";

import styles from "./index.module.css";

export default function FilterTimeLogForm({ setTimeLogs }) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const params = useParams();

  async function filterTimeLogs(event) {
    event.preventDefault();
    try{
      const response = await getTimeLogsByEmployeeIdRange(
        params.employeeId,
        startDate,
        endDate
      );
      setTimeLogs(response.data);
    }catch(error){
      console.error(error)
    }
  }

  return (
    <form className={styles.containerFilter}>
      <InputForm
        value={startDate}
        changeValue={setStartDate}
        required={true}
        type={"Date"}
        placeholder={""}
        label={"Selecione um dia inicial"}
      />
      <InputForm
        value={endDate}
        changeValue={setEndDate}
        required={true}
        type={"Date"}
        placeholder={""}
        label={"Selecione um dia final"}
      />
      <button className={styles.buttonFiltrar} onClick={filterTimeLogs}>Filtrar</button>
    </form>
  );
}
