export default{
    name: 'FeatureMovie',
    template:`
    <div class="feature-movie">
    <h2>Feature Movie</h2>
    <div class="carousel">
      <div class="carousel-inner">
        <div v-for="movie in featureMovieList" :key="movie.id" class="carousel-item">
          <img :src="movie.image" alt="Movie poster">
          <div class="movie-info">
            <h3>{{ movie.title }}</h3>
            <p>{{ movie.description }}</p>
          </div>
        </div>
      </div>
      <a class="carousel-control-prev" href="#feature-carousel" role="button" data-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
      </a>
      <a class="carousel-control-next" href="#feature-carousel" role="button" data-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
      </a>
    </div>
  </div>
    
    
    
    `,
    
    data() {
        return {
          featureMovieList: [],
          featureMovieIndex: 0,
          featureMovieIntervalId: null,
          featureMovieIntervalDuration: 5000
        }
      },
      methods: {
        fetchFeatureMovies() {
          const apiUrl = 'https://imdb-api.com/API/AdvancedSearch/k_ky04vr2n?title_type=feature&release_date=1950-01-01,1990-01-01&sort=year,asc'
          fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
              this.featureMovieList = data.results.map(movie => ({
                id: movie.id,
                title: movie.title,
                description: movie.description,
                image: movie.image
              }))
              this.startFeatureMovieInterval()
            })
            .catch(error => {
              console.error(error)
            })
        },
        startFeatureMovieInterval() {
          this.featureMovieIntervalId = setInterval(() => {
            this.featureMovieIndex = (this.featureMovieIndex + 1) % this.featureMovieList.length
          }, this.featureMovieIntervalDuration)
        },
        stopFeatureMovieInterval() {
          clearInterval(this.featureMovieIntervalId)
          this.featureMovieIntervalId = null
        }
      },
      created() {
        this.fetchFeatureMovies()
      },
      beforeDestroy() {
        this.stopFeatureMovieInterval()
      }

}