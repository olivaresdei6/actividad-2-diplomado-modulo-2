// Se capturan los elementos del DOM
const form = document.getElementsByClassName("registro__form")[0];
const inputNombre = document.getElementById("nombre");
const inputApellido = document.getElementById("apellido");
const inputIdentificacion = document.getElementById("identificacion");
const inputEmail = document.getElementById("correo");
const inputDireccion = document.getElementById("direccion");
const inputTelefono = document.getElementById("telefono");
const tabla = document.getElementsByClassName("datos__tabla");

const btnEnviar = document.getElementById("enviar");
// Se escucha el evento submit del formulario
form.addEventListener("submit", (e) => {
    e.preventDefault();
    // Se capturan los valores de los inputs
    const identificacion = inputIdentificacion.value;
    const nombre = inputNombre.value;
    const apellido = inputApellido.value;
    const email = inputEmail.value;
    const direccion = inputDireccion.value;
    const telefono = inputTelefono.value;

    if (identificacion === "" || nombre === "" || apellido === "" || email === "" || direccion === "" || telefono === "") {
        alert("Todos los campos son obligatorios");
        return;
    }

    // Se crea un objeto con los datos del formulario
    const data = { identificacion, nombre, apellido, email, direccion, telefono };
    // Se muestra en consola el objeto
    guardarDatos(data);
});

// Se crea otro evento que cuando se cargue la página se muestren los datos del localStorage
window.addEventListener("DOMContentLoaded", () => {
    // Se obtiene el objeto del localStorage
    const datos = JSON.parse(localStorage.getItem("datos"));
    console.log(datos);
    // Se no existen datos se agregan 3 registros y se almacenan en el localStorage
    if (!datos) {
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
        guardarDatos(data1);
        guardarDatos(data2);
        guardarDatos(data3);
    }
    if (datos) {
        console.log(datos);
        // Se anexa la tabla con los datos del localStorage
        datos.forEach((data) => {
            tabla[0].innerHTML += `
                <tr>
                    <td>${data.identificacion}</td>
                    <td>${data.nombre}</td>
                    <td>${data.apellido}</td>
                    <td>${data.email}</td>
                    <td>${data.telefono}</td>
                    <td>${data.direccion}</td>
                </tr>
            `;
        })
    }
});

const guardarDatos = (data) => {
    // Se guarda el objeto en el localStorage en formato JSON
    // Antes de guardar se extrae el objeto del localStorage y se guarda en un array
    const datos = JSON.parse(localStorage.getItem("datos")) || [];
    console.log(datos);
    // Se agrega el nuevo objeto al array
    // Se verifica que el objeto no exista en el array
    const existe = datos.find((dato) => dato.identificacion === data.identificacion);
    if (existe) {
        alert("El usuario ya existe");
        return;
    }
    datos.push(data);
    // Se guarda el array en el localStorage
    localStorage.setItem("datos", JSON.stringify(datos));

    // Se anexa la tabla con los datos del formulario manteniendo los datos anteriores
    tabla[0].innerHTML += `
        <tr>
            <td>${data.identificacion}</td>
            <td>${data.nombre}</td>
            <td>${data.apellido}</td>
            <td>${data.email}</td>
            <td>${data.telefono}</td>
            <td>${data.direccion}</td>
        </tr>
    `;
};
