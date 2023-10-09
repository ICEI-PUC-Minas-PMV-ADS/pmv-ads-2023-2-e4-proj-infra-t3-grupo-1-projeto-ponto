import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getUser } from "../../services/UserService";

export default function User() {
  const [user, setUser] = useState({});
  const [error, setError] = useState();
  const params = useParams()

  useEffect(() => {
    async function fetchData(id) {
      try {
        const response = await getUser(id);
        setUser(response.data);
      } catch (error) {
        setError(error)
      }
    }
    fetchData(params.userId);
  }, [params]);

  return (
    <>
      {user && (
        <div>
          <div>
            <h1>Informações</h1>
            <h3>Nome completo: {user.fullName}</h3>
            <h3>Email: {user.email}</h3>
            <h3>CNPJ: {user.cnpj}</h3>
          </div>
          <div>
            <Link to={`/rh/${params.userId}/departamentos`}>Meus departamentos</Link>
            <Link to={`/rh/${params.userId}/cargos`}>Meus cargos</Link>
            <Link to={`/rh/${params.userId}/colaboradores`}>Meus colaboradores</Link>
            <Link to={`/rh/${params.userId}/justificativas`}>
              Minhas justificativa
            </Link>
          </div>
        </div>
      )}
      {!user &&
      <div>{error}</div>
      }
    </>
  );
}
