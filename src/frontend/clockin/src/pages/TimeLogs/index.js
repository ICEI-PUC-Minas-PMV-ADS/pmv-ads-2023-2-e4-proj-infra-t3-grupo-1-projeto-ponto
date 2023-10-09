import { React, useState, useEffect } from "react";
import {
  deleteTimeLog,
  getTimeLogsByEmployeeId,
  getTimeLogsByEmployeeIdRange,
} from "../../services/TimeLogService";
import { useParams } from "react-router-dom";
import TimeLogForm from "./components/TimeLogForm";
import FilterTimeLogForm from "./components/FilterTimeLogForm";

export default function TimeLogs() {
  const [timeLogs, setTimeLogs] = useState([]);
  const [error, setError] = useState("");
  const params = useParams();

  useEffect(() => {
    async function fetchData(id) {
      try {
        const response = await getTimeLogsByEmployeeId(id);
        if (Array.isArray(response.data)) {
          setTimeLogs(response.data);
        } else {
          setError(response.data);
        }
      } catch (error) {
        setError(error);
      }
    }
    fetchData(params.employeeId);
  }, [params.employeeId]);

  async function handleDeleteTimeLog(timeLogId) {
    try {
      const response = await deleteTimeLog(timeLogId);
      const newTimeLogs = timeLogs.filter(
        (timeLog) => timeLog.id !== timeLogId
      );
      setTimeLogs(newTimeLogs);
      console.log(response);
    } catch (error) {}
  }

  return (
    <div>
      <div>
        <h1>Registro de ponto: </h1>
        {error && <div>{error}</div>}
        <div>
        <h2>Filtrar registros</h2>
        <FilterTimeLogForm setTimeLogs={setTimeLogs}/>
          {timeLogs.map((timeLog) => {
            var [date, hour] = timeLog.timestamp.split("T");
            hour = hour.slice(0, -1);

            return (
              <div key={timeLog.id}>
                <p>Dia: {date}</p>
                <p>Hora: {hour}</p>
                <p>Tipo: {timeLog.logTyoeText}</p>
                {timeLog.isEdited ? (
                  <div>
                    <p>
                      <strong>obs.:</strong> Editado ou criado pelo RH
                    </p>
                    <p>Justificativa: {timeLog.justification}</p>
                  </div>
                ) : null}
                <button onClick={() => handleDeleteTimeLog(timeLog.id)}>
                  Excluir
                </button>
              </div>
            );
          })}
        </div>
        <h2>Criar novo registro</h2>
        <TimeLogForm setTimeLogs={setTimeLogs} />
      </div>
    </div>
  );
}
