import { React, useState } from "react";
import ButtonDelete from "../../../../components/ButtonDelete";
import ButtonUpdate from "../../../../components/ButtonUpdate";
import JustificationEditForm from "../JustificationEditForm";

export default function Justification({
  justification,
  handleDeleteJustification,
  setJustifications,
}) {
  const [viewEditForm, setViewEditForm] = useState(false);

  return (
    <>
      {viewEditForm ? (
        <JustificationEditForm
          setJustifications={setJustifications}
          justificationProp={justification}
          setViewEditForm={setViewEditForm}
          viewEditForm={viewEditForm}
        />
      ) : (
        <div>
          <p>Nome: {justification.name}</p>
          <p>Descrição: {justification.description}</p>
          <ButtonUpdate setViewEditForm={setViewEditForm} />
          <ButtonDelete
            handleDelete={handleDeleteJustification}
            id={justification.id}
          />
        </div>
      )}
    </>
  );
}
