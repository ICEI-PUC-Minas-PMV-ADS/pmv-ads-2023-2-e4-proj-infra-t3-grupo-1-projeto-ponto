import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ButtonSubmitForm from "../../../../components/ButtonSubmitForm";
import ButtonCancel from "../../../../components/ButtonCancel";

import InputForm from "../../../../components/InputForm";
import SelectForm from "../../../../components/SelectForm";
import { getJustifications } from "../../../../services/justificationsService";
import {
  getLogTypes,
  getTimeLogsByEmployeeId,
  putTimeLogs,
} from "../../../../services/timeLogService";

export default function TimeLogEditForm({
  setTimeLogs,
  timeLogProp,
  setViewEditForm = null,
}) {
  const [timestamp, setTimestamp] = useState(
    timeLogProp.timestamp.replace("Z", "")
  );
  const [logTypeValue, setLogTypeValue] = useState(timeLogProp.logTypeValue);
  const [justificationId, setJustificationId] = useState(
    timeLogProp.justificationId
  );
  const [logTypes, setLogTypes] = useState([]);
  const [justifications, setJustifications] = useState([]);
  const params = useParams();

  useEffect(() => {
    async function fetchData(userId) {
      try {
        const responseJustifications = await getJustifications(userId);
        const responseLogTypes = await getLogTypes();
        setLogTypes([
          {
            id: responseLogTypes.data.logTypeEntry,
            name: responseLogTypes.data.logTypeNameEntry,
          },
          {
            id: responseLogTypes.data.logTypeExit,
            name: responseLogTypes.data.logTypeNameExit,
          },
        ]);
        setJustifications(responseJustifications.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData(params.userId);
  }, [params.userId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const editTimeLog = {
        timestamp: `${timestamp}Z`,
        logTypeValue: logTypeValue,
        justificationId: justificationId,
        id: timeLogProp.id,
      };
      const responseUpdate = await putTimeLogs(editTimeLog);
      const responseTimeLogs = await getTimeLogsByEmployeeId(params.employeeId);
      setTimeLogs(responseTimeLogs.data);
      console.log(responseUpdate);
      setViewEditForm(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {justifications.length === 0 || !Array.isArray(justifications) ? (
        <p>
          É necessário cadastrar pelo menos uma justificativa para editar
          registro de ponto.
        </p>
      ) : (
        <form onSubmit={handleSubmit}>
          <InputForm
            value={timestamp}
            changeValue={(timestamp) => setTimestamp(timestamp)}
            required={true}
            type={"datetime-local"}
            label={"Seleceione o dia e a hora do registro: "}
          />
          <SelectForm
            options={logTypes}
            setSelectedOption={(selectedOptionOption) =>
              setLogTypeValue(parseInt(selectedOptionOption))
            }
            selectedOption={logTypeValue}
            text={"Selecione o tipo do registro"}
          />
          <SelectForm
            options={justifications}
            setSelectedOption={setJustificationId}
            selectedOption={justificationId}
            text={"Selecione a justificativa"}
          />
          <ButtonSubmitForm textButton={"Enviar"} />
          <ButtonCancel setViewEditForm={setViewEditForm} />
        </form>
      )}
    </div>
  );
}
