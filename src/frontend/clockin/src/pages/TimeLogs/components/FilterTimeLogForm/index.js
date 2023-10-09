import React, { useState } from "react";
import { useParams } from "react-router-dom";
import InputForm from "../../../../components/InputForm";
import { getTimeLogsByEmployeeIdRange } from "../../../../services/TimeLogService";

export default function FilterTimeLogForm({ setTimeLogs }) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const params = useParams();

  async function filterTimeLogs(event) {
    event.preventDefault();
    const response = await getTimeLogsByEmployeeIdRange(
      params.employeeId,
      startDate,
      endDate
    );
    setTimeLogs(response.data);
  }

  return (
    <form>
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
      <button onClick={filterTimeLogs}>Filtrar</button>
    </form>
  );
}
