// The Vue component used to render a movie item in the results list.
var movieItem = Vue.component("movie-item", {
    template: `<v-row justify="center">
                    <v-col cols="12" md="10" lg="8" class="result-item elevation-8 py-3 px-4 my-2">
                        <v-row>
                            <v-col v-if="poster_path" cols="4" class="img-container">
                                <img :src="'https://image.tmdb.org/t/p/w500' + poster_path">
                            </v-col>
                            <v-col cols="8">
                                <h4 class="display-1">{{title}} <span v-if="release_date" class="headline">({{release_date.slice(0, 4)}})</span></h4>
                                <h5 class="title" v-if="vote_average">Rating: <span class="title font-weight-black">{{vote_average}}</span></h5>
                                <div v-if="overview">
                                    <h6 class="body-1 font-weight-bold">Summary</h6>
                                    <p class="body-1 font-weight-light">{{overview}}</p>
                                </div>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>`,
    props: ["poster_path", "title", "release_date", "vote_average", "overview"]
});