import { React, useState } from "react";
import { useParams } from "react-router-dom";
import { getEmployee, putEmployee } from "../../../../services/EmployeeService";
import InputForm from "../../../../components/InputForm";
import ButtonSubmitForm from "../../../../components/ButtonSubmitForm";
import ButtonCancel from "../../../../components/ButtonCancel";
import SelectForm from "../../../../components/SelectForm";

export default function EmployeeEditForm({
  employeeProp,
  setViewEditForm,
  departaments,
  positions,
  setEmployee,
}) {
  const [employeeName, setEmployeeName] = useState(employeeProp.fullName);
  const [employeeEmail, setEmployeeEmail] = useState(employeeProp.email);
  const [employeeBirthDate, setEmployeeBirthDate] = useState(
    employeeProp.birthDate
  );
  const [employeeHireDate, setEmployeeHireDate] = useState(
    employeeProp.hireDate
  );
  const [employeeCpf, setEmployeeCpf] = useState(employeeProp.cpf);
  const [employeeDailyWorkingHours, setEmployeeDailyWorkingHours] = useState(
    employeeProp.dailyWorkingHours
  );
  const [employeePositionId, setEmployeePositionId] = useState(
    employeeProp.positionId
  );
  const [employeeDepartamentId, setEmployeeDepartamentId] = useState(
    employeeProp.departamentId
  );

  const params = useParams();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const employee = {
        fullName: employeeName,
        email: employeeEmail,
        birthDate: employeeBirthDate,
        hireDate: employeeHireDate,
        cpf: employeeCpf,
        dailyWorkingHours: employeeDailyWorkingHours,
        positionId: employeePositionId,
        departamentId: employeeDepartamentId,
        id: params.employeeId,
      };
      const response = await putEmployee(employee);
      console.log(response);
      const responseEmployees = await getEmployee(employee.id);
      setEmployee(responseEmployees.data);
      setViewEditForm(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <InputForm
        value={employeeName}
        changeValue={(name) => setEmployeeName(name)}
        required={true}
        type={"text"}
        placeholder={"Digite aqui o nome do colaborador"}
        label={"Nome: "}
      />
      <InputForm
        value={employeeEmail}
        changeValue={(email) => setEmployeeEmail(email)}
        required={true}
        type={"email"}
        placeholder={"Digite aqui o nome do departamento"}
        label={"Email: "}
      />
      <InputForm
        value={employeeBirthDate}
        changeValue={(birthDate) => setEmployeeBirthDate(birthDate)}
        required={true}
        type={"date"}
        placeholder={"Digite aqui o nome do departamento"}
        label={"Data de nascimento: "}
      />
      <InputForm
        value={employeeHireDate}
        changeValue={(hireDate) => setEmployeeHireDate(hireDate)}
        required={true}
        type={"date"}
        placeholder={"Digite aqui a data de contratação do colaborador"}
        label={"Data de contratação: "}
      />
      <InputForm
        value={employeeCpf}
        changeValue={(cpf) => setEmployeeCpf(cpf)}
        required={true}
        type={"text"}
        placeholder={"Digite aqui o CPF do colaborador"}
        label={"CPF: "}
      />
      <InputForm
        value={employeeDailyWorkingHours}
        changeValue={(dailyWorkingHours) =>
          setEmployeeDailyWorkingHours(dailyWorkingHours)
        }
        required={true}
        type={"number"}
        placeholder={
          "Digite aqui a quandidade de horas que o colaborador ira trabalhar por dia"
        }
        label={"quantidades de horas trabalhadas por dia: "}
      />
      <SelectForm
        options={positions}
        selectedOption={employeePositionId}
        setSelectedOption={setEmployeePositionId}
        text={"Selecione um cargo"}
      />
      <SelectForm
        options={departaments}
        selectedOption={employeeDepartamentId}
        setSelectedOption={setEmployeeDepartamentId}
        text={"Selecione um departamento"}
      />
      <ButtonSubmitForm textButton={"Enviar"} />
      <ButtonCancel setViewEditForm={setViewEditForm} />
    </form>
  );
}
