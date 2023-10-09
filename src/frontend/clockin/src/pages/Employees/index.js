import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteEmployee, getEmployees } from "../../services/EmployeeService";
import EmployeeForm from "./components/EmployeeForm";
import { getDepartaments } from "../../services/DepartamentService";
import { getPositions } from "../../services/PositionsService";

export default function Employees() {
  const [employees, setEmployees] = useState([]);
  const [positions, setPositions] = useState([]);
  const [departaments, setDepartaments] = useState([]);
  const [error, setError] = useState(null);
  const params = useParams();
  const navigate = useNavigate();

  const handleDeletehemployee = async (id) => {
    try {
      const response = await deleteEmployee(id);
      const newEmployees = employees.filter((employee) => employee.id !== id);
      setEmployees(newEmployees);
      console.log(response);
    } catch (error) {}
  };

  const handleMoreInfo = (id) => {
    navigate(`${id}`)
  };

  useEffect(() => {
    async function fetchData(id) {
      try {
        const response = await getEmployees(id);
        const responseDepartaments = await getDepartaments(id);
        const responsePositions = await getPositions(id);

        setDepartaments(responseDepartaments.data);
        setPositions(responsePositions.data);
        if (Array.isArray(response.data)) {
          setEmployees(response.data);
        } else {
          setError(response.data);
        }
      } catch (error) {
        setError(error);
      }
    }
    fetchData(params.userId);
  }, [params.userId]);

  return (
    <div>
      <div>
        <h1>Colaboradores: </h1>
        {error && <div>{error}</div>}
        <div>
          {employees.map((employee) => {
            return (
              <div key={employee.id}>
                <h3>Nome: {employee.fullName}</h3>
                <h3>Departamento: {employee.departament}</h3>
                <h3>Cargo: {employee.position}</h3>
                <button onClick={() => handleDeletehemployee(employee.id)}>
                  Excluir
                </button>
                <button onClick={() => handleMoreInfo(employee.id)}>
                  Mais informações
                </button>
              </div>
            );
          })}
        </div>
        <h2>Inserir novo colaborador</h2>
        <EmployeeForm
          setEmployees={setEmployees}
          positions={positions}
          departaments={departaments}
        />
      </div>
    </div>
  );
}
