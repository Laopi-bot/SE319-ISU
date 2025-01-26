
/*
<p>Student name : Lawson Port</p>
<p>email : lport@iastate.edu</p>
<p>date : Febuary 26, 2024</p>
*/


fetch("./lport_Activity08MoviesFromJSON.json")
.then(response => response.json())
.then(myMovies => loadMovies(myMovies));

function loadMovies(myMovies){

    var CardMovie = document.getElementById("col");
    var checkboxes = [];
    var cards = [];

    for(var i = 0; i < myMovies.movies.length; i++){
        let title = myMovies.movies[i].title;
        let year = myMovies.movies[i].year;
        let url = myMovies.movies[i].url;
       


        let AddCardMovie = document.createElement("div");
        AddCardMovie.classList.add("col");

        let checkbox = "checkbox" + i.toString();
        let card = "card" + i.toString();

        AddCardMovie.innerHTML = `
        <input type="checkbox" id=${checkbox} class="form-check-input" checked>
        <label for=${checkbox} class="form-check-label">Show Image ${i}</label>


       <div id=${card} class="card shadow-sm">
            <img src=${url} class="card-img-top" alt="..."></img>
            <div class="card-body">
            <p class="card-text"> <strong>${title}</strong>, ${year}</p>
            <div class="d-flex justify-content-between align-items-center">
            <small class="text-body-secondary">9 mins</small>
          </div>
        </div>
      </div>
      `;

        CardMovie.appendChild(AddCardMovie); 

        let cbox = document.getElementById(checkbox);
        checkboxes.push(cbox);

        let ccard = document.getElementById(card);
        cards.push(ccard);

    }

    console.log(checkboxes);
    console.log(cards);
    

    checkboxes.forEach((checkboxParam, index) => {
        console.log(index);
        checkboxParam.addEventListener('change', () => {
          if (checkboxParam.checked) {
              cards[index].style.display = 'block'; // Show the card
          } else {
              cards[index].style.display = 'none'; // Hide the card
          }
        });
      });
   }

