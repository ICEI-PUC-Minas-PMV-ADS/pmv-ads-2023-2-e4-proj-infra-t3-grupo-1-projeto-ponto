import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ButtonSubmitForm from "../../../components/ButtonSubmitForm";
import ButtonCancel from "../../../components/ButtonCancel";
import InputForm from "../../../components/InputForm";
import { getEmployee, getEmployees } from "../../../services/employeeService";
import { putPaycheck, getPaycheck } from "../../../services/paycheckService";
import SelectForm from "../../../components/SelectForm";

export default function PaycheckEditForm({
  propsPaycheck,
  setPaycheck,
  setEmployee,
  setViewEditForm,
}) {
  const [startDate, setStartDate] = useState(propsPaycheck.startDate);
  const [endDate, setEndDate] = useState(propsPaycheck.endDate);
  const [employeeId, setEmployeeId] = useState(propsPaycheck.employeeId);
  const [employees, setEmployees] = useState([]);
  const params = useParams();

  useEffect(() => {
    async function fetchData(userId) {
      try {
        const responseEmployees = await getEmployees(userId);
        const employeesNameSeted = responseEmployees.data.map((employee) => ({
          ...employee,
          name: employee.fullName,
        }));
        setEmployees(employeesNameSeted);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData(params.userId);
  }, [params.userId]);

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const paycheck = {
        startDate: startDate,
        endDate: endDate,
        employeeId: employeeId,
        paycheckId: propsPaycheck.id,
      };
      const responseUpdate = await putPaycheck(paycheck);
      console.log(responseUpdate);
      const responsePaycheck = await getPaycheck(params.paycheckId);
      setPaycheck(responsePaycheck.data);
      const responseEmployee = await getEmployee(employeeId);
      setEmployee(responseEmployee.data);
      setViewEditForm(false);
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
        <SelectForm
          options={employees}
          selectedOption={employeeId}
          setSelectedOption={setEmployeeId}
          text={"Selecione o colaborador"}
        />
        <ButtonCancel setViewEditForm={setViewEditForm} />
        <ButtonSubmitForm textButton={"Enviar"} />
      </form>
    </div>
  );
}
