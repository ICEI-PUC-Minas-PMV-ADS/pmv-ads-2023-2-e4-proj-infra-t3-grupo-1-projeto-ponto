import { React, useState } from "react";
import { useParams } from "react-router-dom";
import ButtonSubmitForm from "../../../components/ButtonSubmitForm";
import ButtonCancel from "../../../components/ButtonCancel";
import InputForm from "../../../components/InputForm";
import { putPaycheck, getPaycheck } from "../../../services/paycheckService";
import styles from "./index.module.css";

function formatTime(time) {
  if (time === undefined) {
    const [hours, minutes, seconds] = "00";
    return { hours, minutes, seconds };
  } else {
    const [hours, minutes, seconds] = time.split(":");

    return { hours, minutes, seconds };
  }
}

export default function PaycheckEditForm({
  propsPaycheck,
  setPaycheck,
  setViewEditForm,
}) {
  const [startDate, setStartDate] = useState(propsPaycheck.startDate);
  const [endDate, setEndDate] = useState(propsPaycheck.endDate);

  const [standardHours, setStandardHours] = useState(
    formatTime(propsPaycheck.standardHours).hours
  );
  const [standardMinutes, setStandardMinutes] = useState(
    formatTime(propsPaycheck.standardHours).minutes
  );
  const [overtimeHours, setOvertimeHours] = useState(
    formatTime(propsPaycheck.overtimeHours).hours
  );
  const [overtimeMinutes, setOvertimeMinutes] = useState(
    formatTime(propsPaycheck.overtimeHours).minutes
  );
  const [daysWorked, setDaysWorked] = useState(propsPaycheck.daysWorked);
  const params = useParams();

  const setMinutes = (setValue, inputValue) => {
    if (inputValue > 59) {
      setValue(59);
    }
    if (inputValue < 0) {
      setValue(0);
    } else {
      setValue(inputValue);
    }
  };

  const validateTime = (
    standardHours,
    standardMinutes,
    overtimeHours,
    overtimeMinutes,
    daysWorked
  ) => {
    if (
      parseInt(standardHours) < 0 ||
      parseInt(standardMinutes) < 0 ||
      parseInt(overtimeHours) < 0 ||
      parseInt(overtimeMinutes) < 0 ||
      daysWorked < 0
    ) {
      return false;
    } else {
      return true;
    }
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      if (
        !validateTime(
          standardHours,
          standardMinutes,
          overtimeHours,
          overtimeMinutes,
          daysWorked
        )
      ) {
        throw new Error("Valor invalido nos campos");
      }
      const paycheck = {
        startDate: startDate,
        endDate: endDate,
        paycheckId: propsPaycheck.id,
        standardHours: `${standardHours}:${standardMinutes}:00`,
        overtimeHours: `${overtimeHours}:${overtimeMinutes}:00`,
        daysWorked: daysWorked,
        employeeId: params.employeeId,
      };
      const responseUpdate = await putPaycheck(paycheck);
      console.log(responseUpdate);
      const responsePaycheck = await getPaycheck(params.paycheckId);
      setPaycheck(responsePaycheck.data);
      setViewEditForm(false);
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <InputForm
          value={startDate}
          changeValue={(startDate) => setStartDate(startDate)}
          required={true}
          type={"date"}
          label={"Data de inicio"}
        />
        <InputForm
          value={endDate}
          changeValue={(endDate) => setEndDate(endDate)}
          required={true}
          type={"date"}
          label={"Data final"}
        />

        <p>Horas trabalhadas</p>
        <div className={styles.time}>
          <InputForm
            value={standardHours}
            changeValue={(standardHours) => setStandardHours(standardHours)}
            required={true}
            type={"number"}
            label={""}
          />
          <h2>:</h2>
          <InputForm
            value={standardMinutes}
            changeValue={(standardMinutes) =>
              setMinutes(setStandardMinutes, standardMinutes)
            }
            required={true}
            type={"number"}
            label={""}
            max={59}
          />
        </div>
        <p>Quantidade de horas extras</p>
        <div className={styles.time}>
          <InputForm
            value={overtimeHours}
            changeValue={(overtimeHours) => setOvertimeHours(overtimeHours)}
            required={true}
            type={"number"}
            label={""}
          />
          <h2>:</h2>
          <InputForm
            value={overtimeMinutes}
            changeValue={(overtimeMinutes) =>
              setMinutes(setOvertimeMinutes, overtimeMinutes)
            }
            required={true}
            type={"number"}
            label={""}
            max={59}
          />
        </div>

        <InputForm
          value={daysWorked}
          changeValue={(daysWorked) => setDaysWorked(daysWorked)}
          required={true}
          type={"number"}
          label={"Quantidade de dias trabalhados"}
        />

        <ButtonCancel setViewEditForm={setViewEditForm} />
        <ButtonSubmitForm textButton={"Enviar"} />
      </form>
    </div>
  );
}
