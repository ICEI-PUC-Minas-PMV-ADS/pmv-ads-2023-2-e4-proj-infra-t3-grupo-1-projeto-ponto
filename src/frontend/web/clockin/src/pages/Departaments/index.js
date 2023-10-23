import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import DepartamentForm from "./components/DepartamentForm";
import {
  getDepartaments,
  deleteDepartament,
} from "../../services/departamentService";
import Departament from "./components/Departament";

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
      console.log(response);
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
          console.log(response);
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
    <div>
      <div>
        <h1>Departamentos: </h1>
        <div>
          {departaments.map((departament) => {
            return (
              <div key={departament.id}>
                <Departament
                  departament={departament}
                  handleDeleteDepartament={handleDeleteDepartament}
                  setDepartaments={setDepartaments}
                />
              </div>
            );
          })}
        </div>
        <h2>Criar um novo departamento</h2>
        <DepartamentForm setDepartaments={setDepartaments} />
      </div>
    </div>
  );
}
