getData: function(method) {
            // The API sends one page with 20 results pr call. Call it 5 times to get the top 100 results.
            let url = {};

            // Create the 5 URLs
            if (method == 'discover') {
                url.page1 = this.getRequestURLforDiscover(1);
                url.page2 = this.getRequestURLforDiscover(2);
                url.page3 = this.getRequestURLforDiscover(3);
                url.page4 = this.getRequestURLforDiscover(4);
                url.page5 = this.getRequestURLforDiscover(5);
            } else if (method == 'search') {
                url.page1 = this.getRequestURLforSearch(1);
                url.page2 = this.getRequestURLforSearch(2);
                url.page3 = this.getRequestURLforSearch(3);
                url.page4 = this.getRequestURLforSearch(4);
                url.page5 = this.getRequestURLforSearch(5);
            } else {
                alert("The function 'getData()' was called with an invalid parameter.")
            }

            console.log(url);

            axios.all([axios.get(url.page1), axios.get(url.page2), axios.get(url.page3), axios.get(url.page4), axios.get(url.page5)])
            .then(response => {
                console.log(response);
                this.results.page1 = response[0].data.results;
                this.results.page2 = response[1].data.results;
                this.results.page3 = response[2].data.results;
                this.results.page4 = response[3].data.results;
                this.results.page5 = response[4].data.results;

                this.totalResults = response[0].data.total_results;

                this.queried = true;
            })
            .catch(err =>
                console.log(err)
            );
        }