import React, { useState } from "react";
import ButtonDelete from "../../../../components/ButtonDelete";
import ButtonUpdate from "../../../../components/ButtonUpdate";
import DepartamentEditForm from "../DepartamentEditForm";


export default function Departament({
  departament,
  handleDeleteDepartament,
  setDepartaments,
}) {
  const [viewEditForm, setViewEditForm] = useState(false);

  return (
    <div>
      {viewEditForm ? (
        <DepartamentEditForm
          setDepartaments={setDepartaments}
          departamentProp={departament}
          setViewEditForm={setViewEditForm}
          viewEditForm={viewEditForm}
        />
      ) : (
        <div>
          <p>{departament.name}</p>
          <ButtonUpdate setViewEditForm={setViewEditForm} />
          <ButtonDelete
            handleDelete={handleDeleteDepartament}
            id={departament.id}
          />
        </div>
      )}
    </div>
  );
}
