import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { deleteEmployee, getEmployees } from "../../services/EmployeeService";
import EmployeeForm from "./components/EmployeeForm";
import { getDepartaments } from "../../services/DepartamentService";
import { getPositions } from "../../services/PositionsService";
import Employee from "./components/Employee";
import useAuthentication from "../../hooks/useAuthentication";

export default function Employees() {
  const [employees, setEmployees] = useState([]);
  const [positions, setPositions] = useState([]);
  const [departaments, setDepartaments] = useState([]);
  const { isTokenValid } = useAuthentication();

  const params = useParams();

  const handleDeletehemployee = async (id) => {
    try {
      const response = await deleteEmployee(id);
      const newEmployees = employees.filter((employee) => employee.id !== id);
      setEmployees(newEmployees);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    isTokenValid();
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
          console.error(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchData(params.userId);
  }, [params.userId, isTokenValid]);

  return (
    <div>
      <div>
        <h1>Colaboradores: </h1>
        <div>
          {employees.map((employee) => {
            return (
              <div key={employee.id}>
                <Employee
                  employee={employee}
                  handleDeletehemployee={handleDeletehemployee}
                />
              </div>
            );
          })}
        </div>
        <h2>Inserir novo colaborador</h2>
        {positions.length === 0 ||
        departaments.length === 0 ||
        !Array.isArray(departaments) ||
        !Array.isArray(positions) ? (
          <p>
            Para cadastrar um novo colaborador é necessário cadastrar ao menos
            um departamento e um cargo
          </p>
        ) : (
          <EmployeeForm
            setEmployees={setEmployees}
            positions={positions}
            departaments={departaments}
          />
        )}
      </div>
    </div>
  );
}
