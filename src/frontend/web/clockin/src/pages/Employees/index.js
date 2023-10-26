import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { deleteEmployee, getEmployees } from "../../services/employeeService";
import EmployeeForm from "./components/EmployeeForm";
import { getDepartaments } from "../../services/departamentService";
import { getPositions } from "../../services/positionsService";
import Employee from "./components/Employee";
import useAuthentication from "../../hooks/useAuthentication";
import styles from "./index.module.css";

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
    <div className={styles.containerEmployees}>
      <div className={styles.contentEmployees}>
        <h2 className={styles.itens}>Colaboradores</h2>
        <div className={styles.employeeScroll}>
          <div className={styles.employeeGerador}>
            {employees.map((employee) => {
              return (
                <div className={styles.employeeItens} key={employee.id}>
                  <Employee
                    employee={employee}
                    handleDeletehemployee={handleDeletehemployee}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className={styles.contentAddEmployees}>
        <h2 className={styles.itens}>Adicionar colaborador</h2>
        <div className={styles.addScroll}>
          <div className={styles.formAddEmployees}>
            {positions.length === 0 ||
            departaments.length === 0 ||
            !Array.isArray(departaments) ||
            !Array.isArray(positions) ? (
              <p>
                Para cadastrar um novo colaborador é necessário cadastrar ao
                menos um departamento e um cargo
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
      </div>
    </div>
  );
}

// return (
//   <div>
//     <div>
//       <h1>Colaboradores: </h1>
//       <div>
//         {employees.map((employee) => {
//           return (
//             <div key={employee.id}>
//               <Employee
//                 employee={employee}
//                 handleDeletehemployee={handleDeletehemployee}
//               />
//             </div>
//           );
//         })}
//       </div>
//       <h2>Inserir novo colaborador</h2>
//       {positions.length === 0 ||
//       departaments.length === 0 ||
//       !Array.isArray(departaments) ||
//       !Array.isArray(positions) ? (
//         <p>
//           Para cadastrar um novo colaborador é necessário cadastrar ao menos
//           um departamento e um cargo
//         </p>
//       ) : (
//         <EmployeeForm
//           setEmployees={setEmployees}
//           positions={positions}
//           departaments={departaments}
//         />
//       )}
//     </div>
//   </div>
// );
