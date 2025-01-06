import init, { generar_rdf, obtener_mensaje } from './generador_rdf/pkg/rdf_generator.js';

let wasmInitialized = false;
let config = null;

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
            alert('First load a JSON file with the RDF configuration.');
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

document.getElementById('loadFileButton').addEventListener('click', loadFile);
document.getElementById('generateRDFButton').addEventListener('click', generateRDF);

