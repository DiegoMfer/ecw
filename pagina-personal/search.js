$(document).ready(function() {
    $('#search-button').on('click', function(event) {
        event.preventDefault(); // Evita el salto de página
        const searchTerm = $('#search-input').val().toLowerCase();
        if (searchTerm) {
            $('#search-results').empty();  // Limpiar resultados anteriores

            $.ajax({
                url: 'sitemap.xml',  // Asegúrate de que 'sitemap.xml' esté en la misma carpeta que el archivo JS
                dataType: 'xml',
                success: function(data) {
                    const results = [];
                    $(data).find('page').each(function() {
                        const title = $(this).find('title').text();
                        const url = $(this).find('url').text();
                        const content = $(this).find('content').text().toLowerCase();

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
                },
                error: function(xhr, status, error) {
                    // Imprimir detalles completos del error para depuración
                    console.error("Error en la carga del sitemap: ", status, error);
                    console.error(xhr.responseText);
                    $('#search-results').append('<p>Error al cargar el índice de búsqueda. Ver consola para más detalles.</p>');
                }
            });
        }
    });
});
