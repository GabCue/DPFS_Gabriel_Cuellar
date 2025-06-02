window.onload = () => {
  console.log("Ventana cargada");

  const form = document.querySelector("form");
  const errorList = document.querySelector(".errors");

  form.onsubmit = (e) => {
    const errors = [];
    errorList.innerHTML = "";

    const nombre = form.nombre.value.trim();
    const tipo = form.tipo_de_producto.value;
    const descripcion = form.descripcion.value.trim();
    const precio = form.precio.value.trim();
    const categorias = form.querySelectorAll("input[name='category_ids[]']:checked");


    if (!nombre || nombre.length < 2) {
      errors.push("El nombre debe tener al menos 2 caracteres.");
    }

    if (!tipo) {
      errors.push("Debe seleccionar un tipo de producto.");
    }

    if (!descripcion || descripcion.length < 10) {
      errors.push("La descripción debe tener al menos 10 caracteres.");
    }

    if (!precio || !validator.isNumeric(precio)) {
      errors.push("Debe ingresar un precio numérico válido.");
    }

    if (categorias.length === 0) {
      errors.push("Debe seleccionar al menos una categoría.");
    }


    if (errors.length > 0) {
      e.preventDefault();
      errors.forEach((err) => {
        const li = document.createElement("li");
        li.textContent = err;
        errorList.appendChild(li);
      });
      console.warn("Errores de validación:", errors);
    }
  };
};
