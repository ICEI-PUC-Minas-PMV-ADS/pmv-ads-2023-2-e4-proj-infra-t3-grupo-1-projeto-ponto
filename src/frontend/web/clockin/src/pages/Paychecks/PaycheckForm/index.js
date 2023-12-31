import { React, useState } from "react";
import { useParams } from "react-router-dom";
import ButtonSubmitForm from "../../../components/ButtonSubmitForm";
import InputForm from "../../../components/InputForm";
import {
  getPaycheck,
  getPaychecks,
  postPaycheck,
} from "../../../services/paycheckService";

export default function PaycheckForm({ setPaychecks }) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const params = useParams();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const paycheck = {
        startDate: startDate,
        endDate: endDate,
        employeeId: params.employeeId,
      };
      const response = await postPaycheck(paycheck);
      if (response && response.status === 201) {
        const newListPaychecks = await getPaychecks(params.employeeId);
        setPaychecks(newListPaychecks.data);
        setStartDate("");
        setEndDate("");
      }
    } catch (error) {
      console.error(error);
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
        <ButtonSubmitForm textButton={"Enviar"} />
      </form>
    </div>
  );
}
