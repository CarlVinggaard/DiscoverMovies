// This does something related to Vue
"use strict"

var movieItem = Vue.component("movie-item", {
    template: `<div class="row justify-content-center mx-1">
                    <div class="col-12 col-md-10 col-lg-8 result-item mx-2 py-3 px-4 my-3">
                        <h3>{{item.title}} (year)</h3>
                        <p>Rating</p>
                        <p>Description...</p>
                    </div>
                </div>`,
    props: ["name"]
});

var app = new Vue({
    el: '#app',
    data: {
        searchString: '',
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
        // Create request URL from input
        getRequestURL: function(page) {
            // Key for the MovieDatabase API
            const APIkey = 'b330fd993b7bc007e1e8713b02dc45f7';
            const baseURL = 'https://api.themoviedb.org/3/discover/movie?api_key='
            var url = baseURL + APIkey + '&page=' + page.toString();
            
            if (this.genre) {
                var genreID = getGenreID(this.genre, genres); // Genres are identified with numbers, mapped in object in genres.js
            }

            /*if (searchString) {
                url += '&' + 'with_keywords=' + 'app.searchString;
            }*/

            if (this.releaseYear) {
                url += '&' + 'primary_release_year=' + this.releaseYear;
            }

            if (this.minRating) {
                url += '&' + 'vote_average.lte=' + this.minRating;
            }

            if (genreID) {
                url += '&' + 'with_genres=' + genreID;
            }

            if (this.sortBy) {
                url += '&' + 'sort_by=' + this.sortBy;
            }

            console.log(url);

            return url;
        },
        // Returns an array 5 pages of data from TMDb. There are 20 results on each page.
        getData: function() {
            // The API sends one page with 20 results pr call. Call it 5 times to get the top 100 results.
            var dataArr = new Array();
            var url = {};

            // Create the 5 URLs
            url.page1 = this.getRequestURL(1);
            url.page2 = this.getRequestURL(2);
            url.page3 = this.getRequestURL(3);
            url.page4 = this.getRequestURL(4);
            url.page5 = this.getRequestURL(5);

            console.log(url);

            axios.all([axios.get(url.page1), axios.get(url.page2), axios.get(url.page3), axios.get(url.page4), axios.get(url.page5)])
            .then(response => {
                console.log(response);
                this.results.page1 = response[0].data.results;
                this.results.page2 = response[1].data.results;
                this.results.page3 = response[2].data.results;
                this.results.page4 = response[3].data.results;
                this.results.page5 = response[4].data.results;
            })
            .catch(err =>
                console.log(err)
            );
        }
    }
});

/* --------------------------------------------- */

/*  */

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