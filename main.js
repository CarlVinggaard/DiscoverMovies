// This does something related to Vue
"use strict"

var app = new Vue({
    el: '#app',
    data: {
        searchString: '',
        releaseYear: '',
        minRating: '',
        maxRating: '',
        genre: '',
        sortBy: '',
        results: ''
    },
        methods: { 
        // Create request URL from input
        getRequestURL: function() {
            // Key for the MovieDatabase API
            const APIkey = 'b330fd993b7bc007e1e8713b02dc45f7';
            const baseURL = 'https://api.themoviedb.org/3/discover/movie?api_key='
            var url = baseURL + APIkey;
            
            if (this.genre) {
                var genreID = getGenreID(this.genre, genres); // Genres are identified with numbers, mapped in object in genres.js
            }

            /*if (searchString) {
                url += '&' + 'with_keywords=' + 'app.searchString;
            }*/

            if (this.releaseYear) {
                url += '&' + 'primary_release_year=' + this.releaseYear;
                console.log("Year was set");
            }

            if (this.minRating) {
                url += '&' + 'vote_average.lte=' + this.minRating;
                console.log("minRating was set");
            }
            
            // Minimum and Maximum don't seem to work together?
            /*if (this.maxRating) {
                url += '&' + 'vote_average.gte=' + this.maxRating;
                console.log("maxRating was set");
            }*/

            if (genreID) {
                url += '&' + 'with_genres=' + genreID;
                console.log("Genre was set");
            }

            if (this.sortBy) {
                url += '&' + 'sort_by=' + this.sortBy;
                console.log("SortBy was set");
            }

            console.log(url);

            return url;
        },
        getData: function() {
            let url = this.getRequestURL();

            axios.get(url)
            .then(response => {
                if (response.request.readyState == 4 && response.status == 200) {
                    console.log(response);
                    this.results = response.data;
                }
            });
        }
    }
});

// A function that loops through the genres object (in genres.js) and return the ID
function getGenreID(genreString, genres) {
    
    for (const genre of genres) {
	    if (genreString.toLowerCase() == genre.name.toLowerCase()) {
            return genre.id;
        }
    }

    return false;
}

// TEST URL
// 'https://api.themoviedb.org/3/discover/movie?api_key=b330fd993b7bc007e1e8713b02dc45f7&primary_release_year=2016&with_genres=10749&sort_by=popularity.desc'


/* --------------------------------------------- */

var app1 = new Vue({
    el: '#app-1',
    data: {
        message: 'Hello Vue!'
    }
});

var app2 = new Vue({
    el: '#app-2',
    data: {
        message: 'You loaded this page on ' + new Date().toLocaleString()
    }
});

var app3 = new Vue({
    el: '#app-3',
    data: {
        seen: true
    }
});

var app5 = new Vue({
    el: '#app-5',
    data: {
        message: 'Hello Vue.js!'
    },
    methods: {
        reverseMessage: function () {
        this.message = this.message.split('').reverse().join('')
        }
    }
});