// The Vue component used to render a movie item in the results list.
var movieItem = Vue.component("movie-item", {
    template: `<v-row justify="center">
                    <v-col cols="12" md="10" lg="8" class="result-item elevation-8 py-3 px-4 my-2">
                        <v-row>
                            <v-col v-if="poster_path" cols="4" class="img-container">
                                <img :src="'https://image.tmdb.org/t/p/w500' + poster_path">
                            </v-col>
                            <v-col cols="8">
                                <h4>{{title}} <span v-if="release_date" class="year">({{release_date.slice(0, 4)}})</span></h4>
                                <h5 v-if="vote_average">Rating: {{vote_average}}</h5>
                                <div v-if="overview">
                                    <h6>Summary</h6>
                                    <p>{{overview}}</p>
                                </div>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>`,
    props: ["poster_path", "title", "release_date", "vote_average", "overview"]
});