import { React, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getEmployee } from "../../services/EmployeeService";

export default function Employee() {
  const [employee, setEmployee] = useState({});
  const [error, setError] = useState("");

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData(id) {
      try {
        const response = await getEmployee(id);
        console.log(response.data)
        setEmployee(response.data);
      } catch (error) {
        setError(error);
      }
    }
    fetchData(params.employeeId);
  }, [params.employeeId]);
  
  function handleEditInfo(){

  }

  function handleTimeLogs(){
    navigate("registros")
  }

  function handlePaychecks(){
    navigate("contracheques")
  }

  return (
    <div>
      <div>
        <h3>Nome: {employee.fullName}</h3>
        <h3>Departamento: {employee.email}</h3>
        <h3>Data de nascimento: {employee.birthDate}</h3>
        <h3>Data de contratação: {employee.hireDate}</h3>
        <h3>CPF: {employee.cpf}</h3>
        <h3>Quantidade de horas trabalhadas: {employee.dailyWorkingHours}</h3>
        <h3>Departamento: {employee.departament}</h3>
        <h3>Cargo: {employee.position}</h3>
      </div>
      <div>
        <button>Editar informações</button>
        <button onClick={handleTimeLogs}>Registros de ponto</button>
        <button onClick={handlePaychecks}>Contracheques</button>
      </div>
    </div>
  );
}
