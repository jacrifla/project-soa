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

    // Lógica para enviar comentário sobre o filme
    const submitButton = document.getElementById('submitComment');
    submitButton.addEventListener('click', function () {
        const comment = document.getElementById('comment').value;
        // Enviar o comentário para o servidor ou fazer outra ação necessária
        // Exemplo:
        console.log('Comentário:', comment);
    });
});
