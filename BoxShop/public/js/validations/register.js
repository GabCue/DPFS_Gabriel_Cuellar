window.onload = () => {
    const form = document.querySelector("form");
    const errorList = document.querySelector(".errors");
  
    form.onsubmit = (e) => {
      errorList.innerHTML = "";
      
      const first_name = form.first_name.value.trim();
      const last_name = form.last_name.value.trim();
      const email = form.email.value.trim();
      const password = form.password.value.trim();
  
      let errors = [];
      
      if (validator.isEmpty(first_name)) {
        errors.push("Debes ingresar un Nombre");
      }

          if (!validator.isLength(first_name, { min: 2 })) {
      errors.push("El Nombre debe tener al menos 2 caracteres");
    }
  
      if (validator.isEmpty(last_name)) {
        errors.push("Debes ingresar un Apellido");
      }

                if (!validator.isLength(last_name, { min: 2 })) {
      errors.push("El Apellido debe tener al menos 2 caracteres");
    }

      if (!validator.isEmail(email)) {
        errors.push("El formato de email no es correcto");
      }
  
      if (validator.isEmpty(password)) {
        errors.push("Debes ingresar un password");
      }
  
      if (!validator.isLength(password, { min: 8 })) {
        errors.push("El password debe tener al menos 8 caracteres");
      }
  
      if (errors.length > 0) {
        errorList.classList.add("display-error");
        e.preventDefault();
        errors.forEach((err) => {
          errorList.innerHTML += `<li>${err}</li>`;
        });
      }
    };
  };
  