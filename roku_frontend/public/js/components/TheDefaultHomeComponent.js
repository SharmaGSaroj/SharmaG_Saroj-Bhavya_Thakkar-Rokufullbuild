
export default {
  name: 'TheDefaultHomeComponent',

  props: ['user'],

  template: `
  <div>
  <div class="welcome-message">
  <p>Welcome, {{ user.username }}!</p>
</div>

  
  <div class="subheader">
  <nav>
    <button :class="{ active: activeTab === 'movies' }" @click="activeTab = 'movies'">Movies</button>
    <button :class="{ active: activeTab === 'series' }" @click="activeTab = 'series'">Series</button>
    <button :class="{ active: activeTab === 'music' }" @click="activeTab = 'music'">Music</button>
  </nav>
</div>

<div class="featured-movie" v-if="featuredMovie">
<img :src="featuredMovie.img" alt="Featured movie poster">
</div>


  <ul class="movie-list">
    <li v-for="movie in activeTab === 'movies' ? movieList : (activeTab === 'series' ? seriesList : musicList)" :key="movie.id" class="movie-card" @click="showMovieDetails(movie.id)">
      <img :src="movie.img" alt="Movie poster">
      <h2>{{ movie.name }}</h2>
    </li>
  </ul>
  
  <div class="movie-details-popup" v-if="selectedMovie">
    <div class="movie-poster">
      <img :src="selectedMovie.poster" alt="Movie poster">
    </div>
    <div class="movie-info">
      <h2>{{ selectedMovie.title }}</h2>
      <p><strong>Description:</strong> {{ selectedMovie.description }}</p>
      <p><strong>Plot:</strong> {{ selectedMovie.plot }}</p>
      <ul class="movie-genres">
        <li v-for="genre in selectedMovie.genres">{{ genre }}</li>
      </ul>
    </div>
    <button class="close-button" @click="selectedMovie = null">Close</button>
  </div>
</div>

  `,
 

  data() {
      return {
        activeTab: 'movies',
        movieList: [],
        seriesList: [],
        selectedMovie: null,
        featuredMovie: null 
      };
  },

  created() {
   
      const movieApiUrl = `https://imdb-api.com/API/AdvancedSearch/k_ky04vr2n?title_type=movie&release_date=1950-01-01,1990-01-01`;
      const seriesApiUrl = `https://imdb-api.com/API/AdvancedSearch/k_ky04vr2n?title_type=tv_series&release_date=1950-01-01,1990-01-01`;
      const featuredMovieApiUrl = `https://imdb-api.com/API/Search/k_ky04vr2n/inception`;

      

      // Fetch movie data
      fetch(movieApiUrl)
        .then(response => response.json())
        .then(data => {
          if (data.results) {
            this.movieList = data.results.map(movie => ({
              id: movie.id,
              name: movie.title,
              img: movie.image,
            }));
          } else {
            console.log('No movie results found');
          }
        })
        .catch(error => console.log(error));
    
      // Fetch series data
      fetch(seriesApiUrl)
        .then(response => response.json())
        .then(data => {
          if (data.results) {
            this.seriesList = data.results.map(series => ({
              id: series.id,
              name: series.title,
              img: series.image,
              
            }));
          } else {
            console.log('No series results found');
          }
        })
        .catch(error => console.log(error));
  
  
        // Fetch data for featured movie
          fetch(featuredMovieApiUrl)
            .then(response => response.json())
            .then(data => {
            if (data.results && data.results.length > 0) {
              const featuredMovie = data.results[0];
              this.featuredMovie = {
                id: featuredMovie.id,
                name: featuredMovie.title,
                img: featuredMovie.image,
              };
            } else {
              console.log('No featured movie found');
            }
          })
          .catch(error => console.log(error));
        },


    // Fetch data for featured movie



    methods: {
      showMovieDetails(movieId) {
        const movie = this.activeTab === 'movies' ? this.movieList.find(movie => movie.id === movieId) : this.seriesList.find(series => series.id === movieId);
        if (!movie) {
          console.log('Movie/series not found');
          return;
        }
      
        const apiUrl = `https://imdb-api.com/en/API/Title/k_ky04vr2n/${movieId}`;
        fetch(apiUrl)
          .then(response => response.json())
          .then(data => {
            if (data.id) {
             // find the first word that matches a four-digit number
              this.selectedMovie = {
                title: data.title,
                description: data.description,
                plot: data.plot,
                poster: data.image,
                genres: data.genres.split(',').map(genre => genre.trim())
              };
            } else {
              console.log('No results found');
            }
          })
          .catch(error => console.log(error));
      },
      
      
      showSeriesDetails(seriesId) {
        const series = this.seriesList.find(series => series.id === seriesId);
        if (!series) {
          console.log('Series not found');
          return;
        }
  
        const apiUrl = `https://imdb-api.com/en/API/Title/k_ky04vr2n/${seriesId}`;
        fetch(apiUrl)
          .then(response => response.json())
          .then(data => {
            if (data.id) {
              this.selectedSeries = {
                title: data.title,
                plot: data.plot,
                poster: data.image,
                genres: data.genres.split(',').map(genre => genre.trim()),
                
              };
            } else {
              console.log('No results found');
            }
          })
          .catch(error => console.log(error));
      },
  
      switchTab(tab) {
        this.activeTab = tab;
      }
    },
    
  }
    
  

