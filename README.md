# Discover Movies -- Search the Movie Database (tMDb) for movies!

Discover Movies is a simple web application that allows users to search movies in the Movie Database (tMDb).

It was developed with the front end programming framework Vue.

My interest in learning to work with the different frameworks and libraries (see 'technology') is a big part of 
my motivation for this project.

The Movie Database: https://www.themoviedb.org/

## Features

- The app features two different search methods; 'search by title' and 'search by info'. They are separate because they use two different 
endpoints in the tMDb API ('/search' and '/discover'). They are divided into separate tabs (Vuetify's 'v-tabs' component was very useful).

- Vue's 'v-model' directive keeps track of all user input in the text fields.

- The Vue app contains methods for stringing together the and URL and fetching the data from the API.

- VueX stores all the result data and manages all mutations.

- Currently, the app displays title, year, rating, poster image and summary of every movie.

- The API returns one page with 20 results per request, so pagination is implemented with simply making a new request with every page change.

## Technology

The Movie Database API: https://www.themoviedb.org/documentation/api
    - This app uses the endpoints '/search' and '/discover'

Vue 2.X: https://vuejs.org/
    - The main front end framework. Includes many useful features for rendering the UI based on data.

VueX: https://vuex.vuejs.org/
    - State management framework for Vue. Used to keep track of search results, pages and other variables. Was very helpful in debugging.

Vuetify v2.2.8: https://vuetifyjs.com/
    - Component library for Vue. Is based on the design guidelines of Google's Material Design framework.

Axios: https://github.com/axios/axios
    - HTTP request library.

## Deployment

Github Pages: https://carlvinggaard.github.io/DiscoverMovies/