import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import PositionForm from "./components/PositionForm";
import { getPositions, deletePosition } from "../../services/PositionsService";

export default function Positions() {
  const [positions, setPositions] = useState([]);
  const [error, setError] = useState(null);
  const params = useParams();

  const handleDeleteCargo = async (id) => {
    try {
      const response = await deletePosition(id);
      const newPositions = positions.filter((position) => position.id !== id);
      setPositions(newPositions);
      console.log(response);
    } catch (error) {}
  };

  useEffect(() => {
    async function fetchData(id) {
      try {
        const response = await getPositions(id);
        if(Array.isArray(response.data)){
          setPositions(response.data);
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
        <h1>Cargos: </h1>
        {error && <div>{error}</div>}
        <div>
          {positions.map((position) => {
            return (
              <div key={position.id}>
                <h3>Nome: {position.name}</h3>
                <h3>Valor da hora: {position.hrValue}</h3>
                <button onClick={() => handleDeleteCargo(position.id)}>
                  Excluir
                </button>
              </div>
            );
          })}
        </div>
        <h2>Criar um novo cargo</h2>
        <PositionForm setPositions={setPositions} />
      </div>
    </div>
  );
}
