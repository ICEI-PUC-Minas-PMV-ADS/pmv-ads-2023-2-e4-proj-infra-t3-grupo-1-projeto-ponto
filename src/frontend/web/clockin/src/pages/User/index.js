import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getUser, logoutUser } from "../../services/userService";
import ButtonUpdate from "../../components/ButtonUpdate";
import { deleteUser } from "../../services/userService";
import UserEditForm from "./components/UserEditForm";
import ButtonDelete from "../../components/ButtonDelete";
import useAuthentication from "../../hooks/useAuthentication";
import styles from "./index.module.css";

export default function User() {
  const [user, setUser] = useState({});
  const [viewEditForm, setViewEditForm] = useState(false);
  const { isTokenValid, logout } = useAuthentication();
  const params = useParams();

  useEffect(() => {
    isTokenValid();
    async function fetchData(id) {
      try {
        const response = await getUser(id);
        setUser(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData(params.userId);
  }, [params.userId, isTokenValid]);

  const handleDeleteUser = async (id) => {
    try {
      await deleteUser(id);
      logout();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {viewEditForm ? (
        <UserEditForm
          userProp={user}
          setViewEditForm={setViewEditForm}
          setUser={setUser}
        />
      ) : (
        <div className={styles.containerUser}>
          <div className={styles.contentUser}>
            <h1 className={styles.itens}>Bem-vindo(a)!</h1>
            <h3 className={styles.itens}>
              <strong>Informações</strong>
            </h3>
            <div className={styles.infoUser}>
              <p>
                <strong>Nome completo:</strong> {user.fullName}
              </p>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <p>
                <strong>CNPJ:</strong> {user.cnpj}
              </p>
              <div className={styles.buttonUser}>
                <ButtonUpdate setViewEditForm={setViewEditForm} />
                <ButtonDelete handleDelete={handleDeleteUser} id={user.id} />
              </div>
              <div className={styles.opcaoesUser}>
                <Link
                  to={`/rh/${params.userId}/departamentos`}
                  data-cy="departaments-link"
                >
                  Departamentos
                </Link>
                <Link
                  to={`/rh/${params.userId}/cargos`}
                  data-cy="positions-link"
                >
                  Cargos
                </Link>
                <Link
                  to={`/rh/${params.userId}/colaboradores`}
                  data-cy="employees-link"
                >
                  Colaboradores
                </Link>
                <Link
                  to={`/rh/${params.userId}/justificativas`}
                  data-cy="justifications-link"
                >
                  Justificativas
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
