import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import PositionForm from "./components/PositionForm";
import { getPositions, deletePosition } from "../../services/positionsService";
import Position from "./components/Position";
import useAuthentication from "../../hooks/useAuthentication";

export default function Positions() {
  const [positions, setPositions] = useState([]);
  const { isTokenValid } = useAuthentication();
  const params = useParams();

  const handleDeletePosition = async (id) => {
    try {
      const response = await deletePosition(id);
      const newPositions = positions.filter((position) => position.id !== id);
      setPositions(newPositions);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    isTokenValid();
    async function fetchData(id) {
      try {
        const response = await getPositions(id);
        if (Array.isArray(response.data)) {
          setPositions(response.data);
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
        <h1>Cargos: </h1>
        <div>
          {positions.map((position) => {
            return (
              <div key={position.id}>
                <Position
                  position={position}
                  handleDeletePosition={handleDeletePosition}
                  setPositions={setPositions}
                />
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
