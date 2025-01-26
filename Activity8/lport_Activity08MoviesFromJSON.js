
   // <p>Student name : Lawson Port</p>
    //<p>email : lport@iastate.edu</p>
   // <p>date : Febuary 21, 2024</p>
  
   fetch("./lport_Activity08MoviesFromJSON.json")
   .then(response => response.json())
   .then(myMovies => loadMovies(myMovies));


   function loadMovies(myMovies){

    var mainContainer = document.getElementById("goodmovies");
    console.log(mainContainer);

    for(var i = 0; i < myMovies.movies.length; i++){
        let title = myMovies.movies[i].title;
        let year = myMovies.movies[i].year;
        let url = myMovies.movies[i].url;
        
        let div = document.createElement("div");
        div.innerHTML = `
        <h3> ${title} </h3>
        ${year} <br>
        <img src=${url} width="200"> <br> <br>
        `;

        mainContainer.appendChild(div);
        console.log(div);
    }
   }