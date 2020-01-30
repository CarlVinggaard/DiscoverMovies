"use strict"

Vue.use(Vuex)

export default new Vuex.Store({

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