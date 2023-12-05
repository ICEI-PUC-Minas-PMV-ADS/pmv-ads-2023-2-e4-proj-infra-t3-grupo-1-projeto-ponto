import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import DepartamentForm from "./components/DepartamentForm";
import {
  getDepartaments,
  deleteDepartament,
} from "../../services/departamentService";
import Departament from "./components/Departament";
import styles from "./index.module.css";

export default function Departaments() {
  const [departaments, setDepartaments] = useState([]);
  const params = useParams();

  const handleDeleteDepartament = async (id) => {
    try {
      const response = await deleteDepartament(id);
      const newDepartaments = departaments.filter(
        (departaments) => departaments.id !== id
      );
      setDepartaments(newDepartaments);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    async function fetchData(id) {
      try {
        const response = await getDepartaments(id);
        if (Array.isArray(response.data)) {
          setDepartaments(response.data);
        } else {
          console.error(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchData(params.userId);
  }, [params.userId]);

  return (
    <div className={styles.containerDepartaments}>
      <div className={styles.departamentContent}>
        <h2 className={styles.itens}>Departamentos</h2>
        <div className={styles.departamentScroll}>
          <div className={styles.departamentGerador}>
            {departaments.map((departament) => {
              return (
                <div className={styles.departamentItens} key={departament.id}>
                  <Departament
                    departament={departament}
                    handleDeleteDepartament={handleDeleteDepartament}
                    setDepartaments={setDepartaments}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className={styles.contentDepartaments}>
        <h2 className={styles.itens}>Adicionar Departamentos</h2>
        <div className={styles.formDepartaments}>
          <DepartamentForm setDepartaments={setDepartaments} />
        </div>
        {/* <h2>Criar um novo departamento</h2> */}
        {/* <DepartamentForm setDepartaments={setDepartaments} /> */}
      </div>
    </div>
  );
}
