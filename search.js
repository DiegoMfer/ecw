$(document).ready(function() {
    $('#search-button').on('click', function(event) {
        event.preventDefault(); // Evita el salto de página
        const searchTerm = $('#search-input').val().toLowerCase();
        if (searchTerm) {
            $('#search-results').empty();  // Limpiar resultados anteriores

            // Definimos el contenido hardcodeado de sitemap.xml como un objeto en JS
            const sitemap = {
                site: {
                    page: [
                        {
                            url: 'index.html',
                            title: 'Página Principal - Diego Martín Fernández',
                            content: 'Sobre Mí Hola, soy Diego Martín Fernández, un ingeniero de software apasionado por la tecnología y el aprendizaje constante. Me gusta mantenerme activo haciendo deporte y también disfruto mucho de mis hobbies, como leer y tocar la guitarra. Me encanta descubrir y aprender nuevas habilidades, lo cual me motiva en mi vida personal y profesional. Mis Hobbies e Intereses - Lectura Leer es una de mis grandes pasiones. Me fascinan los géneros de fantasía y ciencia ficción, ya que permiten explorar mundos e ideas nuevas. Algunos de mis libros favoritos incluyen: - Fantasía: Las Crónicas de Narnia de C.S. Lewis - Ciencia Ficción: The Expanse de James S.A. Corey - Música Tocar la guitarra es otro de mis hobbies. Me gusta interpretar canciones de rock clásico, disfrutando de la música de bandas icónicas que marcaron generaciones. Algunas de mis bandas favoritas incluyen Led Zeppelin, Pink Floyd y The Beatles. La música es una forma de expresión para mí y un excelente modo de desconectar. - Motociclismo Montar en moto es una de mis actividades favoritas, ya que me permite sentir la libertad de la carretera y explorar nuevos lugares. Me encanta la aventura y la sensación de adrenalina que ofrece el motociclismo. - Otros Intereses Aparte de los hobbies mencionados, también me gusta explorar temas de tecnología, diseño de software entre otros. Disfruto del cine, especialmente las películas de ciencia ficción y documentales que expanden el conocimiento y la curiosidad.'
                        },
                        {
                            url: 'curriculum.html',
                            title: 'Currículum - Diego Martín Fernández',
                            content: 'Mis proyectos - RDF in Zarr Proyecto de investigación sobre motores RDF usando tecnología de particionamiento de arrays en chunks - Proyecto Dataspaces agricultura de Málaga Proyecto europeo para usar tecnologías descentralizadas para modelar la información agrícola - Esta página web Página web personal'
                        },
                        {
                            url: 'sobre_mi.html',
                            title: 'Sobre Mí - Diego Martín Fernández',
                            content: 'Hola, soy Diego Martín Fernández, un ingeniero de software apasionado por la tecnología y el aprendizaje constante. Me gusta mantenerme activo haciendo deporte y también disfruto mucho de mis hobbies, como leer y tocar la guitarra. Me encanta descubrir y aprender nuevas habilidades, lo cual me motiva en mi vida personal y profesional...'
                        }
                    ]
                }
            };
            

            const results = [];

            // Iteramos sobre las páginas definidas en el objeto sitemap
            sitemap.site.page.forEach(function(page) {
                const title = page.title;
                const url = page.url;
                const content = page.content.toLowerCase();

                // Si el contenido contiene el término de búsqueda
                if (content.includes(searchTerm)) {
                    results.push({
                        title: title,
                        url: url,
                        snippet: content.substring(0, 150) + '...'
                    });
                }
            });

            // Mostrar los resultados si se encuentran coincidencias
            if (results.length > 0) {
                results.forEach(result => {
                    $('#search-results').append(`
                        <div class="search-result">
                            <h3><a href="${result.url}">${result.title}</a></h3>
                            <p>${result.snippet}</p>
                        </div>
                    `);
                });
            } else {
                $('#search-results').append('<p>No se encontraron resultados.</p>');
            }
        }
    });
});
