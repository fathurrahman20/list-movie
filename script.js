document.querySelector(".search-button").addEventListener("click", async function(){
    try{
    const inputKeyword = document.querySelector(".input-keyword");
    const movies = await getMovies(inputKeyword.value);
    console.log(movies)
    updateUI(movies);
    } catch (err){
        alert(err);
    }
})

function getMovies(keyword){
    return fetch("http://www.omdbapi.com/?i=tt3896198&apikey=3dcab422&s=" + keyword)
        .then(response => {
            if (!response.ok){
                throw new Error(response.statusText)
            }
            return response.json()
        })
        .then(response => {
            if (response.Response === "False"){
                throw new Error(response.Error)
            }
            return response.Search;
        });
}

function updateUI(movies){
    let cards = "";
    movies.forEach(movie => {
        cards += showCards(movie);
    })
    document.querySelector(".movie-container").innerHTML = cards;
}

document.addEventListener("click", async function (e) {
    if (e.target.classList.contains("modal-detail-button")){
        const imdbid = e.target.dataset.imdbid;
        const detailMovie = await getDetailMovie(imdbid);
        updateUIDetail(detailMovie);
    }
})



function getDetailMovie(imdbid){
    return fetch("http://www.omdbapi.com/?apikey=3dcab422&i=" + imdbid)
            .then(response => response.json())
            .then(md => md)
}

function updateUIDetail(md){
    const movieDetail = showMovieDetail(md);
    document.querySelector(".modal-body").innerHTML = movieDetail;
}




function showCards (movie){
    return `<div class="col-md-4 my-3">
                        <div class="card" style="width: 18rem;">
                            <img src="${movie.Poster}" class="card-img-top" alt="...">
                            <div class="card-body">
                                <h5 class="card-title">${movie.Title}</h5>
                                <h6 class="card-subtitle mb-2 text-muted">${movie.Year}</h6>
                                <a href="#" class="btn btn-primary modal-detail-button" data-bs-toggle="modal" data-bs-target="#movieDetailModal" data-imdbid="${movie.imdbID}">Show Details</a>
                            </div>
                        </div>
                    </div>`
}

function showMovieDetail (md){
    return `<div class="container-fluid">
                <div class="row">
                    <div class="col-md-3">
                        <img src="${md.Poster}" class="img-fluid">
                    </div>
                    <div class="col-md">
                        <ul class="list-group">
                            <li class="list-group-item"><h4>${md.Title} (${md.Year})</h4></li>
                            <li class="list-group-item"><strong>Director : </strong>${md.Director}</li>
                            <li class="list-group-item"><strong>Writer : </strong>${md.Writer}</li>
                            <li class="list-group-item"><strong>Actors : </strong>${md.Actors}</li>
                            <li class="list-group-item"><strong>Plot : </strong><br>${md.Plot}</li>
                        </ul>
                    </div>
                </div>
            </div>`;
}
