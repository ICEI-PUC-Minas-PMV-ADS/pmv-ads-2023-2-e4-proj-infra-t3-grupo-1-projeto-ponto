import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ButtonSubmitRegisterForm from "../../../../components/ButtonSubmitRegisterForm";
import InputForm from "../../../../components/InputForm";
import SelectForm from "../../../../components/SelectForm";
import { getJustifications } from "../../../../services/JustificationsService";
import {
  getLogTypes,
  getTimeLogsByEmployeeId,
  postTimeLog,
} from "../../../../services/TimeLogService";

export default function TimeLogForm({ setTimeLogs }) {
  const [timestamp, setTimestamp] = useState("");
  const [logTypeValue, setLogTypeValue] = useState("");
  const [justification, setJustification] = useState("");
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

  useEffect(() => {
    if (logTypes.length > 0 && justifications.length > 0) {
      setLogTypeValue(logTypes[0].id);
      setJustification(justifications[0].id);
    }
  }, [logTypes, justifications]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const timeLog = {
      timestamp: `${timestamp}Z`,
      employeeId: params.employeeId,
      logTypeValue: logTypeValue,
      justificationId: justification,
    };
    const response = await postTimeLog(timeLog);
    console.log(response);
    if (response && response.status === 201) {
      const newTimeLogsList = await getTimeLogsByEmployeeId(params.employeeId);
      setTimeLogs(newTimeLogsList.data);
    }

    setTimestamp("");
    if (logTypes.length > 0 && justifications.length > 0) {
      setLogTypeValue(logTypes[0].id);
      setJustification(justifications[0].id);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <InputForm
        value={timestamp}
        changeValue={(timestamp) => setTimestamp(timestamp)}
        required={true}
        type={"datetime-local"}
        label={"Seleceione o dia e a hora do registro: "}
      />
      <SelectForm
        options={justifications}
        setSelectedOption={setJustification}
        selectedOption={justification}
        text={"Selecione a justificativa"}
      />
      <SelectForm
        options={logTypes}
        setSelectedOption={(selectedOptionOption) =>
          setLogTypeValue(parseInt(selectedOptionOption))
        }
        selectedOption={logTypeValue}
        text={"Selecione o tipo do registro"}
      />
      <ButtonSubmitRegisterForm textButton={"Enviar"} />
    </form>
  );
}
