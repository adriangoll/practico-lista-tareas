const tareas = JSON.parse(localStorage.getItem("tareas")) || [];

const actualizarTareas = (tareas) => {
    const tareasStorage = JSON.stringify(tareas);
    localStorage.setItem("tareas", tareasStorage);
}

const render = () => {
    mostrarLista = document.getElementById("mostrarLista");
    listaTerminada = tareas.map((t, index) => `
        <li>
            ${t} 
            <input type="checkbox" class="hecho" id="checkbox-${index}">
            <span id="realizado-${index}"></span>
            <button class="eliminar" data-index="${index}">Eliminar</button>
        </li>
    `);
    mostrarLista.innerHTML = listaTerminada.join("");

    // listeners para los checkbox
    const checkboxes = document.querySelectorAll(".hecho");
    checkboxes.forEach((checkbox, index) => {
        checkbox.addEventListener("change", () => {
            const realizadoSpan = document.getElementById(`realizado-${index}`);
            if (checkbox.checked) {
                realizadoSpan.textContent = ' Realizado';
            } else {
                realizadoSpan.textContent = '';
            }
        });
    });

    // listeners para eliminar tareas
    const botonesEliminar = document.querySelectorAll(".eliminar");
    botonesEliminar.forEach((boton) => {
        boton.addEventListener("click", (e) => {
            const index = e.target.dataset.index;
            tareas.splice(index, 1); 
            actualizarTareas(tareas);
            render();
        });
    });
}

window.onload = () => {
    render();
    const listaTareas = document.getElementById("listaTareas");
    listaTareas.onsubmit = (e) => {
        e.preventDefault();
        const item = document.getElementById("item");
        const valorItem = item.value;
        item.value = "";
        tareas.push(valorItem);
        actualizarTareas(tareas);
        render();
    }
}
