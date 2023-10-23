import { React, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getEmployee } from "../../services/employeeService";
import ButtonUpdate from "../../components/ButtonUpdate";
import EmployeeEditForm from "./components/EmployeeEditForm";
import { getDepartaments } from "../../services/departamentService";
import { getPositions } from "../../services/positionsService";
import useAuthentication from "../../hooks/useAuthentication";

export default function Employee() {
  const [employee, setEmployee] = useState({});
  const [viewEditForm, setViewEditForm] = useState(false);
  const [positions, setPositions] = useState([]);
  const [departaments, setDepartaments] = useState([]);
  const { isTokenValid } = useAuthentication();

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    isTokenValid();
    async function fetchData(id) {
      try {
        const response = await getEmployee(id);
        console.log(response.data);
        setEmployee(response.data);
        const responseDepartaments = await getDepartaments(params.userId);
        const responsePositions = await getPositions(params.userId);

        setDepartaments(responseDepartaments.data);
        setPositions(responsePositions.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData(params.employeeId);
  }, [params.employeeId, params.userId, isTokenValid]);

  function handleTimeLogs() {
    navigate("registros");
  }

  function handlePaychecks() {
    navigate("contracheques");
  }

  return (
    <div>
      {viewEditForm ? (
        positions.length === 0 ||
        departaments.length === 0 ||
        !Array.isArray(departaments) ||
        !Array.isArray(positions) ? (
          <p>
            Para editar um colaborador é necessário cadastrar ao menos um
            departamento e um cargo
          </p>
        ) : (
          <EmployeeEditForm
            employeeProp={employee}
            departaments={departaments}
            positions={positions}
            setEmployee={setEmployee}
            setViewEditForm={setViewEditForm}
          />
        )
      ) : (
        <>
          <div>
            <h3>Nome: {employee.fullName}</h3>
            <h3>Email: {employee.email}</h3>
            <h3>Data de nascimento: {employee.birthDate}</h3>
            <h3>Data de contratação: {employee.hireDate}</h3>
            <h3>CPF: {employee.cpf}</h3>
            <h3>
              Quantidade de horas trabalhadas: {employee.dailyWorkingHours}
            </h3>
            <h3>Departamento: {employee.departament}</h3>
            <h3>Cargo: {employee.position}</h3>
          </div>
          <div>
            <button onClick={handleTimeLogs}>Registros de ponto</button>
            <button onClick={handlePaychecks}>Contracheques</button>
            <ButtonUpdate setViewEditForm={setViewEditForm} />
          </div>
        </>
      )}
    </div>
  );
}
