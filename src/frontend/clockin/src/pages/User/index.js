import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getUser } from "../../services/UserService";
import ButtonUpdate from "../../components/ButtonUpdate";
import { deleteUser } from "../../services/UserService";
import UserEditForm from "./components/UserEditForm";
import ButtonDelete from "../../components/ButtonDelete";
import useAuthentication from "../../hooks/useAuthentication";

export default function User() {
  const [user, setUser] = useState({});
  const [viewEditForm, setViewEditForm] = useState(false);
  const { isTokenValid } = useAuthentication();
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
      const response = await deleteUser(id);
      console.log(response);
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
        <div>
          <div>
            <h1>Informações</h1>
            <h3>Nome completo: {user.fullName}</h3>
            <h3>Email: {user.email}</h3>
            <h3>CNPJ: {user.cnpj}</h3>
            <ButtonUpdate setViewEditForm={setViewEditForm} />
            <ButtonDelete handleDelete={handleDeleteUser} id={user.id} />
          </div>
          <div>
            <Link to={`/rh/${params.userId}/departamentos`}>
              Meus departamentos
            </Link>
            <Link to={`/rh/${params.userId}/cargos`}>Meus cargos</Link>
            <Link to={`/rh/${params.userId}/colaboradores`}>
              Meus colaboradores
            </Link>
            <Link to={`/rh/${params.userId}/justificativas`}>
              Minhas justificativas
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
