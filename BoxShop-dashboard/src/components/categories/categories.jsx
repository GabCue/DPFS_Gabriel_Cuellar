import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data.categories))
      .catch((e) => console.error(e));
  }, []);

  return (
    <div>
      <h3>Categorías y sus productos</h3>
      {categories.length ? (
        categories.map((category) => (
          <div key={category.id} style={{ marginBottom: "2rem" }}>
            <h4>{category.name}</h4>
            {category.products && category.products.length > 0 ? (
              <ul>
                {category.products.map((product) => (
                  <li key={product.id}>
                    <Link to={`/products/${product.id}`}>
                      <h5>{product.name}</h5>
                      <p>${product.price}</p>
                      {/* Asegúrate de que `product.image` o `urlAvatar` esté disponible */}
                      {product.image && (
                        <img
                          src={product.image}
                          alt={`Imagen de ${product.name}`}
                          width={100}
                        />
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No hay productos en esta categoría.</p>
            )}
          </div>
        ))
      ) : (
        <p>Cargando categorías...</p>
      )}
    </div>
  );
};
