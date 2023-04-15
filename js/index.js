// Se capturan los elementos del DOM
const form = document.getElementsByClassName("registro__form")[0];
const inputNombre = document.getElementById("nombre");
const inputApellido = document.getElementById("apellido");
const inputIdentificacion = document.getElementById("identificacion");
const inputEmail = document.getElementById("correo");
const inputDireccion = document.getElementById("direccion");
const inputTelefono = document.getElementById("telefono");
const tabla = document.getElementsByClassName("datos__tabla");
/**
 * Se crea un evento que se dispara cuando se envía el formulario
 */
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = extractData();
    const validacion = validarCampos(data);
    validacion ? saveData(data) : undefined;
});

// Se crea otro evento que cuando se cargue la página se muestren los datos del localStorage
window.addEventListener("DOMContentLoaded", () => {
    const datos = getItemsFromLocalStorage();
    console.log('Datos: ', datos);
    datos.length > 0 ? mostrarDatos(datos) : upDefaultData();
});

const saveData = (data) => {
    insertData(data) ? mostrarDatos([data]) : undefined;
};

const insertData = (user) => {
    const users = getItemsFromLocalStorage();
    const isExistUsers = users.find((dato) => dato.identificacion === user.identificacion);
    if (isExistUsers){
        alert("El usuario ya existe");
        return false;
    }
    console.log('Usuario: ', user);
    users.push(user);
    setItemsToLocalStorage(users);
    clearForm();
    return true;
}

const validarCampos = ({ identificacion, nombre, apellido, email, direccion, telefono }) => {
    // Se valida que los campos no estén vacíos
    if (identificacion === "" || nombre === "" || apellido === "" || email === "" || direccion === "" || telefono === "") {
        alert("Todos los campos son obligatorios");
        return false;
    }
    return true;
}

const extractData = () => {
    // Se extraen los datos del formulario
    const identificacion = inputIdentificacion.value;
    const nombre = inputNombre.value;
    const apellido = inputApellido.value;
    const email = inputEmail.value;
    const direccion = inputDireccion.value;
    const telefono = inputTelefono.value;

    // se retorna un objeto con los datos
    return {
        identificacion,
        nombre,
        apellido,
        email,
        direccion,
        telefono,
    }
}

const getItemsFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem("datos")) || [];
}

const setItemsToLocalStorage = (data) => {
    console.log('Data: ', data)
    localStorage.setItem("datos", JSON.stringify(data));
}

const upDefaultData = () => {
    const data1 = {
        identificacion: "123456789",
        nombre: "Juan",
        apellido: "Perez",
        email: "juan87@gmail.com",
        direccion: "Calle 1",
        telefono: "123456789",
    };
    const data2 = {
        identificacion: "987654321",
        nombre: "Maria",
        apellido: "Gomez",
        email: "mari76@gmail.com",
        direccion: "Calle 2",
        telefono: "987654321",
    }

    const data3 = {
        identificacion: "456789123",
        nombre: "Pedro",
        apellido: "Lopez",
        email: "pedro@gmail.com",
        direccion: "Calle 3",
        telefono: "123456789",
    }
    setItemsToLocalStorage([data1, data2, data3]);
    mostrarDatos([data1, data2, data3]);
}

const mostrarDatos = (datos) => {
    // Se anexa la tabla con los datos que se reciben por parámetro
    datos.forEach((dato) => {
        tabla[0].innerHTML += `
            <tr>
                <td>${dato.identificacion}</td>
                <td>${dato.nombre}</td>
                <td>${dato.apellido}</td>
                <td>${dato.email}</td>
                <td>${dato.telefono}</td>
                <td>${dato.direccion}</td>
            </tr>
        `;
    });
}

const clearForm = () => {
    // Se limpian los campos del formulario
    inputIdentificacion.value = "";
    inputNombre.value = "";
    inputApellido.value = "";
    inputEmail.value = "";
    inputDireccion.value = "";
    inputTelefono.value = "";
}
