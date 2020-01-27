Vue.use(Vuex)

export default new Vuex.Store({

    state: {
        results: '',
        totalResults: 0,
        page: 1,
        queried: false
    },

    actions: {
        // Returns a page with 20 results from TMDb. Method can be either 'search' or 'discover'.
        fetchData(page, method) {
            let url = {};

            // Create the URL
            if (method == 'discover') {
                url = getRequestURLforDiscover(page);
            } else if (method == 'search') {
                url = getRequestURLforSearch(page);
            } else {
                alert("The function 'fetchData()' was called with an invalid 'method' argument.")
            }

            console.log(url);

            axios.get(url)
            .then(response => {
                console.log(response);
                
                commit('setResults', response.data.results);
                commit('setTotalResult', response.data.total_results);
                commit('setQueryStatus', true); // Used for displaying error message for invalid queries.
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

        setTotalResults(state, newState) {
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