import { React, useState, useEffect } from "react";
import {
  deleteTimeLog,
  getTimeLogsByEmployeeId,
} from "../../services/timeLogService";
import { useParams } from "react-router-dom";
import TimeLogForm from "./components/TimeLogForm";
import FilterTimeLogForm from "./components/FilterTimeLogForm";
import TimeLog from "./components/TimeLog";
import useAuthentication from "../../hooks/useAuthentication";
import styles from "./index.module.css";

export default function TimeLogs() {
  const [timeLogs, setTimeLogs] = useState([]);
  const { isTokenValid } = useAuthentication();
  const params = useParams();

  useEffect(() => {
    isTokenValid();
    async function fetchData(id) {
      try {
        const response = await getTimeLogsByEmployeeId(id);
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
    <div className={styles.containerTimeLogs}>
      <div className={styles.contentTimeLogs}>
        {/* <h1>Registro de ponto: </h1> */}
        <h2 className={styles.tituloTimeLogs}>Filtrar registros</h2>
        <div className={styles.scrollTimeLogs}>
          <div className={styles.geradorTimeLogs}>
            <div className={styles.formTimeLogs}>
              <FilterTimeLogForm setTimeLogs={setTimeLogs} />
            </div>
            {Array.isArray(timeLogs) ? (
              timeLogs.map((timeLog) => (
                <div className={styles.itensTimeLogs} key={timeLog.id}>
                  <TimeLog
                    timeLog={timeLog}
                    handleDeleteTimeLog={handleDeleteTimeLog}
                    setTimeLogs={setTimeLogs}
                  />
                </div>
              ))
            ) : (
              <p>{timeLogs}</p>
            )}
          </div>
        </div>
      </div>
      <div className={styles.contentAddTimeLogs}>
        <h2 className={styles.tituloTimeLogs}>Criar novo registro</h2>
        <div className={styles.formAddTimeLogs}>
          <TimeLogForm setTimeLogs={setTimeLogs} />
        </div>
      </div>
    </div>
  );
}
