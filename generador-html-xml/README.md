# Estructura del XML para la Página Web

Este documento describe la estructura del archivo XML utilizado para generar una página web personal. Además, se detallan los pasos necesarios para adaptarlo a otro usuario.

## **Ejecución del Código**

Para generar el HTML a partir del XML, necesitas tener Node.js instalado. Luego, ejecuta el siguiente comando en la terminal:

```bash
node generateHTMLFromXML.js
```

---

## **Estructura del XML**

### **Elemento raíz: `<website>`**
- Representa el sitio web completo.
- Contiene dos elementos principales:
        - `<metadata>`: Metadatos generales sobre la página.
        - `<mainContent>`: El contenido principal dividido en páginas.

---

### **Elemento `<metadata>`**
- **Propósito:** Proporcionar información básica sobre el sitio web.
- **Subelementos:**
        - `<author>`: Nombre del autor de la página.
        - `<description>`: Descripción breve del propósito del sitio web.
        - `<keywords>`: Palabras clave relacionadas con el contenido.

**Ejemplo:**
```xml
<metadata>
        <author>Diego Martín Fernández</author>
        <description>Proyecto ECW - Página web personal de Diego Martín Fernández</description>
        <keywords>info, persona, hobbies, intereses</keywords>
</metadata>
```
**Adaptación:** Cambia el contenido de `<author>`, `<description>` y `<keywords>` para reflejar la información del nuevo usuario.

---

### **Elemento `<mainContent>`**
- **Propósito:** Contiene las diferentes páginas del sitio web.
- **Subelementos principales:**
        - `<indexPage>`: Página principal (introducción).
        - `<curriculumPage>`: Página del currículum o proyectos.
        - `<aboutPage>`: Página sobre el usuario.

#### **Estructura de las páginas**
Cada página (`<indexPage>`, `<curriculumPage>`, `<aboutPage>`) incluye:
- `<title>`: Título de la página.
- `<description>`: Descripción general de la página.
- `<section>`: Secciones adicionales con contenido más detallado.

**Ejemplo de `<indexPage>`:**
```xml
<indexPage>
        <title>Página Principal</title>
        <description>Bienvenido a la página web personal de Diego Martín Fernández...</description>
        <section>
                <type>Image</type>
                <content src="multimedia/images/yo.jpeg" alt="Imagen personal de Diego Martín Fernández" />
        </section>
        <section>
                <type>About</type>
                <content>
                        <title>Sobre Mí</title>
                        <description>Soy un ingeniero de software...</description>
                </content>
        </section>
</indexPage>
```
**Adaptación:** Cambia el `<title>` y `<description>` de cada página según el nuevo usuario. Modifica o añade `<section>` para incluir el contenido relevante del nuevo usuario (imágenes, hobbies, etc.).

---

### **Tipos de secciones (`<section>`)**
- **Image:** Para imágenes con atributos `src` (ruta) y `alt` (descripción).
- **About o Bio:** Para descripciones personales.
- **Hobbies:** Lista de hobbies e intereses.
        - Cada hobby incluye:
                - `<name>`: Nombre del hobby.
                - `<description>`: Breve descripción.
                - `<books>` (opcional): Lista de libros relacionados.
- **Projects:** Lista de proyectos.
        - Cada proyecto incluye:
                - `<name>`: Nombre del proyecto.
                - `<description>`: Breve descripción.

---
