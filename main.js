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
                                    <h4>{{title}} <span class="year">({{release_date.slice(0, 4)}})</span></h4>
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
        results: {  page1: '',
                    page2: '',
                    page3: '',
                    page4: '',
                    page5: ''
        },
        totalResults: 0,
        currentPage: 1
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

            console.log(url);

            return url;
        },
        // Create request URL from input. 'Method' is either 'discover' or 'search'.
        getRequestURLforSearch: function(page) {
            // Key for the MovieDatabase API
            const APIkey = 'b330fd993b7bc007e1e8713b02dc45f7';
            const baseURL = 'https://api.themoviedb.org/3/search/movie?api_key=';
            let url = baseURL + APIkey + '&page=' + page.toString();

            if (this.query) { url += '&' + 'query=' + replaceSpacesWithPlusses(this.query) };

            console.log(url);

            return url;
        },
        // Returns an array 5 pages of data from TMDb. There are 20 results on each page.
        getData: function(method) {
            // The API sends one page with 20 results pr call. Call it 5 times to get the top 100 results.
            let url = {};

            // Create the 5 URLs
            if (method == 'discover') {
                url.page1 = this.getRequestURLforDiscover(1);
                url.page2 = this.getRequestURLforDiscover(2);
                url.page3 = this.getRequestURLforDiscover(3);
                url.page4 = this.getRequestURLforDiscover(4);
                url.page5 = this.getRequestURLforDiscover(5);
            } else if (method == 'search') {
                url.page1 = this.getRequestURLforSearch(1);
                url.page2 = this.getRequestURLforSearch(2);
                url.page3 = this.getRequestURLforSearch(3);
                url.page4 = this.getRequestURLforSearch(4);
                url.page5 = this.getRequestURLforSearch(5);
            } else {
                alert("The function 'getData()' was called with an invalid parameter.")
            }

            console.log(url);

            axios.all([axios.get(url.page1), axios.get(url.page2), axios.get(url.page3), axios.get(url.page4), axios.get(url.page5)])
            .then(response => {
                console.log(response);
                this.results.page1 = response[0].data.results;
                this.results.page2 = response[1].data.results;
                this.results.page3 = response[2].data.results;
                this.results.page4 = response[3].data.results;
                this.results.page5 = response[4].data.results;

                this.totalResults = response[0].data.total_results;
            })
            .catch(err =>
                console.log(err)
            );
        }
    }
});