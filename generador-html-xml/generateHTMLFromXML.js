const fs = require('fs');
const path = require('path');
const xml2js = require('xml2js');

// Define the XML file path
const xmlFilePath = path.join(__dirname, 'data', 'data.xml');
const webDir = path.join(__dirname, 'web'); // Directory for the generated HTML files

// Create the web directory if it doesn't exist
if (!fs.existsSync(webDir)) {
    fs.mkdirSync(webDir, { recursive: true });
}

// Create an XML parser
const parser = new xml2js.Parser({
    explicitArray: false, // Avoid wrapping single elements in arrays
    mergeAttrs: true,     // Include attributes in the parent object
});

// Function to generate HTML structure
const generateHTML = (title, sections, links) => `<!DOCTYPE HTML>
<html lang="es">

<head>
    <!-- Meta-datos que describen el documento -->
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="keywords" content="info, persona, hobbies, intereses" />
    <meta name="author" content="Diego Martín Fernández" />
    <meta name="description" content="Proyecto ECW - Página web personal de Diego Martín Fernández" />
    <link rel="stylesheet" type="text/css" href="estilo/estilo.css">
    <link rel="stylesheet" type="text/css" href="estilo/layout.css">
    <title>${title}</title>
</head>

<body>
    <header>
        <h1>Página personal</h1>
        <nav>
            <ul>
                ${links.map(link => `<li><a href="${link.href}">${link.text}</a></li>`).join('\n')}
            </ul>
        </nav>
    </header>

    <!-- Contenido principal de la página -->
    <main>
        ${sections.map(section => `
        <section>
            <h2>${section.title}</h2>
            <p>${section.content}</p>
        </section>`).join('\n')}
    </main>

    <!-- Pie de página con información de contacto -->
    <footer>
        <p>&copy; 2024 Diego Martín Fernández - Todos los derechos reservados</p>
    </footer>
</body>

</html>`;

// Read and parse the XML file
fs.readFile(xmlFilePath, 'utf-8', (err, data) => {
    if (err) {
        console.error('Error reading the XML file:', err);
        return;
    }

    parser.parseString(data, (err, result) => {
        if (err) {
            console.error('Error parsing the XML file:', err);
            return;
        }

        const website = result.website;

        // Generate HTML for each page
        const pages = [
            {
                filename: 'indexPage.html',
                title: website.mainContent.indexPage.title,
                sections: [
                    { title: 'Bienvenida', content: website.mainContent.indexPage.welcomeMessage },
                    {
                        title: website.mainContent.indexPage.about.title,
                        content: website.mainContent.indexPage.about.description,
                    },
                    {
                        title: website.mainContent.indexPage.hobbies.title,
                        content: website.mainContent.indexPage.hobbies.hobby.map(hobby =>
                            `<strong>${hobby.name}</strong>: ${hobby.description}`
                        ).join('<br />'),
                    },
                ],
                links: [
                    { href: 'indexPage.html', text: 'Inicio' },
                    { href: 'curriculumPage.html', text: 'Currículum' },
                    { href: 'aboutPage.html', text: 'Sobre Mí' },
                ],
            },
            {
                filename: 'curriculumPage.html',
                title: website.mainContent.curriculumPage.title,
                sections: website.mainContent.curriculumPage.projects.project.map(project => ({
                    title: project.name,
                    content: project.description,
                })),
                links: [
                    { href: 'indexPage.html', text: 'Inicio' },
                    { href: 'curriculumPage.html', text: 'Currículum' },
                    { href: 'aboutPage.html', text: 'Sobre Mí' },
                ],
            },
            {
                filename: 'aboutPage.html',
                title: website.mainContent.aboutPage.title,
                sections: [
                    {
                        title: website.mainContent.aboutPage.title,
                        content: website.mainContent.aboutPage.description,
                    },
                ],
                links: [
                    { href: 'indexPage.html', text: 'Inicio' },
                    { href: 'curriculumPage.html', text: 'Currículum' },
                    { href: 'aboutPage.html', text: 'Sobre Mí' },
                ],
            },
        ];

        // Write each HTML file
        pages.forEach(page => {
            const filePath = path.join(webDir, page.filename);
            fs.writeFile(filePath, generateHTML(page.title, page.sections, page.links), err => {
                if (err) {
                    console.error(`Error writing file ${page.filename}:`, err);
                } else {
                    console.log(`File ${page.filename} created successfully in the 'web' folder.`);
                }
            });
        });
    });
});
