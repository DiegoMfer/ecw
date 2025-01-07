# RDF-XML Generator

Este proyecto contiene dos scripts principales para la gestión y despliegue del entorno:

1. **only_deploy.sh**: Este script ejecuta el comando `docker compose up` para levantar los servicios definidos en el archivo `docker-compose.yml`. Utiliza las imágenes y configuraciones ya procesadas previamente.

2. **compile_and_deploy.sh**: Este script realiza varias tareas antes de desplegar los servicios:
    - Transpila el código TypeScript a JavaScript.
    - Compila el código Rust.
    - Genera el WebAssembly (WASM).

Sin embargo, dado que todo el procesamiento necesario ya se ha realizado, el script `only_deploy.sh` es suficiente para desplegar el entorno.

## Uso

Para desplegar el entorno, simplemente ejecuta:

```sh
./only_deploy.sh
```

Si necesitas realizar una compilación completa antes del despliegue, utiliza:

```sh
./compile_and_deploy.sh
```

## Requisitos
Si quieres probar la aplicación con Docker ejecuta `./only_deploy.sh`, estos son los requisitos:

- Docker
- Docker Compose

Si necesitas realizar una compilación completa antes del despliegue con `./compile_and_deploy.sh`, asegúrate de tener también instalados:

- Rust
- wasm-pack
- Node.js
- TypeScript


## Estructura del JSON para definir un grafo

El JSON encargado de definir un grafo debe seguir la siguiente estructura:

```json
{
    "graph": {
        "nodes": [
            {
                "id": "n1",
                "type": "Entity",
                "properties": {
                    "name": "Node A",
                    "category": "Type 1"
                }
            },
            {
                "id": "n2",
                "type": "Entity",
                "properties": {
                    "name": "Node B",
                    "category": "Type 2"
                }
            },
            {
                "id": "n3",
                "type": "Entity",
                "properties": {
                    "name": "Node C",
                    "category": "Type 3"
                }
            },
            {
                "id": "n4",
                "type": "Entity",
                "properties": {
                    "name": "Node D",
                    "category": "Type 1"
                }
            }
        ],
        "predicates": [
            {
                "id": "p1",
                "label": "connected_to",
                "description": "Represents a general connection between nodes"
            },
            {
                "id": "p2",
                "label": "related_to",
                "description": "Represents a general relationship between nodes"
            },
            {
                "id": "p3",
                "label": "belongs_to",
                "description": "Represents a membership relationship"
            }
        ],
        "stats": {
            "number_of_triples": 6
        }
    }
}
```
En la carpeta data hay ejemplos de config files.