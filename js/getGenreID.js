// Loops through the genres object (in genres.js) and returns the ID
function getGenreID(genreString, genres) {
    
    for (const genre of genres) {
	    if (genreString.toLowerCase() == genre.name.toLowerCase()) {
            return genre.id;
        }
    }

    return false;
}