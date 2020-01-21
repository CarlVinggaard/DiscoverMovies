// Define a new component called todo-item
Vue.component('todo-item', {
  props: ['todo'],
  template: '<li>{{ todo.text }}</li>'
});

// Key for the MovieDatabase API
var APIkey = 'b330fd993b7bc007e1e8713b02dc45f7';

const baseURL = 'https://api.themoviedb.org/3/discover/movie?api_key='

// Use XMLHttpRequest to call the API and parse the JSON object
function getData(url, cb) {
    var xhr = new XMLHttpRequest();

    xhr.open("GET", url);
    xhr.send();

    // readyState == 4 means the request is completed, status == 200 means it is successful
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            cb(JSON.parse(this.responseText));
        };
    };
};

fetchDataFromTMDB = function(baseURL) {
    var url = 'baseURL' + 'APIkey' + '&';
};

var app = new Vue({
    el: '#app',
    data: {
        searchString: '',
        year: '',
        minrate: '',
        maxrate: '',
        genre: ''
    }
});







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



var app7 = new Vue({
    el: '#app-7',
    data: {
        groceryList: [
        { id: 0, text: 'Vegetables' },
        { id: 1, text: 'Cheese' },
        { id: 2, text: 'Whatever else humans are supposed to eat' }
        ]
    }
});