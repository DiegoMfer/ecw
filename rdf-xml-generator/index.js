import init, { generar_rdf, obtener_mensaje } from './generador_rdf/pkg/rdf_generator.js';
import { validateGraph } from './ts/dist/validator.js';

let wasmInitialized = false;
let config = null;
let validated = false;

// Initialize WebAssembly
async function initializeWasm() {
    try {
        const wasmUrl = './generador_rdf/pkg/rdf_generator_bg.wasm?cache_bust=' + Date.now();
        await init({ url: wasmUrl });
        wasmInitialized = true;
    } catch (error) {
        console.error('Failed to initialize WebAssembly:', error);
        document.getElementById('output').textContent =
            'Error loading WebAssembly. Check the console for details.';
    }
}

// Load the JSON file
function loadFile() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];

    if (!file) {
        alert('Please select a JSON file.');
        return;
    }

    const reader = new FileReader();
    reader.onload = function (event) {
        try {
            config = JSON.parse(event.target.result);
            alert('File loaded successfully.');
        } catch (error) {
            console.error('Error reading JSON file:', error);
            alert('The file does not contain valid JSON.');
        }
    };
    reader.onerror = function () {
        console.error('Error reading file.');
        alert('An error occurred while reading the file.');
    };
    reader.readAsText(file);
}

// Generate RDF/XML
async function generateRDF() {
    try {
        if (!config) {
            alert('First load a JSON file with the RDF.');
            return;
        }

        if (!validated) {
            alert('First validate the JSON graph.');
            return;
        }

        await initializeWasm();

        const rdfXml = generar_rdf(JSON.stringify(config));
        console.log(obtener_mensaje());
        document.getElementById('output').textContent = rdfXml;
    } catch (error) {
        console.error('Error generating RDF/XML:', error);
        document.getElementById('output').textContent =
            'An error occurred generating RDF/XML. Check the console for details.';
    }
}

function validateGraphJson() {
    if (!config) {
        alert('First load a JSON file with the RDF.');
        return;
    }
    
    validated = true;
    
    // Run the validation
    const validationErrors = validateGraph(config);
    
    // Get the 'errors' element and update it
    const errorsElement = document.getElementById('errors');
    
    if (validationErrors.length > 0) {
        // If there are errors, display them
        errorsElement.textContent = 'Validation failed with the following errors:\n' + validationErrors.join('\n');
    } else {
        // If no errors, display success message
        errorsElement.textContent = 'Validation successful!';
    }
}

document.getElementById('loadFileButton').addEventListener('click', loadFile);
document.getElementById('validateGraphJsonButton').addEventListener('click', validateGraphJson);
document.getElementById('generateRDFButton').addEventListener('click', generateRDF);
