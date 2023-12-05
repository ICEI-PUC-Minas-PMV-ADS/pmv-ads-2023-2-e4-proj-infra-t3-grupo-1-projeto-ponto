import { useState } from "react";
import { getUser, putUser } from "../../../../services/userService";
import ButtonSubmitForm from "../../../../components/ButtonSubmitForm";
import ButtonCancel from "../../../../components/ButtonCancel";
import InputForm from "../../../../components/InputForm";

import styles from "./index.module.css";

function UserEditForm({ userProp, setViewEditForm, setUser }) {
  const [fullName, setFullName] = useState(userProp.fullName);
  const [cnpj, setCnpj] = useState(userProp.cnpj);
  const [email, setEmail] = useState(userProp.email);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const hRAdministrator = {
        fullName: fullName,
        email: email,
        cnpj: cnpj,
        id: userProp.id,
      };
      const responseUpdate = await putUser(hRAdministrator);
      const responseUser = await getUser(userProp.id);
      setUser(responseUser.data);
      setViewEditForm(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.containerNewUser}>
      <div className={styles.contentNewUser}>
        <h2 className={styles.titulo}>Criar Novo Usuário</h2>
        <div className={styles.formNewUser}>
          <form onSubmit={handleSubmit}>
            <InputForm
              value={fullName}
              changeValue={(name) => setFullName(name)}
              required={false}
              type={"text"}
              placeholder={"Digite aqui o nome da sua empresa"}
              label={"Nome"}
            />
            <InputForm
              value={cnpj}
              changeValue={(name) => setCnpj(name)}
              required={false}
              type={"text"}
              placeholder={"Digite aqui o CNPJ da sua empresa"}
              label={"CNPJ"}
            />
            <InputForm
              value={email}
              changeValue={(name) => setEmail(name)}
              required={false}
              type={"email"}
              placeholder={"Digite aqui o email da sua empresa"}
              label={"Email"}
            />
            <ButtonSubmitForm textButton={"Enviar"} />
            <ButtonCancel setViewEditForm={setViewEditForm} />
          </form>
        </div>
      </div>
    </div>
  );
}

export default UserEditForm;
