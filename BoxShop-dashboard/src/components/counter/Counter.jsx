import { useState, useEffect } from "react";

export const Counter = () => {
  const [products, setProducts] = useState(null);
  const [users, setUsers] = useState(null);
  const [categories, setCategories] = useState(null);

  const fetchData = async (endpoint, setData) => {
    try {
      const res = await fetch(endpoint);
      const data = await res.json();
      console.log(`Datos desde ${endpoint}:`, data); // ✅ DEBUG
      setData(data);
    } catch (error) {
      console.error("Error al obtener datos desde " + endpoint, error);
    }
  };

useEffect(() => {
  fetchData("/api/products", setProducts);
  fetchData("/api/users", setUsers);
  fetchData("/api/categories", setCategories);
}, []);


  return (
    <div>
      {products && users && categories ? (
        <>
          <div>
            <h3>Items totales</h3>
            <ul>
              <li>Productos: {products.count}</li>
              <li>Usuarios: {users.count}</li>
              <li>Categorías: {categories.count}</li>
            </ul>
          </div>
        </>
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
};
