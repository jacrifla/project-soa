document.addEventListener("DOMContentLoaded", function () {
    const tmdbApiKey = '57d80942fbc1daf9cd1429ea9c9ee8f5';
    const youtubeApiKey = 'AIzaSyA_Y2Cj9K31Pq8Qyw_3SCo4WHfjluYuJCQ';
    const apiUrl = `https://api.themoviedb.org/3/movie/now_playing?api_key=${tmdbApiKey}&language=pt-BR&page=1`;

    function loadMovies() {
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                if (data.results.length > 0) {
                    const movieGrid = document.getElementById('movieGrid');
                    movieGrid.innerHTML = ''; 
                    data.results.forEach(movie => {
                        const movieItem = document.createElement('div');
                        movieItem.classList.add('movie-item');
    
                        const movieImage = document.createElement('img');
                        movieImage.classList.add('movie-image');
                        movieImage.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
                        movieImage.alt = movie.title;
                        movieItem.appendChild(movieImage);
    
                        const movieTitle = document.createElement('h3');
                        movieTitle.textContent = movie.title;
                        movieItem.appendChild(movieTitle);
    
                        const trailerButton = document.createElement('button');
                        trailerButton.textContent = 'Assistir Trailer';
                        trailerButton.classList.add('trailer-button');
                        trailerButton.addEventListener('click', function() {
                            getYouTubeTrailer(movie.title, youtubeApiKey)
                                .then(trailerId => {
                                    if (trailerId) {
                                        window.open(`https://www.youtube.com/watch?v=${trailerId}`, '_blank');
                                    } else {
                                        alert('Trailer não encontrado.');
                                    }
                                })
                                .catch(error => {
                                    console.error('Erro ao obter trailer do YouTube:', error);
                                    alert('Erro ao carregar o trailer.');
                                });
                        });
                        movieItem.appendChild(trailerButton);
    
                        movieGrid.appendChild(movieItem);
                    });
                } else {
                   
                    movieGrid.innerHTML = '<p>Nenhum filme encontrado.</p>';
                }
            })
            .catch(error => {
                console.error('Erro ao carregar filmes:', error);
                
                movieGrid.innerHTML = '<p>Ocorreu um erro ao carregar os filmes.</p>';
            });
    }
    

    function loadPopularMovies() {
        const popularUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${tmdbApiKey}&language=pt-BR&page=1`;
        
        fetch(popularUrl)
            .then(response => response.json())
            .then(data => {
                if (data.results.length > 0) {
                    const newsSection = document.getElementById('home');
                    newsSection.innerHTML = ''; 
    
                    const popularMoviesTitle = document.createElement('h2');
                    popularMoviesTitle.textContent = 'Filmes em Alta';
                    newsSection.appendChild(popularMoviesTitle);
    
                    const movieList = document.createElement('ul');
                    movieList.classList.add('movie-list');
                    
                    data.results.forEach(movie => {
                        const movieItem = document.createElement('li');
                        movieItem.textContent = movie.title;
                        movieList.appendChild(movieItem);
                    });
    
                    newsSection.appendChild(movieList);
                } else {
                
                    newsSection.innerHTML = '<p>Nenhum filme em alta encontrado.</p>';
                }
            })
            .catch(error => {
                console.error('Erro ao carregar filmes em alta:', error);
                newsSection.innerHTML = '<p>Ocorreu um erro ao carregar os filmes em alta.</p>';
            });
    }

    function loadStreamingReleases() {
        const streamingUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${tmdbApiKey}&language=pt-BR&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_providers=8`;
        
        fetch(streamingUrl)
            .then(response => response.json())
            .then(data => {
                if (data.results.length > 0) {
                    const streamingSection = document.getElementById('streaming');
                    streamingSection.innerHTML = ''; 
                    const streamingTitle = document.createElement('h2');
                    streamingTitle.textContent = 'Lançamentos nos Streamings';
                    streamingSection.appendChild(streamingTitle);
    
                    const movieList = document.createElement('ul');
                    movieList.classList.add('movie-list');
                    
                    data.results.forEach(movie => {
                        const movieItem = document.createElement('li');
                        movieItem.textContent = movie.title;
                        movieList.appendChild(movieItem);
                    });
    
                    streamingSection.appendChild(movieList);
                } else {
                    streamingSection.innerHTML = '<p>Nenhum lançamento nos streamings encontrado.</p>';
                }
            })
            .catch(error => {
                console.error('Erro ao carregar lançamentos nos streamings:', error);
                streamingSection.innerHTML = '<p>Ocorreu um erro ao carregar os lançamentos nos streamings.</p>';
            });
    }
    
    
    

    
    async function getYouTubeTrailer(movieTitle, apiKey) {
        const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(movieTitle)}%20trailer&type=video&key=${apiKey}`);
        const data = await response.json();
        if (data.items && data.items.length > 0) {
    
            return data.items[0].id.videoId;
        } else {
    
            return null;
        }
    }

    
const movies = [
    { title: 'Filme 1', releaseDate: '2024-04-10' },
    { title: 'Filme 2', releaseDate: '2024-04-15' },
    { title: 'Filme 3', releaseDate: '2024-04-20' },
    
];

function setupCalendar() {
    const calendarContainer = document.getElementById('calendar');
    
    const table = document.createElement('table');
    
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    
    const daysOfWeek = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    const headerRow = document.createElement('tr');
    daysOfWeek.forEach(day => {
        const th = document.createElement('th');
        th.textContent = day;
        headerRow.appendChild(th);
    });
    table.appendChild(headerRow);
    
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    let date = 1;
    for (let i = 0; i < 6; i++) { 
        const row = document.createElement('tr');
        for (let j = 0; j < 7; j++) { 
            if (i === 0 && j < firstDayOfMonth) {
                const cell = document.createElement('td');
                row.appendChild(cell);
            } else if (date > daysInMonth) {
                break;
            } else {
                const cell = document.createElement('td');
                cell.textContent = date;
                const releaseMovies = movies.filter(movie => {
                    const releaseDate = new Date(movie.releaseDate);
                    return releaseDate.getFullYear() === currentYear && releaseDate.getMonth() === currentMonth && releaseDate.getDate() === date;
                });
                if (releaseMovies.length > 0) {
                    const moviesList = document.createElement('ul');
                    releaseMovies.forEach(movie => {
                        const movieItem = document.createElement('li');
                        movieItem.textContent = movie.title;
                        moviesList.appendChild(movieItem);
                    });
                    cell.appendChild(moviesList);
                }
                row.appendChild(cell);
                date++;
            }
        }
        table.appendChild(row);
    }
    
    calendarContainer.appendChild(table);
}

    

    loadMovies();
    loadPopularMovies();
    loadStreamingReleases()
    setupCalendar()
});