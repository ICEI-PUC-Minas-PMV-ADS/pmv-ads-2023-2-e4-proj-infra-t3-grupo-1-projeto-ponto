import { React, useState } from "react";
import ButtonDelete from "../../../../components/ButtonDelete";
import ButtonUpdate from "../../../../components/ButtonUpdate";
import TimeLogEditForm from "../TimeLogEditForm";

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
        <div>
          <p>Dia: {date}</p>
          <p>Hora: {hour}</p>
          <p>Tipo: {timeLog.logTyoeText}</p>
          {timeLog.isEdited ? (
            <div>
              <p>Justificativa: {timeLog.justification}</p>
              <p>
                <strong>obs.:</strong> Editado ou criado pelo RH
              </p>
            </div>
          ) : null}
          <ButtonUpdate setViewEditForm={setViewEditForm} />
          <ButtonDelete handleDelete={handleDeleteTimeLog} id={timeLog.id} />
        </div>
      )}
    </>
  );
}
