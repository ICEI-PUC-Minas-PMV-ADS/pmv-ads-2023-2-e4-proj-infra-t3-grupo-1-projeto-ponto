import { React, useState } from "react";
import ButtonDelete from "../../../../components/ButtonDelete";
import ButtonUpdate from "../../../../components/ButtonUpdate";
import TimeLogEditForm from "../TimeLogEditForm";

import styles from "./index.module.css";

export default function TimeLog({ timeLog, handleDeleteTimeLog, setTimeLogs }) {
  const [viewEditForm, setViewEditForm] = useState(false);

  var [date, hour] = timeLog.timestamp.split("T");
  hour = hour.slice(0, -1);
  return (
    <>
      {viewEditForm ? (
        <TimeLogEditForm
          setTimeLogs={setTimeLogs}
          timeLogProp={timeLog}
          setViewEditForm={setViewEditForm}
          viewEditForm={viewEditForm}
        />
      ) : (
        <div className={styles.contentTimeLog}>
          <div>
            <p><strong>Dia:</strong> {date} </p>
            <p><strong>Hora:</strong> {hour} </p>
            <p><strong>Tipo:</strong> {timeLog.logTyoeText}</p>
            {timeLog.isEdited ? (
              <>
                <p><strong>Justificativa:</strong> {timeLog.justification}</p>
                <p>
                  <strong>obs.:</strong> Editado ou criado pelo RH
                </p>
              </>
            ) : null}
          </div>
          <div className={styles.buttonsTimeLog}>
            <ButtonUpdate setViewEditForm={setViewEditForm} />
            <ButtonDelete handleDelete={handleDeleteTimeLog} id={timeLog.id} />
          </div>
        </div>
      )}
    </>
  );
}
