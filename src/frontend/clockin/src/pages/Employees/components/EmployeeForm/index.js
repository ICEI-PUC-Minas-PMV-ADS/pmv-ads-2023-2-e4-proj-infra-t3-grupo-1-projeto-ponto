import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  getEmployees,
  registerEmployee,
} from "../../../../services/EmployeeService";
import InputForm from "../../../../components/InputForm";
import ButtonSubmitRegisterForm from "../../../../components/ButtonSubmitRegisterForm";
import SelectForm from "../../../../components/SelectForm";

export default function EmployeeForm({
  departaments,
  positions,
  setEmployees,
}) {
  const [employeeName, setEmployeeName] = useState("");
  const [employeeEmail, setEmployeeEmail] = useState("");
  const [employeePassword, setEmployeePassword] = useState("");
  const [employeeRePassword, setEmployeeRePassword] = useState("");
  const [employeeBirthDate, setEmployeeBirthDate] = useState("");
  const [employeeHireDate, setEmployeeHireDate] = useState("");
  const [employeeCpf, setEmployeeCpf] = useState("");
  const [employeeDailyWorkingHours, setEmployeeDailyWorkingHours] =
    useState("");
  const [employeePositionId, setEmployeePositionId] = useState("");
  const [employeeDepartamentId, setEmployeeDepartamentId] = useState("");

  const params = useParams();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const employee = {
      fullName: employeeName,
      email: employeeEmail,
      password: employeePassword,
      rePassword: employeeRePassword,
      birthDate: employeeBirthDate,
      hireDate: employeeHireDate,
      cpf: employeeCpf,
      dailyWorkingHours: employeeDailyWorkingHours,
      hrAdministratorId: params.userId,
      positionId: employeePositionId,
      departamentId: employeeDepartamentId,
    };
    const response = await registerEmployee(employee);
    console.log(response);
    if (response && response.status === 201) {
      const newEmployeesList = await getEmployees(params.userId);
      setEmployees(newEmployeesList.data);
    }
    setEmployeeName("");
    setEmployeeEmail("");
    setEmployeePassword("");
    setEmployeeRePassword("");
    setEmployeeBirthDate("");
    setEmployeeHireDate("");
    setEmployeeCpf("");
    setEmployeeDailyWorkingHours("");
    setEmployeePositionId(positions[0].id);
    setEmployeeDepartamentId(departaments[0].id);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        setEmployeePositionId(positions[0].id);
        setEmployeeDepartamentId(departaments[0].id);
      } catch (error) {
        //setError(error);
      }
    }
    fetchData();
  }, [departaments, positions]);

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
        value={employeePassword}
        changeValue={(password) => setEmployeePassword(password)}
        required={true}
        type={"password"}
        placeholder={"Digite aqui sua senha"}
        label={"Senha: "}
      />
      <InputForm
        value={employeeRePassword}
        changeValue={(repassword) => setEmployeeRePassword(repassword)}
        required={true}
        type={"password"}
        placeholder={"Digite aqui novamente sua senha"}
        label={"Confirme sua senha: "}
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
      <ButtonSubmitRegisterForm textButton={"Enviar"} />
    </form>
  );
}
