import { React, useState, useEffect } from "react";
import {
  deleteTimeLog,
  getTimeLogsByEmployeeId,
} from "../../services/TimeLogService";
import { useParams } from "react-router-dom";
import TimeLogForm from "./components/TimeLogForm";
import FilterTimeLogForm from "./components/FilterTimeLogForm";
import TimeLog from "./components/TimeLog";
import useAuthentication from "../../hooks/useAuthentication";

export default function TimeLogs() {
  const [timeLogs, setTimeLogs] = useState([]);
  const { isTokenValid } = useAuthentication();
  const params = useParams();

  useEffect(() => {
    isTokenValid();
    async function fetchData(id) {
      try {
        const response = await getTimeLogsByEmployeeId(id);
        if (response.status === 401) {
          console.log("teste");
        }
        if (Array.isArray(response.data)) {
          setTimeLogs(response.data);
        } else {
          console.error(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchData(params.employeeId);
  }, [params.employeeId, isTokenValid]);

  async function handleDeleteTimeLog(timeLogId) {
    try {
      const response = await deleteTimeLog(timeLogId);
      const newTimeLogs = timeLogs.filter(
        (timeLog) => timeLog.id !== timeLogId
      );
      setTimeLogs(newTimeLogs);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <div>
        <h1>Registro de ponto: </h1>
        <div>
          <h2>Filtrar registros</h2>
          <FilterTimeLogForm setTimeLogs={setTimeLogs} />
          {timeLogs.map((timeLog) => {
            return (
              <div key={timeLog.id}>
                <TimeLog
                  timeLog={timeLog}
                  handleDeleteTimeLog={handleDeleteTimeLog}
                  setTimeLogs={setTimeLogs}
                />
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
