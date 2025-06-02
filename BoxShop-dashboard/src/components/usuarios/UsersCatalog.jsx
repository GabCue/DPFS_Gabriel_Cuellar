import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export const UsersCatalog = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then((data) => setUsers(data.users))
      .catch((e) => console.error("Error al cargar usuarios:", e));
  }, []);

  return (
    <div>
      <h3>Catálogo de usuarios</h3>
      {users.length > 0 ? (
        <ul>
          {users.map((user) => (
            <Link key={user.id} to={`/users/${user.id}`}>
              <div>
                <h4>{user.first_name} {user.last_name}</h4>
                <p>{user.email || "Sin email"}</p>
                <img
                  src={user.urlAvatar}
                  alt={`Avatar de ${user.first_name}`}
                  width={100}
                />
              </div>
            </Link>
          ))}
        </ul>
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
};
