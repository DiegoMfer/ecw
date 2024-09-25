// Variables globales
let nodes = [];
let fieldCount = 0;  // Contador para campos dinámicos
let propertyCount = 0; // Contador para propiedades dinámicas

const form = document.getElementById('infoForm');
const dynamicFieldsContainer = document.getElementById('dynamic-fields');
const dynamicPropertiesContainer = document.getElementById('dynamic-properties');
const addFieldButton = document.getElementById('addFieldButton');
const addNodeButton = document.getElementById('addNodeButton');
const addPropertyButton = document.getElementById('addPropertyButton');


// Función para agregar un nuevo campo dinámico
addFieldButton.addEventListener('click', function() {
    fieldCount++; // Incrementar el contador de campos dinámicos

    const newFieldItem = document.createElement('li');
    newFieldItem.innerHTML = `
    <span class="field-name">
        <input type="text" id="dynamicFieldName${fieldCount}" placeholder="Field name" class="input-field-name">
    </span>
    <span class="field-value">
        <input type="text" id="dynamicField${fieldCount}" placeholder="Value" class="input-field-value">
    </span>
    <span class="field-action">
        <button type="button" class="removeFieldButton" data-field-id="${fieldCount}">✖</button>
    </span>
`;

    dynamicFieldsContainer.appendChild(newFieldItem);

    // Evento para eliminar el campo
    newFieldItem.querySelector(`button[data-field-id="${fieldCount}"]`).addEventListener('click', function() {
        newFieldItem.remove();
    });
});

// Función para agregar una nueva propiedad dinámica
addPropertyButton.addEventListener('click', function() {
    propertyCount++; // Incrementar el contador de propiedades dinámicas

    const newPropertyItem = document.createElement('li');
    newPropertyItem.innerHTML = `
    <span class="property-name">
        <input type="text" id="dynamicPropertyName${propertyCount}" placeholder="Property name" class="input-property-name">
    </span>
    <span class="property-value">
        <input type="text" id="dynamicProperty${propertyCount}" placeholder="Value" class="input-property-value">
    </span>
    <span class="property-action">
        <button type="button" class="removePropertyButton" data-property-id="${propertyCount}">✖</button>
    </span>
`;

    dynamicPropertiesContainer.appendChild(newPropertyItem);

    // Evento para eliminar la propiedad
    newPropertyItem.querySelector(`button[data-property-id="${propertyCount}"]`).addEventListener('click', function() {
        newPropertyItem.remove();
    });
});

// Función para recopilar los datos del formulario
function collectFormData() {
    const nodeName = document.getElementById('node-name').value;
    const description = document.getElementById('description').value;

    // Recoger los campos dinámicos
    const dynamicFields = {};
    for (let i = 1; i <= fieldCount; i++) {
        const fieldName = document.getElementById(`dynamicFieldName${i}`);
        const fieldValue = document.getElementById(`dynamicField${i}`);
        if (fieldName && fieldValue) {
            dynamicFields[fieldName.value] = fieldValue.value;
        }
    }

    // Recoger las propiedades dinámicas (Similar lógica si agregas propiedades)
    const dynamicProperties = {};
    for (let i = 1; i <= propertyCount; i++) {
        const propertyName = document.getElementById(`dynamicPropertyName${i}`);
        const propertyValue = document.getElementById(`dynamicProperty${i}`);
        if (propertyName && propertyValue) {
            dynamicProperties[propertyName.value] = propertyValue.value;
        }
    }

    return {
        nodeName,
        description,
        dynamicFields,
        dynamicProperties
    };
}

// Evento para agregar un nuevo nodo
addNodeButton.addEventListener('click', function() {
    const nodeData = collectFormData();

    // Añadir el nodo al array de nodos
    nodes.push(nodeData);

    // Limpiar el formulario para agregar otro nodo
    form.reset();
    dynamicFieldsContainer.innerHTML = ''; // Limpiar los campos dinámicos
    dynamicPropertiesContainer.innerHTML = ''; // Limpiar las propiedades dinámicas
    fieldCount = 0;
    propertyCount = 0;

    alert('Node added successfully! You can add another node.');
});

// Evento para generar el archivo JSON
form.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevenir el comportamiento por defecto

    // Añadir el nodo actual si hay uno sin guardar
    const nodeData = collectFormData();
    if (nodeData.nodeName && nodeData.description) {
        nodes.push(nodeData);
    }

    // Descargar el archivo JSON
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(nodes, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "settings.json");
    document.body.appendChild(downloadAnchorNode); // Requerido para Firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();

    // Resetear todo después de descargar
    nodes = [];
    form.reset();
    dynamicFieldsContainer.innerHTML = '';
    dynamicPropertiesContainer.innerHTML = '';
    fieldCount = 0;
    propertyCount = 0;
});
