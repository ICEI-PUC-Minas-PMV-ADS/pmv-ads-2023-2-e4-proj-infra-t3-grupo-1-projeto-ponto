import { React, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPaycheck } from "../../services/PaycheckService";
import { getEmployee } from "../../services/EmployeeService";
import ButtonUpdate from "../../components/ButtonUpdate";
import PaycheckEditForm from "./PaycheckEditForm";
import useAuthentication from "../../hooks/useAuthentication";

export default function Paycheck() {
  const [paycheck, setPaycheck] = useState({
    baseSalary: 0,
    overtimeHourlyRate: 0,
    fgtsValue: 0,
    inssValue: 0,
    irrfValue: 0,
    totalSalary: 0,
  });
  const [employee, setEmployee] = useState({});
  const [viewEditForm, setViewEditForm] = useState(false);
  const { isTokenValid } = useAuthentication();
  const params = useParams();

  useEffect(() => {
    isTokenValid();
    async function fetchData(id) {
      try {
        const responsePaycheck = await getPaycheck(id);

        const responseEmployee = await getEmployee(
          responsePaycheck.data.employeeId
        );
        setPaycheck(responsePaycheck.data);
        setEmployee(responseEmployee.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData(params.paycheckId);
  }, [params.paycheckId, isTokenValid]);

  return (
    <>
      {viewEditForm ? (
        <div>
          <PaycheckEditForm
            propsPaycheck={paycheck}
            setPaycheck={setPaycheck}
            setEmployee={setEmployee}
            setViewEditForm={setViewEditForm}
          />
        </div>
      ) : (
        <div>
          <p>Colaborador: {employee.fullName}</p>
          <p>Departamento: {employee.departament}</p>
          <p>Cargo: {employee.position}</p>
          <p>
            Período do Contracheque: {paycheck.startDate} - {paycheck.endDate}
          </p>
          <p>Horas de Trabalho Padrão: {paycheck.standardHours}</p>
          <p>Total de Horas Trabalhadas: {paycheck.totalHours}</p>
          <p>Dias Trabalhados: {paycheck.daysWorked}</p>
          <p>Horas Extras: {paycheck.overtimeHours}</p>

          <p>
            Salário Base:{" "}
            {paycheck.baseSalary.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
              minimumFractionDigits: 2,
            })}
          </p>
          <p>
            Salário por Horas Extras:{" "}
            {paycheck.overtimeHourlyRate.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
              minimumFractionDigits: 2,
            })}
          </p>
          <p>
            FGTS:{" "}
            {paycheck.fgtsValue.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
              minimumFractionDigits: 2,
            })}
          </p>
          <p>
            INSS:{" "}
            {paycheck.inssValue.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
              minimumFractionDigits: 2,
            })}
          </p>
          <p>
            IRRF:{" "}
            {paycheck.irrfValue.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
              minimumFractionDigits: 2,
            })}
          </p>
          <p>
            Salário Total:{" "}
            {paycheck.totalSalary.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
              minimumFractionDigits: 2,
            })}
          </p>
          <ButtonUpdate setViewEditForm={setViewEditForm} />
        </div>
      )}
    </>
  );
}
