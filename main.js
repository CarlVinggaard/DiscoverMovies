"use strict"

Vue.use(Vuex)

const store = new Vuex.Store({

    state: {
        results: '',
        totalResults: 0,
        page: 1,
        queried: false
    },

    actions: {
        // Returns a page with 20 results from TMDb. Method can be either 'search' or 'discover'.
        fetchData(context, url) {

            axios.get(url)
            .then(response => {
                console.log(response);
                
                context.commit('setResults', response.data.results);
                context.commit('setTotalResult', response.data.total_results);
                context.commit('setQueryStatus', true); // Used for displaying error message for invalid queries.
            })
            .catch(err =>
                console.log(err)
            );
        }
    },
    mutations: {
        setResults(state, newState) {
            state.results = newState;
        },

        setTotalResult(state, newState) {
            state.totalResults = newState;
        },
        setQueryStatus(state, newState) {
            state.queried = newState;
        },
        setPage(state, newState) {
            state.page = newState;
        }
    }
});

var app = new Vue({
    el: '#app',
    vuetify: new Vuetify(),
    data: {
        query: '',
        releaseYear: '',
        minRating: '',
        maxRating: '',
        genre: '',
        sortBy: '',
        sortByMethods: [
                    {name: 'Popularity', value: 'popularity.desc'},
                    {name: 'Release date (most recent first)', value: 'release_date.desc'},
                    {name: 'Revenue', value: 'revenue.desc'},
                    {name: 'Average Rating', value: 'vote_average.desc'}
        ]
    },
    computed: {
        results () {
            return this.$store.state.results;
        },
        totalResults () {
            return this.$store.state.totalResults;
        },
        queried () {
            return this.$store.state.queried;
        }
    },
    methods: {
        fetchData(page, method) {
            let url;

            // Create the URL
            if (method == 'discover') {
                url = this.getRequestURLforDiscover(page);
            } else if (method == 'search') {
                url = this.getRequestURLforSearch(page);
            } else {
                alert("The function 'fetchData()' was called with an invalid 'method' argument.")
            }

            console.log(url);

            this.$store.dispatch('fetchData', url);
        },
        getRequestURLforDiscover: function(page) {
            // Key for the MovieDatabase API
            const APIkey = 'b330fd993b7bc007e1e8713b02dc45f7';
            const baseURL = 'https://api.themoviedb.org/3/discover/movie?api_key=';
            let url = baseURL + APIkey + '&page=' + page.toString();
            
            if (this.genre) {
                var genreID = getGenreID(this.genre, genres); // Genres are identified with ID numbers, mapped in the object 'genres' in genres.js
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
        getRequestURLforSearch: function(page) {
            // Key for the MovieDatabase API
            const APIkey = 'b330fd993b7bc007e1e8713b02dc45f7';
            const baseURL = 'https://api.themoviedb.org/3/search/movie?api_key=';
            let url = baseURL + APIkey + '&page=' + page.toString();

            if (this.query) { url += '&' + 'query=' + replaceSpacesWithPlusses(this.query) };

            return url;
        }
    },
    store
});

/* var app = new Vue({
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
        getRequestURLforDiscover(page) {
            // Key for the MovieDatabase API
            const APIkey = 'b330fd993b7bc007e1e8713b02dc45f7';
            const baseURL = 'https://api.themoviedb.org/3/discover/movie?api_key=';
            let url = baseURL + APIkey + '&page=' + page.toString();
            
            if (this.genre) {
                var genreID = getGenreID(this.genre, genres); // Genres are identified with ID numbers, mapped in the object 'genres' in genres.js
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
        getRequestURLforSearch(page) {
            // Key for the MovieDatabase API
            const APIkey = 'b330fd993b7bc007e1e8713b02dc45f7';
            const baseURL = 'https://api.themoviedb.org/3/search/movie?api_key=';
            let url = baseURL + APIkey + '&page=' + page.toString();

            if (this.query) { url += '&' + 'query=' + replaceSpacesWithPlusses(this.query) };

            return url;
        },
        // Returns a page with 20 results from TMDb.
        getData(page, method) {
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
}); */