"use strict"

Vue.use(Vuex)

const store = new Vuex.Store({

    state: {
        results: '',
        totalResults: 0,
        page: 1,
        queried: false,
        method: ''
    },

    actions: {
        fetchData(context, {url, method}) {

            axios.get(url)
            .then(response => {
                
                context.commit('setResults', response.data.results);
                context.commit('setTotalResult', response.data.total_results);
                context.commit('setQueryStatus', true); // Used for displaying error message for invalid queries.
                context.commit('setMethod', method);

            })
            .catch(err =>
                console.log(err)
            );
        },
        incrementPage(context) {
            context.commit('incrementPage');
        },
        decrementPage(context) {
            context.commit('decrementPage');
        },
        setPage(context, page) {
            context.commit('setPage', page);
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
        },
        incrementPage(state) {
            state.page++;
        },
        decrementPage(state) {
            state.page--;
        },
        setMethod(state, newState) {
            state.method = newState;
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
        },
        page () {
            return this.$store.state.page;
        },
        resultPages () {
            return Math.ceil(this.$store.state.totalResults/20);
        },
        method () {
            return this.$store.state.method;
        },
        firstShown () {
            return 1 + 20 * (this.$store.state.page - 1);
        },
        lastShown () {
            return Math.min(20 * this.$store.state.page, this.$store.state.totalResults);
        }
    },
    methods: {
        fetchData(page, method) {
            let url;

            this.$store.dispatch('setPage', page);

            // Create the URL
            if (method == 'discover') {
                url = this.getRequestURLforDiscover(page);
            } else if (method == 'search') {
                url = this.getRequestURLforSearch(page);
            } else {
                alert("The function 'fetchData()' was called with an invalid 'method' argument.")
            }

            this.$store.dispatch('fetchData', {url, method});
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
            if (this.minRating) { url += '&' + 'vote_average.gte=' + replaceCommasWithDots(this.minRating) };
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
        },
        showNextPage: function() {
            this.$store.dispatch('incrementPage');
            this.fetchData(this.page, this.method);
            document.getElementById("result-list").scrollIntoView();
        },
        showPreviousPage: function() {
            this.$store.dispatch('decrementPage');
            this.fetchData(this.page, this.method);
            document.getElementById("result-list").scrollIntoView();
        }
    },
    store
});