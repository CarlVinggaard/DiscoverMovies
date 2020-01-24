"use strict"

// The Vue component used to render a movie item in the results list.
var movieItem = Vue.component("movie-item", {
    template: `<div class="row justify-content-center mx-2">
                        <div class="result-item col-12 col-md-10 col-lg-8 py-3 px-4 my-2">
                            <div class="row">
                                <div v-if="poster_path" class="col-4 img-container">
                                    <img class="w-100" :src="'https://image.tmdb.org/t/p/w500' + poster_path">
                                </div>
                                <div class="col-8">
                                    <h4>{{title}} <span v-if="release_date" class="year">({{release_date.slice(0, 4)}})</span></h4>
                                    <h5 v-if="vote_average">Rating: {{vote_average}}</h5>
                                    <div v-if="overview">
                                        <h6>Summary</h6>
                                        <p>{{overview}}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`,
    props: ["poster_path", "title", "release_date", "vote_average", "overview"]
});

var app = new Vue({
    el: '#app',
    data: {
        query: '',
        releaseYear: '',
        minRating: '',
        maxRating: '',
        genre: '',
        sortBy: '',
        results: '',
        totalResults: 0,
        page: 1,
        queried: false
    },
    components: {
        movieItem: movieItem
    },
        methods: { 
        // Create request URL from input. 'Method' is either 'discover' or 'search'.
        getRequestURLforDiscover: function(page) {
            // Key for the MovieDatabase API
            const APIkey = 'b330fd993b7bc007e1e8713b02dc45f7';
            const baseURL = 'https://api.themoviedb.org/3/discover/movie?api_key=';
            let url = baseURL + APIkey + '&page=' + page.toString();
            
            if (this.genre) {
                var genreID = getGenreID(this.genre, genres); // Genres are identified with numbers, mapped in object in genres.js
            }
            
            // Check all the values and append them to the URL
            if (this.genre) { getGenreID(this.genre, genres) };

            if (this.query) { url += '&' + 'query=' + replaceSpacesWithPlusses(this.query) };

            if (this.releaseYear) { url += '&' + 'primary_release_year=' + this.releaseYear };

            if (this.minRating) { url += '&' + 'vote_average.gte=' + this.minRating };

            if (genreID) { url += '&' + 'with_genres=' + genreID };

            if (this.sortBy) { url += '&' + 'sort_by=' + this.sortBy };

            return url;
        },
        // Create request URL from input. 'Method' is either 'discover' or 'search'.
        getRequestURLforSearch: function(page) {
            // Key for the MovieDatabase API
            const APIkey = 'b330fd993b7bc007e1e8713b02dc45f7';
            const baseURL = 'https://api.themoviedb.org/3/search/movie?api_key=';
            let url = baseURL + APIkey + '&page=' + page.toString();

            if (this.query) { url += '&' + 'query=' + replaceSpacesWithPlusses(this.query) };

            return url;
        },
        // Returns a page with 20 results from TMDb.
        getData: function(page, method) {
            let url = {};

            // Create the URL
            if (method == 'discover') {
                url = this.getRequestURLforDiscover(page);
            } else if (method == 'search') {
                url = this.getRequestURLforSearch(page);
            } else {
                alert("The function 'getData()' was called with an invalid 'method' argument.")
            }

            console.log(url);

            axios.get(url)
            .then(response => {
                console.log(response);
                
                this.results = response.data.results;
                this.totalResults = response.data.total_results;
                this.queried = true; // Used for displaying error message for invalid queries.
            })
            .catch(err =>
                console.log(err)
            );
        }
    }
});