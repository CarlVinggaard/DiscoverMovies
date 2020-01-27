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
    computed: ["poster_path", "title", "release_date", "vote_average", "overview"]
});