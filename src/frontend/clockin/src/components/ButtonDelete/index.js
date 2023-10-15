import React from "react";
import { FaTrash } from "react-icons/fa";

export default function ButtonDelete({handleDelete, id}) {
  

  return (
    <button onClick={() => handleDelete(id)}>
      <FaTrash/>
    </button>
  );
}
