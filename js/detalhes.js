document.addEventListener("DOMContentLoaded", function () {
    // Lógica para obter informações do filme com base no ID passado pela URL
    const params = new URLSearchParams(window.location.search);
    const movieId = params.get('movieId');

    // Função para obter os detalhes do filme com base no ID
    function fetchMovieDetails(movieId) {
        const tmdbApiKey = '57d80942fbc1daf9cd1429ea9c9ee8f5';
        const apiUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${tmdbApiKey}&language=pt-BR`;

        return fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                return {
                    title: data.title,
                    overview: data.overview,
                    releaseDate: data.release_date,
                    posterPath: `https://image.tmdb.org/t/p/w500${data.poster_path}`
                    // Adicione mais informações do filme conforme necessário
                };
            });
    }

    function fetchComentarios(filme_id){
            fetch('php/comentario.php?filme_id=' + filme_id)
            .then(response => response.json())
            .then(data => {
                let comentariosList = document.getElementById('comentariosList');
                data.forEach(comentario =>{
                    let novoComentario = document.createElement("div");
                    novoComentario.innerHTML = `
                        <div class="comentario">
                            <h3>${comentario.usuario_nome}</h3>
                            <p>${comentario.comentario}</p>
                            <p class="dataPub">${comentario.data_publicacao}</p>
                        </div>
                    `
                    
                    comentariosList.appendChild(novoComentario);
                })
            })
            .catch(error => {
                console.error('Erro ao obter comentários:', error);
            });
        
        
    }

    // Função para preencher os detalhes do filme na página
    function fillMovieDetails(movieDetails) {
        const moviePosterElement = document.getElementById('moviePoster');
        moviePosterElement.src = movieDetails.posterPath;

        const movieTitleElement = document.getElementById('movieTitle');
        movieTitleElement.textContent = movieDetails.title;

        const movieOverviewElement = document.getElementById('movieOverview');
        movieOverviewElement.textContent = movieDetails.overview;

        const releaseDateElement = document.getElementById('releaseDate');
        releaseDateElement.textContent = movieDetails.releaseDate;
        
        const filmeId = document.getElementById('filme_id');
        filmeId.textContent = movieId;

        fetchComentarios(movieId);
    }

    // Exibir detalhes do filme na página
    fetchMovieDetails(movieId)
        .then(movieDetails => {
            fillMovieDetails(movieDetails);
        })
        .catch(error => {
            console.error('Erro ao carregar detalhes do filme:', error);
            const movieDetailsElement = document.getElementById('movieDetails');
            movieDetailsElement.innerHTML = '<p>Ocorreu um erro ao carregar os detalhes do filme.</p>';
        });

    const botao_mostrar = document.getElementById('botao_mostrar');
    botao_mostrar.addEventListener('click', function () {
        var comentariosList = document.getElementById("comentariosList");
       //console.log(comentariosList.classList)
        if (comentariosList.classList.contains("d-none")) {
            comentariosList.classList.add("d-block");
            comentariosList.classList.remove("d-none");
        } else {
            comentariosList.classList.add("d-none");
            comentariosList.classList.remove("d-block");
        }
    });

    // Lógica para enviar comentário sobre o filme
    const submitButton = document.getElementById('submitComment');
    
    submitButton.addEventListener('click', function () {
        document.getElementById('filme_id').value = movieId;
        // Enviar o comentário para o servidor ou fazer outra ação necessária
        // Exemplo:
        //console.log('Comentário:', comment);
    });
});
