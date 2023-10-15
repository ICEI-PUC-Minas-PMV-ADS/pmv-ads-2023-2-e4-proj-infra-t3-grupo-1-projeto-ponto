import React from "react";
import { FaUserLarge } from "react-icons/fa6";
import ButtonDelete from "../../../../components/ButtonDelete";
import { useNavigate } from "react-router-dom";

export default function Employee({ employee, handleDeletehemployee }) {
  const navigate = useNavigate();

  const handleMoreInfo = (id) => {
    navigate(`${id}`);
  };
  return (
    <span>
      <p>{employee.fullName}</p>
      <button onClick={() => handleMoreInfo(employee.id)}>
        <FaUserLarge />
      </button>
      <ButtonDelete handleDelete={handleDeletehemployee} id={employee.id} />
    </span>
  );
}
