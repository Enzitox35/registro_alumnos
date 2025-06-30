// Clave API para autenticación 
const API_KEY = '12345ABCDEF';
const headers = {
    "Content-Type": "application/json", // Indica que el cuerpo de la solicitud se enviará en formato JSON.
    "Authorization": `Bearer ${API_KEY}` // Agrega el token de autenticación al encabezado Authorization usando el esquema Bearer.
};

// =======================
// Carreras - Servicios
// =======================

// Este valor es la URL que se utilizará para acceder al archivo index.js que funciona como API, en este caso
// para manipular las funciones relacionadas a carreras
const CAREERS_API_URL = "http://localhost:5001/api/careers";

// Función asíncrona que envía los datos de una nueva carrera al servidor mediante una solicitud POST
async function registerCareerService(data) {
  // Muestra los headers en la consola
  console.log('Headers:', headers); 
  
  // Realiza una solicitud HTTP POST al endpoint de carreras, enviando los datos en formato JSON
  const response = await fetch(CAREERS_API_URL, {
    method: 'POST',                 // Método HTTP POST para enviar datos
    headers,                        // Encabezados HTTP (pueden incluir Content-Type, Authorization, etc.)
    body: JSON.stringify(data)      // Convierte el objeto 'data' a una cadena JSON
  });

  // Verifica si la respuesta no fue exitosa
  if (!response.ok) {
    const errorText = await response.text();          // Obtiene el mensaje de error del servidor (si lo hay)
    throw new Error(errorText || "Error al registrar la carrera."); // Lanza un error con ese mensaje
  }

  // Si la solicitud fue exitosa, devuelve la respuesta convertida a JSON
  return response.json();
}

// Función asincrónica para obtener la información de una carrera específica por su ID
async function getCareerByIdService(id) {
    // Realiza una solicitud HTTP GET al endpoint que contiene la información de la carrera.
    // Usa la constante CAREERS_API_URL como URL base y le concatena el ID.
    const response = await fetch(`${CAREERS_API_URL}/${id}`, {
        method: "GET", // Método HTTP utilizado
        headers         // Encabezados HTTP (por ejemplo, pueden incluir autenticación, tipo de contenido, etc.)
    });

    // Espera a que se resuelva la promesa anterior y luego convierte la respuesta en formato JSON.
    return response.json(); // Devuelve los datos de la carrera como un objeto JavaScript
}

// Función que obtiene todas las carreras ingresadas en carreras.html desde un API
async function getAllCareersService() {
  // Hace una petición HTTP GET a la URL definida por CAREERS_API_URL
  const response = await fetch(CAREERS_API_URL, {
    method: 'GET', // Método HTTP
    headers         // Encabezados HTTP necesarios para la API (autenticación, tipo de contenido, etc.)
  });

  // Verifica si la respuesta es exitosa (código de estado HTTP 200–299)
  if (!response.ok) {
    // Si no lo es, extrae el texto del error de la respuesta
    const errorText = await response.text();
    
    // Lanza un error con el mensaje recibido o uno por defecto
    throw new Error(errorText || 'Error al obtener carreras.');
  }

  // En caso de proceder, convierte la respuesta en JSON y la devuelve
  return response.json();
}

// Función que sirve para eliminar una carrera específica al seleccionar su ID
async function deleteCareerService(id) { 
    // Realiza una petición HTTP DELETE a la URL de la carrera con el ID especificado
    const response = await fetch(`${CAREERS_API_URL}/${id}`, {
        method: "DELETE", // Método HTTP para eliminar recursos
        headers           // Encabezados HTTP, como autenticación o tipo de contenido
    });

    // Convierte la respuesta del servidor en JSON (si el servidor devuelve algún contenido)
    return response.json();
}

// Función que modifica una carrera existente por su ID
async function modifyCareerService(id) { 
    // Realiza una petición HTTP PUT a la URL de la carrera con el ID especificado
    const response = await fetch(`${CAREERS_API_URL}/${id}`, {
        method: "PUT",   // Método HTTP que se usa comúnmente para actualizar un recurso completo
        headers          // Encabezados HTTP como tipo de contenido, autenticación, etc.
    });

    // Convierte la respuesta del servidor a JSON y la devuelve
    return response.json();
}

// Función asincrónica que sirve para actualizar el nombre de una carrera existente
// por su ID
async function updateCareerService(id, name) {
    // Se realiza una solicitud HTTP PUT al endpoint específico de la carrera
    const response = await fetch(`http://localhost:5001/api/careers/${id}`, {
        method: 'PUT', // Método HTTP que se usa para reemplazar o actualizar un recurso
        headers: {
            'Content-Type': 'application/json',           // Se especifica que el cuerpo se envía en formato JSON
            'Authorization': 'Bearer 12345ABCDEF'         // Token de autorización (puede ser un API key o JWT)
        },
        body: JSON.stringify({ name }) // Se envía en el cuerpo el nuevo nombre de la carrera como JSON
    });

    // Verifica si la respuesta fue exitosa (códigos HTTP 200–299)
    if (!response.ok) {
        throw new Error("Falló al actualizar carrera."); // Lanza un error si la actualización falló
    }

    // Convierte la respuesta del servidor en JSON y la devuelve
    return await response.json();
}

// Función asincrónica que obtiene todas las carreras desde el backend para poder mostrarlas
// en este caso en el archivo alumnos.html que utiliza un <select> que incluye todas las
// carreras disponibles para elegirlas en el alumnos.html a la hora de registrar un estudiante
async function getAllCareersService() { 
  // Se hace una solicitud HTTP GET al endpoint de carreras
  const response = await fetch('http://localhost:5001/api/careers', {
    headers: {
      'Content-Type': 'application/json',          // Indica que se espera/acepta contenido JSON
      'Authorization': 'Bearer 12345ABCDEF'        // Encabezado de autenticación con token
    }
  });

  // Verifica si la respuesta fue exitosa
  if (!response.ok) {
    // Si hubo error, se lee el texto de la respuesta
    const errorText = await response.text();

    // Se lanza un error personalizado con el mensaje a continuación:
    throw new Error(errorText || "Error al obtener las carreras.");
  }

  // Si todo fue correcto, se convierte la respuesta a JSON y se retorna
  return response.json();
}


// =======================
// Carreras - UI
// =======================

// Función que registra una nueva carrera a través del formulario HTML ubicado
// en carreras.html
async function registerCareer() {
    Swal.fire({
        title: 'Registro exitoso',
        icon: "data:image/png;base64,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",
    })
  // Obtiene y limpia el valor ingresado en el campo de nombre de carrera
  const name = document.getElementById('careerName').value.trim();

  // Obtiene y convierte a número el valor de duración ingresado
  const duration = parseInt(document.getElementById('careerDuration').value);

  // Obtiene y convierte a número el valor del select de categoría
  const categoryId = parseInt(document.getElementById('registerCategorySelect').value);

  // Referencia al contenedor donde se mostrará el resultado del registro
  const resultContainer = document.getElementById('careerRegisterResult');

  // Validación de campos: si falta algún dato, muestra una alerta y no finaliza la ejecución
  if (!name || isNaN(duration) || isNaN(categoryId)) {
    alert("Por favor completá todos los campos correctamente.");
    return;
  }

  try {
    // Llama a la función que hace la petición al backend, enviando los datos de la carrera ingresada
    //en el carreras.html
    const result = await registerCareerService({ name, duration, categoryId });

    // Si la respuesta fue exitosa, muestra los datos de la carrera registrada en el DOM
    resultContainer.innerHTML = `
      <strong>Career registro exitoso!</strong><br><br>
      <strong>ID:</strong> ${result.career.id}<br>
      <strong>Name:</strong> ${result.career.name}
    `;
  } catch (error) {
    // En caso de error en la solicitud, lo muestra en consola y notifica al usuario en el front
    console.error("Error registrando carrera:", error);
    resultContainer.textContent = "Falló al registrar carrera.";
  }
}

// Función que obtiene los datos de una carrera por su ID desde un formulario
// ubicado en carreras.html
async function getCareerById() { 
    // Obtiene el valor del campo de entrada para el ID de la carrera
    const id = document.getElementById('careerId').value.trim();

    // Obtiene el contenedor donde se mostrará el resultado
    const resultContainer = document.getElementById('careerGetResult');

    // Validación: si el ID está vacío, se muestra una alerta y se corta la ejecución
    if (!id) {
        alert("Ingrese la ID de la carrera.");
        return;
    }

    try {
        // Llama al servicio para obtener la carrera por ID
        const career = await getCareerByIdService(id);

        // Verifica si la respuesta contiene un error y lo muestra
        // Si no hay error, muestra los datos de la carrera en el contenedor
        resultContainer.innerHTML = career.error ? career.error : `
            <strong>ID:</strong> ${career.id}<br>
            <strong>Nombre:</strong> ${career.name}
        `;
    } catch (error) {
        // Si ocurre una excepción (por ejemplo, problema de red o servidor), se muestra un mensaje de error
        console.error("Error obteniendo carrera:", error);
        resultContainer.textContent = "Falló al obtener carrera.";
    }
}

// Función que obtiene todas las carreras y las muestra en el DOM para que el
// usuario las pueda observar en el frontend si así se lo requiere
async function getAllCareers() { 
    // Se obtiene el contenedor donde se mostrarán las carreras
    const resultContainer = document.getElementById('careerListResult');

    try {
        // Se llama a la función que consulta todas las carreras desde el backend
        const careers = await getAllCareersService();

        // Si no se encontraron carreras, se muestra un mensaje y se detiene la ejecución
        if (careers.length === 0) {
            resultContainer.textContent = "No se encontraron carreras.";
            return;
        }

        // Si hay carreras, se limpia el contenedor para mostrar la lista actualizada
        resultContainer.innerHTML = '';

        // Se recorre cada carrera y se crea un bloque HTML para mostrarla
        careers.forEach(career => {
            const div = document.createElement('div');
            div.classList.add('career-card'); // Se le da una clase para estilo
            div.innerHTML = `
                <strong>ID:</strong> ${career.id}<br>
                <strong>Nombre:</strong> ${career.name}
            `;
            // Se agrega el bloque al contenedor principal
            resultContainer.appendChild(div);

            // Se agrega una línea separadora debajo de cada carrera
            resultContainer.appendChild(document.createElement('hr'));
        });

    } catch (error) {
        // En caso de un error (fallo en red, servidor, etc.), se captura acá
        // y se muestra un error en pantalla en el frontend
        console.error("Error obteniendo carreras:", error);
        resultContainer.textContent = "Falló al obtener carreras.";
    }
}

// Función cuya finalidad es eliminar una carrera por medio de su ID
async function deleteCareer() { 
    // Obtiene el ID de la carrera a eliminar desde el campo de entrada ubicado en careers.html
    const id = document.getElementById('deleteCareer').value.trim(); 

    // Obtiene el contenedor donde se mostrará el resultado de la operación
    const resultContainer = document.getElementById('deleteCareerResult'); 

    // Validación de entrada: si el ID está vacío, muestra una alerta y detiene la ejecución
    if (!id) {
        alert("Ingrese la ID de la carrera a eliminar.");
        return; // Detiene la función si no hay ID
    }

    try {
        // Llama al servicio asincrónico para eliminar la carrera con el ID proporcionado
        const result = await deleteCareerService(id);

        // Si la operación es exitosa, muestra el mensaje que viene desde el result
        resultContainer.textContent = result.message || "Carrera eliminada."; 
    } catch (error) {
        // Al ocurrir un error (falla en la red o error en el servidor), muestra el mensaje de error
        console.error("Error eliminando carrera:", error); 
        resultContainer.textContent = "Falló al eliminar carrera."; // Mensaje de error para el usuario
    }
}

// Función para actualizar el nombre de una carrera por su id
async function updateCareer() {
    // Obtiene el ID de la carrera desde el campo de entrada con id 'updateCareerId'
    const id = document.getElementById('updateCareerId').value.trim();
    
    // Obtiene el nuevo nombre de la carrera desde el campo de entrada con id 'updateCareerName'
    const name = document.getElementById('updateCareerName').value.trim();

    // Obtiene el contenedor donde se mostrará el resultado de la operación
    const resultContainer = document.getElementById('updateCareerResult');

    // Verifica que ambos campos (ID y nombre) no estén vacíos
    if (!id || !name) {
        alert("Ingrese ambos campos (ID y nombre).");
        return; // Detiene la ejecución si alguno de los campos está vacío
    }

    try {
        // Llama al servicio para actualizar la carrera con el ID y nombre proporcionados
        const result = await updateCareerService(id, name);

        // Si la operación es exitosa, muestra el mensaje de éxito en el contenedor
        resultContainer.textContent = result.message || "Carrera actualizada de manera exitosa.";
    } catch (error) {
        // Si ocurre un error durante la actualización (por ejemplo, error de red o servidor)
        // se captura acá
        console.error("Error actualizando carrera:", error);
        
        // Muestra un mensaje de error al usuario en el contenedor
        resultContainer.textContent = "Falló al actualizar carrera.";
    }
}


// Función asincrónica para cargar todas las carreras y mostrarlas en un select HTML
async function loadCareersToSelect() {
    // 1. Obtiene el elemento <select> con el id 'careerSelect' en el DOM
    const select = document.getElementById('careerSelect');
    
    try {
        // Llama al servicio asincrónico para obtener todas las carreras disponibles
        const careers = await getAllCareersService();
        
        // Muestra en la consola las carreras obtenidas (para depuración)
        console.log("🔍 Carreras obtenidas:", careers);

        // Limpia cualquier contenido previo en el <select> y agrega una opción por defecto
        select.innerHTML = '<option value="">Seleccione una carrera</option>';

        // Recorre el array de carreras y agrega una opción por cada carrera al <select>
        careers.forEach(career => {
            // Crea un nuevo <option> para cada carrera
            const option = document.createElement('option');
            
            // Asigna el valor de la opción al ID de la carrera
            option.value = career.name;  
            option.textContent = career.name; 

            // Añade la nueva opción al <select> en el DOM
            select.appendChild(option);
        });
    } catch (error) {
        // En caso de error durante la obtención de las carreras, se muestra en la consola
        console.error("Error al cargar las carreras:", error);
    }
}


// =======================
// Estudiantes - Servicios
// =======================

// Este valor es la URL que se utilizará para acceder al archivo index.js que funciona como API, en este caso
// para manipular las funciones relacionadas a estudiantes
const STUDENTS_API_URL = "http://localhost:5001/api/students";

// Función asincrónica que se encarga de registrar un nuevo estudiante
async function registerStudentService(name, career) {
    // Realiza una solicitud POST a la API con los datos del estudiante (nombre y carrera)
    const response = await fetch(STUDENTS_API_URL, {
        method: "POST",
        headers, 
        body: JSON.stringify({ name, career }) // Datos del estudiante a registrar
    });

    // Convierte la respuesta de la API en formato JSON y la retorna
    return response.json();
}

// Función asincrónica que obtiene un estudiante a partir de su ID
async function getStudentByIdService(id) {
    // Realiza una solicitud GET a la API utilizando la ID del estudiante
    const response = await fetch(`${STUDENTS_API_URL}/${id}`, {
        method: "GET",
        headers 
    });

    // Convierte la respuesta en formato JSON y la retorna
    return response.json();
}

// Función asincrónica que obtiene todos los estudiantes 
// que pertenecen a la carrera seleccionada
async function getStudentsByCareerService(career) {
    // Realiza una solicitud GET a la API con un parámetro de búsqueda para la carrera
    const response = await fetch(`${STUDENTS_API_URL}?carrera=${career}`, {
        method: "GET",
        headers 
    });

    // Convierte la respuesta en formato JSON y la retorna
    return response.json();
}

// Función asincrónica que elimina un estudiante mediante la ID del mismo
async function deleteStudentService(id) {
    // Realiza una solicitud DELETE a la API utilizando el ID del estudiante
    const response = await fetch(`${STUDENTS_API_URL}/${id}`, {
        method: "DELETE",
        headers 
    });

    // Convierte la respuesta en formato JSON y la retorna (por lo general confirma la eliminación)
    return response.json();
}

// Esta función actualiza el nombre de un estudiante usando su ID
async function updateStudentService(id, name, career) {
    // Realiza una solicitud PUT a la API con el ID del estudiante a actualizar
    const response = await fetch(`http://localhost:5001/api/students/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json", // Tipo de contenido: JSON
            "Authorization": `Bearer ${API_KEY}` // Autenticación con token
        },
        body: JSON.stringify({ name, career }) // Los nuevos datos del estudiante
    });

    // Si la respuesta no es exitosa, lanza un error
    if (!response.ok) {
        const errorText = await response.text(); // Obtiene el mensaje de error si lo hay
        throw new Error(errorText || "Error updating student"); // Lanza un error con el mensaje recibido
    }

    // Si la actualización fue exitosa, convierte la respuesta en formato JSON y la retorna
    return response.json();
}


// =======================
// Estudiantes - UI
// =======================

// Esta función registra una nueva carrera a través del formulario HTML ubicado
// en carreras.html 
async function registerStudent() { 
    // Obtiene los valores de los campos 'studentName' y 'careerSelect' del formulario
    // ubicado en alumnos.html que permite el ingreson del nombre de un estudiante 
    // y la elección de su carrera
    const name = document.getElementById('studentName').value.trim();
    const career = document.getElementById('careerSelect').value.trim();
    const resultContainer = document.getElementById('registerResult');  // Donde se mostrarán los resultados de la acción

    // Validación: Si no se ha completado el nombre o la carrera, se muestra una alerta
    if (!name || !career) {
        alert("Por favor complete tanto el nombre como la carrera.");
        return;  // Salir de la función si faltan datos
    }

    try {
        // Llamada a un servicio asincrónico para registrar al estudiante, pasando 'name' y 'career'
        const result = await registerStudentService(name, career);

        // Si el registro fue exitoso, se muestra el mensaje y los datos del estudiante registrado
        resultContainer.innerHTML = `
            <strong>Registro exitoso!</strong><br><br>
            <strong>ID:</strong> ${result.student.id}<br>
            <strong>Nombre:</strong> ${result.student.name}<br>
            <strong>Carrera:</strong> ${result.student.career}
        `;

        // Limpia los campos del formulario después de un registro exitoso
        document.getElementById('studentName').value = '';
        document.getElementById('careerSelect').value = '';
        
    } catch (error) {
        // Si ocurre un error en la solicitud, muestra el mensaje de error
        console.error("Error registrando estudiante:", error);
        resultContainer.textContent = "Error al registrar estudiante.";
    }
}

// Función que obtiene los estudiantes ingresados por medio de su ID
async function getStudentById() {
    // Obtiene el valor del campo de texto 'studentId'
    const idInput = document.getElementById('studentId').value.trim();
    // Obtiene el contenedor donde se mostrarán los resultados de la búsqueda
    const resultContainer = document.getElementById('getResult');

    // Si el campo está vacío o el valor ingresado no es un número, muestra mensaje de error
    if (!idInput || isNaN(idInput)) {
        resultContainer.textContent = "Por favor, ingrese un ID válido.";
        return; // No ejecuta la función si la validación falla
    }

    // Convierte el valor de la entrada a número entero
    const id = parseInt(idInput);

    try {
        // Realiza una solicitud GET para obtener la información del estudiante desde la API
        const response = await fetch(`${STUDENTS_API_URL}/${id}`, {
            method: "GET", // Definir el método de la solicitud como GET
            headers // Enviar los encabezados definidos previamente (si los hay)
        });

        // Si la respuesta no es exitosa, se muestra el código y texto del error
        if (!response.ok) {
            resultContainer.textContent = `Error: ${response.status} - ${response.statusText}`;
            return; // Detiene la ejecución si hubo error en la respuesta
        }

        // Devuelve los datos del estudiante en formato JSON
        const result = await response.json();

        // Verifica si la respuesta contiene el ID del estudiante, si no, mostrar mensaje de no encontrado
        if (!result || !result.id) {
            resultContainer.textContent = "Estudiante no encontrado.";
            return; // Salir si no se encontró el estudiante
        }

        // Se muestran los datos del estudiante (ID, nombre y carrera) en el contenedor
        resultContainer.innerHTML = `
            <strong>ID:</strong> ${result.id}<br>
            <strong>Nombre:</strong> ${result.name}<br>
            <strong>Carrera:</strong> ${result.career}
        `;

    } catch (error) {
        // Maneja cualquier error que ocurra durante la solicitud o el procesamiento de la respuesta
        // y se lo comunica al usuario
        console.error("Error fetching student:", error);
        resultContainer.textContent = "Error al obtener el estudiante.";
    }
}

// Esta función obtiene y muestra los estudiantes de una carrera específica
async function getStudentsByCareer() { 
    // Obtiene el valor de la carrera desde un campo de entrada en la página
    const career = document.getElementById('careerFilter').value.trim();

    // Verifica si el campo de carrera está vacío. Si es así, muestra una alerta y termina la función
    if (!career) {
        alert("Por favor ingrese una carrera.");
        return;
    }

    try {
        // Llama al servicio para obtener los estudiantes que pertenecen a la carrera ingresada
        const students = await getStudentsByCareerService(career);
        const resultContainer = document.getElementById('careerResult');

        // Si no se encuentran estudiantes para esa carrera, muestra un mensaje indicando que no se encontraron resultados
        if (students.length === 0) {
            resultContainer.textContent = "No hay estudiantes encontrados para esa carrera.";
            return;
        }
        
        // Si se encuentran estudiantes, limpia el contenedor de resultados y muestra los estudiantes
        resultContainer.innerHTML = '';
        students.forEach(student => {
            // Crea un nuevo div para cada estudiante con la información correspondiente
            const studentDiv = document.createElement('div');
            studentDiv.classList.add('student-card');
            studentDiv.innerHTML = `
                <strong>ID:</strong> ${student.id}<br>
                <strong>Nombre:</strong> ${student.name}<br>
                <strong>Carrera:</strong> ${student.career}
            `;
            // Agrega el div del estudiante al contenedor de resultados
            resultContainer.appendChild(studentDiv);
            // Agrega una línea horizontal para separar los resultados de cada estudiante
            resultContainer.appendChild(document.createElement('hr'));
        });

    } catch (error) {
        // Si ocurre un error al obtener los estudiantes, muestra un mensaje de error en la interfaz
        console.error("Error obteniendo estudiantes:", error);
        document.getElementById('careerResult').textContent = "Fallo al obtener estudiantes.";
    }
}


async function deleteStudent() { 
    // Obtiene el ID del estudiante a eliminar desde el campo de entrada ubicado en alumnos.html
    const id = document.getElementById('deleteId').value.trim(); 

    // Obtiene el contenedor donde se mostrará el resultado de la operación
    const resultContainer = document.getElementById('deleteResult'); 

    // Validación de entrada: si el ID está vacío, muestra una alerta y detiene la ejecución
    if (!id) {
        alert("Ingrese la ID de un estudiante para borrar.");
        return; // Detiene la función si no hay ID
    }

    try {
        // Llama al servicio asincrónico para eliminar el estudiante con el ID proporcionado
        const result = await deleteStudentService(id);

        // Si la operación es exitosa, muestra el mensaje que viene desde el result
        resultContainer.textContent = result.message || "Carrera eliminada."; 
    } catch (error) {
        // Al ocurrir un error (falla en la red o error en el servidor), muestra el mensaje de error
        console.error("Error al borrar carrera:", error); 
        resultContainer.textContent = "Falló al borrar carrera."; // Mensaje de error para el usuario
    }
}

// Esta función permite actualizar la información de un estudiante utilizando su ID
async function updateStudent() {
    // Obtiene el valor del ID, nombre y carrera del estudiante desde los campos de entrada
    const id = document.getElementById('updateStudentId').value.trim();
    const name = document.getElementById('updateStudentName').value.trim();
    const career = document.getElementById('updateStudentCareer').value.trim();
    const resultContainer = document.getElementById('updateStudentResult');

    // Verifica si alguno de los campos (ID, nombre o carrera) está vacío. Si es así, muestra una alerta
    if (!id || !name || !career) {
        alert("Ingrese ID, nombre y carrera del estudiante.");
        return;
    }

    try {
        // Llama al servicio para actualizar la información del estudiante con los datos proporcionados
        const result = await updateStudentService(id, name, career);
        // Muestra el mensaje de éxito de la respuesta en el contenedor de resultados
        resultContainer.textContent = result.message || "Estudiante actualizado de manera exitosa.";
    } catch (error) {
        // En caso de error al actualizar el estudiante, muestra un mensaje de error en la interfaz
        console.error("Error al actualizar estudiante:", error);
        resultContainer.textContent = "Falló al actualizar estudiante.";
    }
}


// =======================
// Categorías - Servicios
// =======================

// Este valor es la URL que se utilizará para acceder al archivo index.js que funciona como API, en este caso
// para manipular las funciones relacionadas a estudiantes
const CATEGORIES_API_URL = "http://localhost:5001/api/categories";

// Función asincrónica que permite registrar una nueva categoría
async function registerCategoryService(name) { 
    // Realiza una solicitud POST a la API para crear una nueva categoría.
    const response = await fetch(CATEGORIES_API_URL, {
        method: "POST",  // Método HTTP: POST
        headers,         // Encabezados necesarios para la solicitud (por ejemplo, Content-Type)
        body: JSON.stringify({ name })  // Envia los datos de la categoría en formato JSON
    });

    // Convierte la respuesta de la API a formato JSON y la retorna.
    return response.json();
}

// Función asincrónica que obtiene los detalles de una categoría específica usando su ID
async function getCategoryByIdService(id) {
    // Realiza una solicitud GET a la API usando el ID de la categoría.
    const response = await fetch(`${CATEGORIES_API_URL}/${id}`, {
        method: "GET",  // Método HTTP: GET
        headers,         // Encabezados necesarios para la solicitud
    });

    // Convierte la respuesta de la API en formato JSON y la retorna.
    return response.json();
}

// Función asincrónica que obtiene todas las categorías disponibles
async function getAllCategoriesService() {
    // Realiza una solicitud GET a la API para obtener todas las categorías.
    const response = await fetch(`${CATEGORIES_API_URL}`, {
        method: "GET",  // Método HTTP: GET
        headers,         // Encabezados necesarios para la solicitud
    });

    // Convierte la respuesta de la API en formato JSON y la retorna.
    return response.json();
}

// Función asincrónica que elimina una categoría específica usando su ID
async function deleteCategoryService(id) {
    // Realiza una solicitud DELETE a la API para eliminar la categoría con el ID proporcionado.
    const response = await fetch(`${CATEGORIES_API_URL}/${id}`, {
        method: "DELETE",  // Método HTTP: DELETE
        headers,           // Encabezados necesarios para la solicitud
    });

    // Convierte la respuesta de la API en formato JSON y la retorna.
    return response.json();
}

// Función asincrónica que actualiza el nombre de una categoría usando su ID.
async function updateCategoryService(id, name) {
    // Realiza una solicitud PUT a la API para actualizar el nombre de la categoría con el ID proporcionado.
    const response = await fetch(`${CATEGORIES_API_URL}/${id}`, {
        method: "PUT",  // Método HTTP: PUT
        headers,        // Encabezados necesarios para la solicitud
        body: JSON.stringify({ name })  // Envia el nuevo nombre de la categoría en formato JSON
    });

    // Si la respuesta de la API no es exitosa (código no 2xx), lanza un error.
    if (!response.ok) {
        const errorText = await response.text();  // Obtiene el mensaje de error de la respuesta.
        throw new Error(errorText || "Error al actualizar la categoría");  // Lanza el error.
    }

    // Si la actualización es exitosa, convierte la respuesta en formato JSON y la retorna.
    return response.json();
}


// =======================
// Categorías - UI
// =======================
// Esta función permite registrar una nueva categoría a través del formulario ubicado
// en alumnos.html
async function registerCategory() { 
    // Obtiene el nombre de la categoría desde el campo de entrada en el formulario
    const name = document.getElementById('registerCategoryInput').value.trim();
    const resultContainer = document.getElementById('registerCategoryButton');

    // Valida que el campo de nombre no esté vacío, si está vacío muestra una alerta y termina la función.
    if (!name) {
        alert("Entre el nombre de una categoría.");
        return;
    }

    try {
        // Llama al servicio para registrar la categoría con el nombre proporcionado.
        const result = await registerCategoryService(name);
        
        // Muestra el mensaje de éxito y los detalles de la categoría registrada.
        resultContainer.innerHTML = `
            <strong>Categoría registrada exitosamente!</strong><br><br>
            <strong>ID:</strong> ${result.category.id}<br>
            <strong>Name:</strong> ${result.category.name}
        `;

        // Limpia el campo de entrada después de registrar la categoría.
        document.getElementById('registerCategoryInput').value = '';
    } catch (error) {
        // Si ocurre un error al registrar la categoría, muestra un mensaje de error.
        console.error("Error registrando categoría:", error);
        resultContainer.textContent = "Falló al registrar categoría.";
    }
}

// Función que obtiene una categoría específica utilizando su ID
async function getCategoryById() {
    // Obtiene el ID de la categoría desde el campo de entrada
    const id = document.getElementById('categoryId').value.trim();
    const resultContainer = document.getElementById('categoryGetResult');

    // Verifica que el ID no esté vacío. Si lo está, muestra una alerta y termina la función
    if (!id) {
        alert("Por favor ingrese la ID de la categoría.");
        return;
    }

    try {
        // Llama al servicio para obtener la categoría con el ID proporcionado
        const category = await getCategoryByIdService(id);

        // Si la categoría tiene un error (por ejemplo, no existe), muestra el mensaje de error
        resultContainer.innerHTML = category.error ? category.error : `
            <strong>ID:</strong> ${category.id}<br>
            <strong>Nombre:</strong> ${category.name}
        `;
    } catch (error) {
        // Si hay un error al obtener la categoría, muestra un mensaje de error
        console.error("Error obteniendo categoría:", error);
        resultContainer.textContent = "Falló al obtener categoría.";
    }
}

// Esta función obtiene todas las categorías disponibles y las muestra en la interfaz.
// En este caso se emplea en el carreras.html para poder seleccionar la categoría a la
// que pertenece cada carrera
async function getAllCategories() {
    const resultContainer = document.getElementById('categoryListResult');

    try {
        // Llama al servicio para obtener todas las categorías
        const categories = await getAllCategoriesService();
        
        // Si no hay categorías, muestra un mensaje indicando que no se encontraron
        if (categories.length === 0) {
            resultContainer.textContent = "Sin categorías encontradas.";
            return;
        }

        // Si se encuentran categorías, las muestra en la interfaz
        resultContainer.innerHTML = '';
        categories.forEach(category => {
            const div = document.createElement('div');
            div.classList.add('category-card');
            div.innerHTML = `
                <strong>ID:</strong> ${category.id}<br>
                <strong>Name:</strong> ${category.name}
            `;
            resultContainer.appendChild(div);
            resultContainer.appendChild(document.createElement('hr'));
        });
    } catch (error) {
        // Si ocurre un error al obtener las categorías, muestra un mensaje de error
        console.error("Error obteniendo categories:", error);
        resultContainer.textContent = "Falló al obtener categorías.";
    }
}

// Su utilidad es poder borrar una categoría introducida seleccionando
// las mismas mediante su id
async function deleteCategory() {
    // Obtiene el ID de la categoría a eliminar desde el campo de entrada.
    const id = document.getElementById('deleteCategoryId').value.trim();
    const resultContainer = document.getElementById('categoryDeleteResult');

    // Verifica que el ID no esté vacío. Si lo está, muestra una alerta y termina la función.
    if (!id) {
        alert("Ingrese la ID de una categoría a eliminar.");
        return;
    }

    try {
        // Llama al servicio para eliminar la categoría con el ID proporcionado.
        const result = await deleteCategoryService(id);
        
        // Muestra el mensaje de confirmación de eliminación.
        resultContainer.textContent = result.message || "Categoría eliminada.";
    } catch (error) {
        // Si ocurre un error al eliminar la categoría, muestra un mensaje de error.
        console.error("Error eliminando category:", error);
        resultContainer.textContent = "Falló al eliminar categoría.";
    }
}

// Función que permite actualizar el nombre una categoría 
// seleccionando la misma mediante su id
async function updateCategory() {
    // Obtiene el ID y el nuevo nombre de la categoría desde los campos de entrada
    const id = document.getElementById('updateCategoryId').value.trim();
    const name = document.getElementById('updateCategoryName').value.trim();
    const resultContainer = document.getElementById('updateCategoryResult');

    // Verifica que el ID y el nuevo nombre no estén vacíos, y si lo están, muestra una alerta
    if (!id || !name) {
        alert("Por favor, ingresá el ID y el nuevo nombre de la categoría.");
        return;
    }

    try {
        // Llama al servicio para actualizar la categoría con el ID y el nuevo nombre
        const result = await updateCategoryService(id, name);
        
        // Muestra el mensaje de éxito o el mensaje de la respuesta de la API
        resultContainer.textContent = result.message;
    } catch (error) {
        // Si ocurre un error al actualizar la categoría, muestra un mensaje de error
        console.error("❌ Error actualizando categoría:", error);
        resultContainer.textContent = `❌ ${error.message}`;
    }
}

// Función asíncrona que llena un elemento <select> en el alumnos.html 
// con las categorías disponibles desde el backend 
// las cuales fueron guardadas en categorias.html
async function populateCategorySelect() {
  try {
    // Llama al servicio que obtiene todas las categorías (petición al backend)
    const categories = await getAllCategoriesService(); // reutiliza el mismo service
    
    // Obtiene la referencia al elemento <select> por su ID
    const select = document.getElementById('registerCategorySelect');

    // Inicializa el <select> con una opción por defecto oculta
    select.innerHTML = '<option hidden>Seleccione una categoría</option>';

    // Recorre el array de categorías y crea una opción por cada una
    categories.forEach(category => {
      const option = document.createElement('option'); // crea un nuevo elemento <option>
      option.value = category.id;                      // asigna el ID de la categoría como valor
      option.textContent = category.name;              // muestra el nombre de la categoría en el texto visible
      select.appendChild(option);                      // agrega la opción al <select>
    });
  } catch (error) {
    // Si ocurre un error durante el proceso, lo muestra en consola
    console.error("❌ Error cargando categorías en el select:", error);
  }
}


// Esta función se ejecuta cuando toda la página web ha sido completamente cargada
window.onload = () => { 
    // Llama a la función para poblar el selector de categorías.
    populateCategorySelect();

    // Llama a la función para cargar las opciones de carreras en el selector de carreras
    loadCareersToSelect();
};


// ======================= 
// Escuchadores de eventos para cargar categorías en el desplegable de selección
// =======================
document.addEventListener('DOMContentLoaded', async () => {
  // Asigna botón de registro de categoría
  // Se obtiene el botón de registro de categoría mediante su ID.
  const registerButton = document.getElementById('registerCategoryButton');
  if (registerButton) {
    // Si el botón existe, se asigna un listener para manejar el evento de clic
    registerButton.addEventListener('click', registerCategory);
  }

  // Se cargan las categorías en el select si existe
  // Se obtiene el select donde se mostrarán las categorías usando su ID.
  const categorySelect = document.getElementById('registerCategoryInput');
  if (categorySelect) {
    try {
      // Se obtienen las categorías desde el servicio
      // Se hace una llamada asíncrona al servicio que obtiene todas las categorías.
      const categories = await getAllCategoriesService(); 

      // Crear y agregar las opciones en el select
      // Si la llamada a getAllCategoriesService es exitosa, se recorren las categorías y se agregan al select.
      categories.forEach(cat => {
        const option = document.createElement('option'); // Se crea un nuevo elemento <option>
        option.value = cat.id;                          // Se asigna el valor del id de la categoría
        option.textContent = cat.name;                  // Se asigna el nombre de la categoría como texto visible
        categorySelect.appendChild(option);             // Se agrega la opción al select
      });
    } catch (error) {
      // Manejo de errores en caso de que la carga de categorías falle
      console.error("Error cargando categories:", error);
    }
  } else {
    // Advertencia si el select no está presente en el DOM
    console.warn("Categoría elegida no encontrada en el DOM.");
  }
});
    

