import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import DepartamentForm from "./components/DepartamentForm";
import {
  getDepartaments,
  deleteDepartament,
} from "../../services/DepartamentService";

export default function Departaments() {
  const [departaments, setDepartaments] = useState([]);
  const [error, setError] = useState(null);
  const params = useParams();

  const handleDeleteDepartament = async (id) => {
    try {
      const response = await deleteDepartament(id);
      const newDepartaments = departaments.filter(
        (departaments) => departaments.id !== id
      );
      setDepartaments(newDepartaments);
      console.log(response);
    } catch (error) {}
  };

  useEffect(() => {
    async function fetchData(id) {
      try {
        const response = await getDepartaments(id);
        if(Array.isArray(response.data)){
          setDepartaments(response.data);
          console.log(response)
        }
        else{
          setError(response.data)
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
        <h1>Departamentos: </h1>
        {error && <div>{error}</div>}
        <div>
          {departaments.map((departament) => {
            return (
              <div key={departament.id}>
                <h3>Nome: {departament.name}</h3>
                <button onClick={() => handleDeleteDepartament(departament.id)}>
                  Excluir
                </button>
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
