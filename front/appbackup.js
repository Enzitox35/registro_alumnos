const API_KEY = "12345ABCDEF";
const headers = {
  "Content-Type": "application/json",
  "Authorization": `Bearer ${API_KEY}`
};

//Funciones de alumnos
const STUDENT_URL = "http://localhost:5001/api/students";

async function registerStudent() {
  const name = document.getElementById('studentName')?.value.trim();
  const career = document.getElementById('studentCareer')?.value.trim();
  const resultContainer = document.getElementById('registerResult');

  if (!name || !career) {
    alert("Complete nombre y carrera.");
    return;
  }

  try {
    const response = await fetch(STUDENT_URL, {
      method: "POST",
      headers,
      body: JSON.stringify({ name, career })
    });
    const data = await response.json();
    resultContainer.textContent = JSON.stringify(data, null, 2);
    alert("Estudiante registrado.");
  } catch (error) {
    console.error("Error al registrar estudiante:", error);
    resultContainer.textContent = "Error.";
  }
}

async function getStudentById() {
  const id = document.getElementById('studentId')?.value.trim();
  const result = document.getElementById('getResult');
  if (!id) return alert("Ingrese ID.");
  try {
    const response = await fetch(`${STUDENT_URL}/${id}`, {
      method: "GET",
      headers
    });
    const data = await response.json();
    result.innerHTML = `
      <strong>ID:</strong> ${data.id}<br>
      <strong>Nombre:</strong> ${data.name}<br>
      <strong>Carrera:</strong> ${data.career}
    `;
  } catch (err) {
    result.textContent = "Error.";
  }
}

async function getStudentsByCareer() {
  const career = document.getElementById('careerFilter')?.value.trim();
  const result = document.getElementById('careerResult');
  if (!career) return alert("Ingrese carrera.");
  try {
    const response = await fetch(`${STUDENT_URL}?career=${career}`, {
      method: "GET",
      headers
    });
    const data = await response.json();
    if (data.length === 0) {
      result.textContent = "No se encontraron estudiantes.";
      return;
    }
    result.innerHTML = data.map(s => `
      <div>
        <strong>ID:</strong> ${s.id}<br>
        <strong>Nombre:</strong> ${s.name}<br>
        <strong>Carrera:</strong> ${s.career}
      </div><hr>
    `).join("");
  } catch (err) {
    result.textContent = "Error.";
  }
}

async function deleteStudent() {
  const id = document.getElementById('deleteId')?.value.trim();
  const result = document.getElementById('deleteResult');
  if (!id) return alert("Ingrese ID.");
  try {
    const response = await fetch(`${STUDENT_URL}/${id}`, {
      method: "DELETE",
      headers
    });
    const data = await response.json();
    result.textContent = JSON.stringify(data, null, 2);
  } catch (err) {
    result.textContent = "Error.";
  }
}

//Funciones de carreras
const CAREER_URL = "http://localhost:5001/api/careers";

async function registerCareer() {
  const name = document.getElementById('careerName')?.value.trim(); 
  const duracion = document.getElementById('careerDuration')?.value.trim();
  const tipo = document.getElementById('careerType')?.value.trim();
  const result = document.getElementById('registerResult');

  if (!name || !duracion || !tipo) {
    alert("Complete todos los campos.");
    return;
  }

  try {
    const response = await fetch(CAREER_URL, {
      method: "POST",
      headers,
      body: JSON.stringify({ name, duracion: Number(duracion), tipo })
    });
    const data = await response.json();
    result.textContent = JSON.stringify(data, null, 2);
    alert("Carrera registrada.");
  } catch (err) {
    console.error("Error al registrar carrera:", err);
    result.textContent = "Error.";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM cargado correctamente");
  if (document.getElementById("studentCareer")) {
    console.log("Cargando carreras para studentCareer");
    loadCareersDropdown();
  }
});

function loadCareersDropdown() {
  console.log("Ejecutando loadCategoriesDropdown...");
  const select = document.getElementById('studentCareer');
  if (!select) {
    console.warn('No existe el select #studentCareer en esta página.');
    return; // salir si no está
  }
  fetch('http://localhost:5001/api/careers', {
    headers: {
      'Authorization': 'Bearer 12345ABCDEF'
    }
  })
    .then(response => {
      if (!response.ok) throw new Error("Error al obtener carreras");
      return response.json();
    })
    .then(data => {
      select.innerHTML = '<option value="">Selecciona una carrera</option>';
      data.forEach(career => {
        const option = document.createElement('option');
        option.value = career.name;
        option.textContent = career.name;
        select.appendChild(option);
      });
    })
    .catch(error => {
      console.error("No se pudieron cargar las carreras:", error);
      select.innerHTML = '<option value="">Error cargando carreras</option>';
    });
}

async function getCareerById() {
  const id = document.getElementById('careerId')?.value.trim();
  const result = document.getElementById('getResult');
  if (!id) return alert("Ingrese ID.");
  try {
    const response = await fetch(`${CAREER_URL}/${id}`, {
      method: "GET",
      headers
    });
    const data = await response.json();
    result.textContent = JSON.stringify(data, null, 2);
  } catch (err) {
    result.textContent = "Error.";
  }
}

async function getCareerByCategory() {
  const categoria = document.getElementById('careerFilter')?.value.trim();
  const result = document.getElementById('careerResult');
  if (!categoria) return alert("Ingrese categoría.");
  try {
    const response = await fetch(`${CAREER_URL}?categoria=${categoria}`, {
      method: "GET",
      headers
    });
    const data = await response.json();
    if (data.length === 0) {
      result.textContent = "No se encontraron carreras.";
      return;
    }
    result.innerHTML = data.map(c => `
      <div>
        <strong>ID:</strong> ${c.id}<br>
        <strong>Nombre:</strong> ${c.name}<br>
        <strong>Categoría:</strong> ${c.categoria || 'N/A'}
      </div><hr>
    `).join("");
  } catch (err) {
    result.textContent = "Error.";
  }
}

async function deleteCareer() {
  const id = document.getElementById('deleteCareer')?.value.trim();
  const result = document.getElementById('deleteCareerResult');
  if (!id) return alert("Ingrese carrera.");
  try {
    const response = await fetch(`${CAREER_URL}/${id}`, {
      method: "DELETE",
      headers
    });
    const data = await response.json();
    result.textContent = JSON.stringify(data, null, 2);
  } catch (err) {
    result.textContent = "Error.";
  }
}

//Funciones de categorías
const CATEGORIES_URL = "http://localhost:5001/api/categories";

async function registerCategory() {
  const name = document.getElementById('categoryName')?.value.trim();
  const result = document.getElementById('categoryResult');

  if (!name) {
    alert("Ingrese nombre de la categoría.");
    return;
  }

  try {
    const response = await fetch(CATEGORIES_URL, {
      method: "POST",
      headers,
      body: JSON.stringify({ name })
    });
    const data = await response.json();
    result.textContent = JSON.stringify(data, null, 2);
    alert("Categoría registrada con éxito.");
  } catch (err) {
    console.error("Error al registrar categoría:", err);
    result.textContent = "Error al registrar categoría.";
  }
}

document.addEventListener('DOMContentLoaded', () => {
  loadCategoriesDropdown();
});

function loadCategoriesDropdown() {
  const select = document.getElementById('careerType');
  if (!select) {
    console.warn('No existe el select #careerType en esta página.');
    return; // salir si no está
  }
  fetch('http://localhost:5001/api/categories', {
    headers: {
      'Authorization': 'Bearer 12345ABCDEF'
    }
  })
    .then(response => {
      if (!response.ok) throw new Error("Error al obtener categorías");
      return response.json();
    })
    .then(categories => {
      select.innerHTML = '<option hidden>Seleccione una categoría</option>';
      categories.forEach(cat => {
        const option = document.createElement('option');
        option.value = cat.name;
        option.textContent = cat.name;
        select.appendChild(option);
      });
    })
    .catch(error => {
      console.error("Error cargando categorías:", error);
      select.innerHTML = '<option value="">Error al cargar categorías</option>';
    });
}

async function getCategoryById() {
  const id = document.getElementById('categoryId')?.value.trim();
  const result = document.getElementById('getCategory');
  if (!id) return alert("Ingrese Categoría.");
  try {
    const response = await fetch(`${CATEGORIES_URL}/${id}`, {
      method: "GET",
      headers
    });
    const data = await response.json();
    result.textContent = JSON.stringify(data, null, 2);
  } catch (err) {
    result.textContent = "Error.";
  }
}

async function deleteCategory() {
  const id = document.getElementById('deleteCategory')?.value.trim();
  const result = document.getElementById('deleteCategoryResult');
  if (!id) return alert("Ingrese categoría.");
  try {
    const response = await fetch(`${CATEGORIES_URL}/${id}`, {
      method: "DELETE",
      headers
    });
    const data = await response.json();
    result.textContent = JSON.stringify(data, null, 2);
  } catch (err) {
    result.textContent = "Error.";
  }
}

function updateStudent() {
  const id = document.getElementById("updateId").value;
  const name = document.getElementById("updateName").value;
  const career = document.getElementById("updateCareer").value;

  fetch(`http://localhost:5001/api/students/${id}`, {
    method: 'PUT',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${API_KEY}`
    },
    body: JSON.stringify({ name, career })
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      document.getElementById("updateResult").innerHTML = JSON.stringify(data, null, 2);
    })
    .catch(error => {
      document.getElementById("updateResult").innerHTML = "Error: " + error.message;
    });
}

function updateCareer() {
  const id = document.getElementById("updateCareerId").value;
  const name = document.getElementById("updateCareerName").value;

  fetch(`http://localhost:5001/api/careers/${id}`, {
    method: 'PUT',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${API_KEY}`
    },
    body: JSON.stringify({ name })
  })
  .then(response => {
    if (!response.ok) throw new Error(`HTTP error ${response.status}`);
    return response.json();
  })
  .then(data => {
    document.getElementById("updateCareerResult").innerText = JSON.stringify(data, null, 2);
  })
  .catch(error => {
    document.getElementById("updateCareerResult").innerText = "Error: " + error.message;
  });
}



