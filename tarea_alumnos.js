// Tarea: completar CRUD simulado de alumnos usando arrays

const readline = require("readline");

const ASIGNATURA = "Metodologias de Desarrollo";

const alumnos = [
  { id: 1, nombre: "Ana Perez", email: "ana@correo.com", seccion: "A" },
  { id: 2, nombre: "Luis Soto", email: "luis@correo.com", seccion: "B" },
  { id: 3, nombre: "Marta Diaz", email: "marta@correo.com", seccion: "A" },
];

let siguienteId = 4;

// 1) Crear alumno
function crearAlumno(nombre, email, seccion) {
    const nuevoAlumno = { //creamos una nueva entidad con sus debidos atributos
        id: siguienteId,
        nombre,
        email,
        seccion,
    };
    alumnos.push(nuevoAlumno); //realizamos un push a la tabla

    siguienteId +=1; //aumentamos la Id, por la creacion de un nuevo objeto
    return nuevoAlumno; //retornamos el nuevo objeto
}

// 2) Listar alumnos
function listarAlumnos() {
    return alumnos; //mostramos la tabla
}

// 3) Obtener alumno por id
function obtenerAlumnoPorId(id) {
    return alumnos.find((alumnos)=>alumnos.id === id); //buscamos por Id y retornamos lo encontrados
}
// Buscar alumno por seccion
function buscarAlumnosPorSeccion(seccion) {
    const listaSeccion = []; //creamos un array
    for(let i = 0;i<alumnos.length;i++){
        if(seccion === alumnos[i].seccion){ //buscamos la secciones en la tabla alumnos
            listaSeccion.push(alumnos[i]); //realizamos un push en el nuevo array con las secciones encontradas
        }
    }
    return listaSeccion; //retornamos la lista para mostrarla
}


// 4) Actualizar alumno por id
function actualizarAlumno(id, datosActualizados) {
    const alumno = obtenerAlumnoPorId(id); //buscamos la id y acceder a la lista

    if(!alumno){
        return null;
    }
    //actualizar nombre
    if(datosActualizados.nombre !== undefined){   //undefined: variable declarada pero sin valor
        alumno.nombre = datosActualizados.nombre;
    }
    //Actualizar email
    if(datosActualizados.email !== undefined){ 
        alumno.email = datosActualizados.email;
    }
    //actualizar seccion
    if(datosActualizados.seccion !== undefined){
        alumno.seccion = datosActualizados.seccion;
    }

    return alumno; //retornar para actualizar el objeto
}

// 5) Eliminar alumno por id
function eliminarAlumno(id) {
    const indice = alumnos.findIndex((alumno)=> alumno.id == id); //busca por indice

    if(indice === -1){ //verifica si existe
        return false;
    }
    alumnos.splice(indice, 1); //elimina del arreglo
    return true; //retorna tue
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function preguntar(texto) {
  return new Promise((resolve) => {
    rl.question(texto, (respuesta) => {
      resolve(respuesta.trim());
    });
  });
}

function toNumber(valor) {
  const numero = Number(valor);
  return Number.isNaN(numero) ? null : numero;
}

function mostrarMenu() {
  console.log("\n=== MENU TAREA CRUD ===");
  console.log("Asignatura:", ASIGNATURA);
  console.log("1) Listar alumnos");
  console.log("2) Crear alumno");
  console.log("3) Buscar alumno por id");
  console.log("4) Buscar alumnos por seccion");
  console.log("5) Editar alumno");
  console.log("6) Eliminar alumno");
  console.log("0) Salir");
}

async function ejecutarMenu() {
  let continuar = true;

  while (continuar) {
    mostrarMenu();
    const opcion = await preguntar("Selecciona una opcion: ");

    switch (opcion) {
      case "1": {
        const lista = listarAlumnos();
        if (!Array.isArray(lista)) {
          console.log("TODO: completar listarAlumnos().");
          break;
        }
        console.table(lista);
        break;
      }

      case "2": {
        const nombre = await preguntar("Nombre: ");
        const email = await preguntar("Email: ");
        const seccion = await preguntar("Seccion: ");

        const nuevoAlumno = crearAlumno(nombre, email, seccion);
        console.log("Resultado de crearAlumno():", nuevoAlumno);
        break;
      }

      case "3": {
        const id = toNumber(await preguntar("ID a buscar: "));
        if (id === null) {
          console.log("ID invalido.");
          break;
        }

        const alumno = obtenerAlumnoPorId(id);
        console.log("Resultado de obtenerAlumnoPorId():", alumno);
        break;
      }
      case "4": {
        //busqueda por seccion
        const seccion = await preguntar ("Seccion a buscar: ");
        const codigo = seccion.charCodeAt(0);
        if(seccion.length > 1 || codigo < 65 || codigo >90){ //verificamos que lo ingresado sea correcto, limitando la longitud y caracter ingresado
            console.log("Seccion invalida");
            break;
        }
        const lista = buscarAlumnosPorSeccion(seccion); //llamamos la funcion buscar seccion
        //mostramos los alumnos que pertenencen a esa seccion
        if (!Array.isArray(lista)) {
          console.log("TODO: completar listarAlumnos().");
          break;
        }
        console.table(lista);
        break;
      }

      case "5": {
        const id = toNumber(await preguntar("ID a editar: "));
        if (id === null) {
          console.log("ID invalido.");
          break;
        }

        const nombre = await preguntar("Nuevo nombre (Enter para mantener): ");
        const email = await preguntar("Nuevo email (Enter para mantener): ");
        const seccion = await preguntar("Nueva seccion (Enter para mantener): ");

        const datosActualizados = {};
        if (nombre) datosActualizados.nombre = nombre;
        if (email) datosActualizados.email = email;
        if (seccion) datosActualizados.seccion = seccion;

        const actualizado = actualizarAlumno(id, datosActualizados);
        console.log("Resultado de actualizarAlumno():", actualizado);
        break;
      }

      case "6": {
        const id = toNumber(await preguntar("ID a eliminar: "));
        if (id === null) {
          console.log("ID invalido.");
          break;
        }

        const eliminado = eliminarAlumno(id);
        console.log("Resultado de eliminarAlumno():", eliminado);
        break;
      }

      case "0": {
        continuar = false;
        console.log("Saliendo del programa...");
        break;
      }

      default: {
        console.log("Opcion no valida.");
      }
    }
  }

  rl.close();
}

ejecutarMenu();
