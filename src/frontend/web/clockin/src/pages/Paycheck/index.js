import { React, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPaycheck } from "../../services/paycheckService";
import { getEmployee } from "../../services/employeeService";
import ButtonUpdate from "../../components/ButtonUpdate";
import PaycheckEditForm from "./PaycheckEditForm";
import useAuthentication from "../../hooks/useAuthentication";
import { generatePdf } from "../../services/pdfService";

import styles from "./index.module.css";

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
  const getHtmlContent = () => {
    const table = document.querySelector("table");
    if (table) {
      return table.outerHTML.replace(/"/g, `"`);
    } else {
      return "";
    }
  };

  const generatePdfHandle = async () => {
    try {
      const htmlContent = getHtmlContent();
      const employeeId = params.employeeId;
      await generatePdf({ htmlContent, employeeId });
    } catch (error) {
      console.error("Houve um erro ao gerar o PDF:", error);
    }
  };

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
  }, [params.paycheckId, isTokenValid, setEmployee]);

  return (
    <div className={styles.containerDemonstrativo}>
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
        <div className={styles.contentDemonstrativo}>
          <div className={styles.tableEdit}>
            <table
              border="1"
              style={{
                borderCollapse: "collapse",
                padding: "10px",
                textAlign: "center",
              }}
            >
              <thead>
                <tr>
                  <th style={{ padding: "10px" }}>Nome:</th>
                  <td style={{ padding: "10px" }}>{employee.fullName}</td>
                  <th style={{ padding: "10px" }}>Cargo:</th>
                  <td style={{ padding: "10px" }}>{employee.position}</td>
                </tr>
                <tr>
                  <th style={{ padding: "10px" }}>Departamento:</th>
                  <td style={{ padding: "10px" }}>{employee.departament}</td>
                  <th style={{ padding: "10px" }}>Data:</th>
                  <td style={{ padding: "10px" }}>
                    {paycheck.startDate} a {paycheck.endDate}
                  </td>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <th style={{ padding: "10px" }}>Descrição</th>
                  <th style={{ padding: "10px" }}>Referência</th>
                  <th style={{ padding: "10px" }}>Vencimentos</th>
                  <th style={{ padding: "10px" }}>Descontos</th>
                </tr>
                <tr>
                  <td style={{ padding: "10px" }}>Salário Base</td>
                  <td style={{ padding: "10px" }}>{paycheck.standardHours}</td>
                  <td style={{ padding: "10px" }}>
                    {paycheck.baseSalary.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                      minimumFractionDigits: 2,
                    })}
                  </td>
                  <td style={{ padding: "10px" }}></td>
                </tr>
                <tr>
                  <td style={{ padding: "10px" }}>Horas Extras</td>
                  <td style={{ padding: "10px" }}>{paycheck.overtimeHours}</td>
                  <td style={{ padding: "10px" }}>
                    {paycheck.overtimeHourlyRate.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                      minimumFractionDigits: 2,
                    })}
                  </td>
                  <td style={{ padding: "10px" }}></td>
                </tr>
                <tr>
                  <td style={{ padding: "10px" }}>Dias trabalhados</td>
                  <td style={{ padding: "10px" }}>
                    {paycheck.daysWorked} Dia(s)
                  </td>
                  <td style={{ padding: "10px" }}></td>
                  <td style={{ padding: "10px" }}></td>
                </tr>
                <tr>
                  <td style={{ padding: "10px" }}>
                    Total de Horas Trabalhadas
                  </td>
                  <td style={{ padding: "10px" }}>{paycheck.totalHours}</td>
                  <td style={{ padding: "10px" }}></td>
                  <td style={{ padding: "10px" }}></td>
                </tr>
                <tr>
                  <td style={{ padding: "10px" }}>INSS</td>
                  <td style={{ padding: "10px" }}></td>
                  <td style={{ padding: "10px" }}></td>
                  <td style={{ padding: "10px" }}>
                    {paycheck.inssValue.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                      minimumFractionDigits: 2,
                    })}
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "10px" }}>IRRF</td>
                  <td style={{ padding: "10px" }}></td>
                  <td style={{ padding: "10px" }}></td>
                  <td style={{ padding: "10px" }}>
                    {paycheck.irrfValue.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                      minimumFractionDigits: 2,
                    })}
                  </td>
                </tr>
              </tbody>

              <tfoot>
                <tr>
                  <th style={{ padding: "10px" }}>FGTS</th>
                  <td colSpan={3} style={{ padding: "10px" }}>
                    {paycheck.fgtsValue.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                      minimumFractionDigits: 2,
                    })}
                  </td>
                </tr>
                <tr>
                  <th style={{ padding: "10px" }}>Salário Líquido:</th>
                  <td colSpan={3} style={{ padding: "10px" }}>
                    {paycheck.totalSalary.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                      minimumFractionDigits: 2,
                    })}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
          <div className={styles.buttonEditarInfos}>
            <ButtonUpdate setViewEditForm={setViewEditForm} />
          </div>
          <button className={styles.buttonGerarPDF} onClick={generatePdfHandle}>
            Gerar PDF
          </button>
        </div>
      )}
    </div>
  );
}
