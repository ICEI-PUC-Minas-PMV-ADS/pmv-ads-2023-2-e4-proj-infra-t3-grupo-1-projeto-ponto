import { React, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getEmployee } from "../../services/employeeService";
import ButtonUpdate from "../../components/ButtonUpdate";
import EmployeeEditForm from "./components/EmployeeEditForm";
import { getDepartaments } from "../../services/departamentService";
import { getPositions } from "../../services/positionsService";
import useAuthentication from "../../hooks/useAuthentication";
import styles from "./index.module.css";

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
        <div className={styles.containerEdit}>
          <div className={styles.contentEdit}>
            <div className={styles.infoEdit}>
              <p>
                <span>Nome:</span> {employee.fullName}
              </p>
              <p>
                <span>Email:</span> {employee.email}
              </p>
              <p>
                <span>Data de nascimento:</span> {employee.birthDate}
              </p>
              <p>
                <span>Data de contratação:</span> {employee.hireDate}
              </p>
              <p>
                <span>CPF:</span> {employee.cpf}
              </p>
              <p>
                <span>Jornada de trabalho diária:</span>
                {employee.dailyWorkingHours}Hrs
              </p>
              <p>
                <span>Departamento:</span> {employee.departament}
              </p>
              <p>
                <span>Cargo:</span> {employee.position}
              </p>

              <div className={styles.buttonEdit}>
                <ButtonUpdate setViewEditForm={setViewEditForm} />
              </div>
            </div>
            <div className={styles.opcoesEdit}>
              <button
                className={styles.buttonRedirecionar}
                onClick={handleTimeLogs}
              >
                Registros de ponto
              </button>
              <button
                className={styles.buttonRedirecionar}
                onClick={handlePaychecks}
              >
                Contracheques
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
