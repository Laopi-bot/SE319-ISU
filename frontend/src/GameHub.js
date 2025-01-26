import React, { useState, useEffect } from "react";
import './styles/GameHub.css';
import './styles/navbar.css';
import './styles/style.css';
import './data.json';

const customData = require('./data.json');

function loadBootstrapCSS() {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css';
  link.integrity = 'sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN';
  link.crossOrigin = 'anonymous';
  document.head.appendChild(link);
}

// Function to dynamically load Bootstrap JS bundle
function loadBootstrapJS() {
  const script = document.createElement('script');
  script.src = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js';
  script.integrity = 'sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL';
  script.crossOrigin = 'anonymous';
  document.body.appendChild(script);
}

// Call the functions to load Bootstrap CSS and JS
loadBootstrapCSS();
loadBootstrapJS();

function GameHub() {
  const [users, setUsers] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [games, setGames] = useState([]);
  const [idInput, setIdInput] = useState("");
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [currentUser, setCurrentUser] = useState(null);

 {/*
  useEffect(() => {
    getAllUsers();
    getAllReviews();
    getAllGames();
  }, []);
*/}
   
  function getAllUsers() {
    fetch("http://localhost:8081/listUsers")
      .then((response) => response.json())
      .then((data) => {
        console.log("Show List of Users:");
        console.log(data);
        setUsers(data);
      });
  }
{/*
  function getAllReviews() {
    fetch("http://localhost:8081/listReviews")
      .then((response) => response.json())
      .then((data) => {
        console.log("Show List of Reviews:");
        console.log(data);
        setReviews(data);
      });
  }

  function getAllGames() {
    fetch("http://localhost:8081/listGames")
      .then((response) => response.json())
      .then((data) => {
        console.log("Show List of Games:");
        console.log(data);
        setGames(data);
      });
  }
*/}

function addUser() {
  try {
    const existingUser = users.find(
      (user) => user.user.toLowerCase() === username.toLowerCase()
    );
    if (existingUser) {
      console.log("User already exists");
      if (existingUser.password === password) {
        setCurrentUser(existingUser);
      } else {
        console.log("Password is Incorrect");
        document.getElementById("RED").style.backgroundColor = "red";
      }
      return;
    }

    const response = fetch("http://localhost:8081/addUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      console.log("User added successfully");
      getAllUsers();
      setUsername("");
      setPassword("");
      const newUser = users.find((user) => user.user === username);
      setCurrentUser(newUser);
    } else {
      console.error("Failed to add user");
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

function handleUsernameChange(event) {
  setUsername(event.target.value);
}

function handlePasswordChange(event) {
  setPassword(event.target.value);
}

  function getUserById(id) {
    fetch(`http://localhost:8081/users/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("User found by ID:");
        console.log(data);
        // Handle the data as needed
      });
  }

  function getReviewById(id) {
    fetch(`http://localhost:8081/reviews/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Review found by ID:");
        console.log(data);
        // Handle the data as needed
      });
  }

  function getGameById(id) {
    fetch(`http://localhost:8081/games/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Game found by ID:");
        console.log(data);
        // Handle the data as needed
      });
  }

  function getReviewsByGameId(id) {
    fetch(`http://localhost:8081/reviews/by_game/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(`Reviews for game with ID ${id}:`);
        console.log(data);
        // Handle the data as needed
      });
  }

  function getReviewsByUserId(id) {
    fetch(`http://localhost:8081/reviews/by_user/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(`Reviews by user with ID ${id}:`);
        console.log(data);
        // Handle the data as needed
      });
  }

  function renderStars(rating) {
    const numStars = Math.round(rating);
    const stars = [];
    for (let i = 0; i < numStars; i++) {
      stars.push(<span key={i}>⭐</span>);
    }
    return stars;
  }

  function renderBlueStars(rating) {
    const numStars = Math.round(rating);
    const stars = [];
    for (let i = 0; i < numStars; i++) {
      stars.push(<span key={i} class ="stars">✯</span>);
    }
    return stars;
  }


  const pages = [
    {//0: homepage
      title: "HomeScreen",
      component: (
        <div>
        <head>
    <meta charset="UTF-8"></meta>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
    <title>Homepage</title>

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous"></link>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>
    {/*<!-- Combined Nav StyleSheet: -->*/}
        <link href="styles/navbar.css" rel="stylesheet"></link>
</head>
        <body class = "text-bg-dark">

        {/* <!--**********************HEADER**********************-->*/}
        <div class="cover-container d-flex w-100 mx-auto flex-column ">
          <header class="text-bg-dark p-3">
          <div>
            <h3 class="nav-title float-md-start mb-0">GameHub&nbsp;</h3>{renderBlueStars(5)}

            <nav class="nav nav-masthead justify-content-center float-md-end">
            <button class="btn btn-dark" key={0} onClick={() => navigateTo(0)}>Home Screen</button>
            <button class="btn btn-dark" key={2} onClick={() => navigateTo(2)}>Credits</button>
            <button class="btn btn-dark" key={3} onClick={() => navigateTo(3)}>Dashboard</button>
            <button class="btn btn-info" key={1} onClick={() => navigateTo(1)}>Sign-in!</button>
            </nav>
          </div>
        </header>
        <div class="nav-head mb-auto"></div>

    {/*<!--**********************HEADER**********************-->*/}
    <div class="spacer">Click on an image to learn more</div> 
    <div class="album bg-body-tertiary">
      <div class="homepageContainer ">

        <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
          <div class="col">
            <div class="card shadow-sm"> 
              <img class = "border" src={require('./images/minecraft_2.jpg')} onClick={() => navigateTo(5)} alt= "minecraft"></img>
          </div>
          </div>
          <div class="col">
            <div class="card shadow-sm">
              <img  class = "border" src={require('./images/rs_2.jpg')} onClick={() => navigateTo(6)} alt= "runescape"></img>
            </div>
          </div>
          <div class="col">
            <div class="card shadow-sm">
              <img  class = "border" src={require('./images/subnautica_2.webp')}  onClick={() => navigateTo(7)} alt = "subnautica"></img>
            </div>
          </div>
  
          <div class="col">
            <div class="card shadow-sm">
              <img  class = "border" src={require('./images/totk_2.jpg')} onClick={() => navigateTo(8)}  alt = "TOTK"></img>
            </div>
          </div>
           <div class="col">
            <div class="card shadow-sm">
              <img  class = "border" src={require('./images/valo_2.jpg')} onClick={() => navigateTo(9)}  alt = "VALO"></img>
            </div>
          </div>
          <div class="col">
            <div class="card shadow-sm">
              <img class = "border" src={require('./images/lg_3.jpg')} onClick={() => navigateTo(4)}  alt = "Lol"></img>
            </div>
          </div> 

        </div>
      </div>
      </div>

     <div class="spacer"></div> 
          {/*<!--**********************FOOTER**********************-->*/}
  <footer class="text-bg-dark mt-auto text-white-50 text-center">
    <p>Made by SE student Lawson Port and Com S student Michael Linker at Iowa State University</p>

    </footer>
    </div>
    </body>
        </div>
      ),
    },




    {//1: sign in
      title: "Sign_in",
      component: (
        <div>
        <head>
    <meta charset="UTF-8"></meta>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
    <title>Sign_in</title>

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous"></link>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>
    {/*<!-- Combined Nav StyleSheet: -->*/}
        <link href="styles/navbar.css" rel="stylesheet"></link>
</head>
        <body class = "text-bg-dark">

        {/* <!--**********************HEADER**********************-->*/}
        <div class="cover-container d-flex w-100 mx-auto flex-column ">
          <header class="text-bg-dark p-3">
          <div>
            <h3 class="nav-title float-md-start mb-0">Sign in</h3>
            <nav class="nav nav-masthead justify-content-center float-md-end">
            <button class="btn btn-dark" key={0} onClick={() => navigateTo(0)}>Home Screen</button>
            <button class="btn btn-dark" key={2} onClick={() => navigateTo(2)}>Credits</button>
            <button class="btn btn-dark" key={3} onClick={() => navigateTo(3)}>Dashboard</button>
            <button class="btn btn-info" key={1} onClick={() => navigateTo(1)}>Sign-in!</button>
            </nav>
          </div>
        </header>
        <div class="nav-head mb-auto"></div>
        <div class="normalSpacer"></div> 

        <div className="container" style={{ backgroundColor: "#20c8e1" }}>
    <div className="row justify-content-center mt-5">
      <div className="col-md-6">
        <div className="card">
          <div className="card-body">
            <h2 className="text-center mb-4">Sign up / Login</h2>
            <div className="form-group">
              <label>Username:</label>
              <input
                type="text"
                className="form-control"
                value={username}
                onChange={handleUsernameChange}
              />
            </div>
            <div className="form-group">
              <label>Password:</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={handlePasswordChange}
              />
            </div>
            <button
              className="btn btn-primary btn-block"
              onClick={addUser}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

    </div>
    <footer class="text-bg-dark mt-auto text-white-50 text-center">
    <p>Made by Lawson Port and Michael Linker at Iowa State University</p>

    </footer>
    </body>
        </div>
      ),
    },





    {//2: credits
      title: "Credits",
      component: (
        <div>
         <head><script src="../assets/js/color-modes.js"></script>

<meta charset="utf-8"></meta>
<meta name="viewport" content="width=device-width, initial-scale=1"></meta>
<meta name="description" content=""></meta>
<meta name="author" content="Mark Otto, Jacob Thornton, and Bootstrap contributors"></meta>
<meta name="generator" content="Hugo 0.118.2"></meta>
<title>Credits</title>

<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous"></link>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>

{/*<!-- Combined Nav StyleSheet: -->*/}
    <link href="styles/navbar.css" rel="stylesheet"></link>

</head>
<body class="d-flex h-100 text-center text-bg-dark">
  
    {/*<!--**********************HEADER**********************-->*/}
    <div class="cover-container d-flex w-100 mx-auto flex-column ">
      <header class="text-bg-dark p-3">
      <div>
      <h3 class="nav-title float-md-start mb-0">Credits</h3>
            <nav class="nav nav-masthead justify-content-center float-md-end">
            <button class="btn btn-dark" key={0} onClick={() => navigateTo(0)}>Home Screen</button>
            <button class="btn btn-dark" key={2} onClick={() => navigateTo(2)}>Credits</button>
            <button class="btn btn-dark" key={3} onClick={() => navigateTo(3)}>Dashboard</button>
            <button class="btn btn-info" key={1} onClick={() => navigateTo(1)}>Sign-in!</button>
            </nav>
      </div>
    </header>
    <div class="nav-head mb-auto"></div>

{/*<!--**********************HEADER**********************-->*/}
<div class="normalSpacer"></div> 

<main class="px-3">
<h1>Michael Linker</h1>
<p class="lead"><section style={{color: "#52D1DC"}}>SE/ComS319 Construction of User Interfaces, Spring 2024</section> 05/02/2024</p>
<p class="lead">
  <a href="https://mail.google.com/mail/?view=cm&fs=1&to=mlinker@iastate.edu&su=Michael Linker Midterm" class=" fw-bold border-white">mlinker@iastate.edu</a>
</p>
</main>

<main class="px-3">
<h1>Lawson Port</h1>
<p class="lead"> <section style={{color: "#52D1DC"}}>SE/ComS319 Construction of User Interfaces, Spring 2024</section>05/02/2024</p>
<p class="lead">
  <a href="https://mail.google.com/mail/?view=cm&fs=1&to=lport@iastate.edu&su=Lawson Port Midterm" class="fw-bold border-white">lport@iastate.edu</a>
</p>
</main>

<main class="px-3">
<h1>Professors:</h1>
<p class="lead"> <section style={{color: "#52D1DC"}}>Dr. Abraham N. Aldaco Gastelum</section>Ali Jannesari</p>
<p class="lead">
  <a href="https://mail.google.com/mail/?view=cm&fs=1&to=jannesar@iastate.edu&su=Ali SE 319" class="fw-bold border-white">jannesar@iastate.edu</a>
</p>
<p class="lead">
  <a href="https://mail.google.com/mail/?view=cm&fs=1&to=aaldaco@iastate.edu&su=Adalco SE 319" class="fw-bold border-white">aaldaco@iastate.edu</a>
</p>
</main>

<div class="normalSpacer"></div>  
<div class="normalSpacer"></div> 

          {/*<!--**********************FOOTER**********************-->*/}
          <footer class="text-bg-dark mt-auto text-white-50 text-center">
    <p>Made by SE student Lawson Port and Com S student Michael Linker at Iowa State University</p>
    </footer>
    <div class="normalSpacer"></div> 
</div>
</body>
        </div>
      ),
    },
    


    {//3: Dashboard
      title: "Dashboard", //TODO
      component: (
        <div>
        <head>
    <meta charset="UTF-8"></meta>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
    <title>Homepage</title>

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous"></link>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>
    {/*<!-- Combined Nav StyleSheet: -->*/}
        <link href="styles/navbar.css" rel="stylesheet"></link>
</head>
        <body class = "text-bg-dark">

        {/* <!--**********************HEADER**********************-->*/}
        <div class="cover-container d-flex w-100 mx-auto flex-column ">
          <header class="text-bg-dark p-3">
          <div>
            <h3 class="nav-title float-md-start mb-0">Dashboard: Your reviews all in one place!</h3>

            <nav class="nav nav-masthead justify-content-center float-md-end">
            <button class="btn btn-dark" key={0} onClick={() => navigateTo(0)}>Home Screen</button>
            <button class="btn btn-dark" key={2} onClick={() => navigateTo(2)}>Credits</button>
            <button class="btn btn-dark" key={3} onClick={() => navigateTo(3)}>Dashboard</button>
            <button class="btn btn-info" key={1} onClick={() => navigateTo(1)}>Sign-in!</button>
            </nav>
          </div>
        </header>
        <div class="nav-head mb-auto"></div>
        </div>
    </body>
        </div>
      ),
    },



    {//4: League of Legends page
      title: "LOL",
  
      component: (
        <div>
          <meta charset="utf-8"></meta>
          <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
          <meta name="description" content=""></meta>
          <meta name="author" content="Mark Otto, Jacob Thornton, and Bootstrap contributors"></meta>
          <meta name="generator" content="Hugo 0.122.0"></meta>
          <title>League</title>
    
          <link rel="canonical" href="https://getbootstrap.com/docs/5.3/examples/carousel/"></link>
    
          <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous"></link>
          
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@docsearch/css@3"></link>
          <link href="../assets/dist/css/bootstrap.min.css" rel="stylesheet"></link>
    
          {/* Custom styles for this template */}
          <link href="styles/style.css" rel="stylesheet"></link>
          <link href="styles/navbar.css" rel="stylesheet"></link>
    
          <body>
    
            <div class="cover-container d-flex w-100 mx-auto flex-column ">
              <header class="text-bg-dark p-3">
                <div>
                  <h3 class="nav-title float-md-start mb-0">Game Page</h3>
                  <nav class="nav nav-masthead justify-content-center float-md-end">
                  <button class="btn btn-dark" key={0} onClick={() => navigateTo(0)}>Home Screen</button>
                  <button class="btn btn-dark" key={2} onClick={() => navigateTo(2)}>Credits</button>
                  <button class="btn btn-dark" key={3} onClick={() => navigateTo(3)}>Dashboard</button>
                  <button class="btn btn-info" key={1} onClick={() => navigateTo(1)}>Sign-in!</button>
                  </nav>
                </div>
              </header>
            </div>
            <div class="nav-head mb-auto"></div>
    
            <main>
    
              <div id="myCarousel" class="carousel slide mb-6" data-bs-ride="carousel">
                <div class="carousel-indicators">
                  <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                  <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
                  <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div>
                <div class="carousel-inner">
                  <div class="carousel-item active">
                    <img src={require('./images/lg_3.jpg')} alt="league_2" style={{height: "100%", width: "100%"}}></img>
                    <div class="container">
                      <div class="carousel-caption text-start">
                        <h1>League of Legends</h1>
                        <p class="opacity-75">Strategical MOBA</p>
                        <p><a class="btn btn-lg btn-primary" href="https://www.leagueoflegends.com/en-us/">Sign Up</a></p>
                      </div>
                    </div>
                  </div>
                  <div class="carousel-item">
                    <img src={require('./images/lg_1.jpg')} alt="lg_1" style={{ height: '100%', width: '100%' }}></img>
                    <div class="container">
                      <div class="carousel-caption">
                      </div>
                    </div>
                  </div>
                  <div class="carousel-item">
                    <img src={require('./images/league_2.webp')} alt="lg_3" style={{ height: '100%', width: '100%' }}></img>
                    <div class="container">
                      <div class="carousel-caption text-end">
                      </div>
                    </div>
                  </div>
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#myCarousel" data-bs-slide="prev">
                  <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#myCarousel" data-bs-slide="next">
                  <span class="carousel-control-next-icon" aria-hidden="true"></span>
                  <span class="visually-hidden">Next</span>
                </button>
              </div>
    
              <div class="wrap_2"> {/*<!--stuff from json -->*/} 
                <div class ="center">
                  <h1 style={{ color: "#52D1DC"}}>Game Description</h1>
                  <p>{customData.games[4].description}</p>
                </div>
              </div>
    
              <div class="wrap">
                <div class="left">
                  <h1 style={{ color: "#52D1DC"}}>Lawson's Review</h1>
                  {customData.games[4].lawsons_review}
                </div>
                <div class="right">
                  <h1 style={{ color: "#52D1DC"}}>Michael's Review</h1>
                  {customData.games[4].michaels_review}
                </div>
              </div>

  
   {/*} <!-- FOOTER -->*/}
   <footer class="text-bg-dark mt-auto text-white-50 text-center">
    <p>Made by SE student Lawson Port and Com S student Michael Linker at Iowa State University</p>

    </footer>
    </main>
    <script src="../assets/dist/js/bootstrap.bundle.min.js"></script>
    
    </body>
    </div>
      ),
    },

     {//5: Minecraft page
      title: "Minecraft",
  
      component: (
        <div>
          <meta charset="utf-8"></meta>
          <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
          <meta name="description" content=""></meta>
          <meta name="author" content="Mark Otto, Jacob Thornton, and Bootstrap contributors"></meta>
          <meta name="generator" content="Hugo 0.122.0"></meta>
          <title>League</title>
    
          <link rel="canonical" href="https://getbootstrap.com/docs/5.3/examples/carousel/"></link>
    
          <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous"></link>
          
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@docsearch/css@3"></link>
          <link href="../assets/dist/css/bootstrap.min.css" rel="stylesheet"></link>
    
          {/* Custom styles for this template */}
          <link href="styles/style.css" rel="stylesheet"></link>
          <link href="styles/navbar.css" rel="stylesheet"></link>
    
          <body>
    
            <div class="cover-container d-flex w-100 mx-auto flex-column ">
              <header class="text-bg-dark p-3">
                <div>
                  <h3 class="nav-title float-md-start mb-0">Game Page</h3>
                  <nav class="nav nav-masthead justify-content-center float-md-end">
                  <button class="btn btn-dark" key={0} onClick={() => navigateTo(0)}>Home Screen</button>
                  <button class="btn btn-dark" key={2} onClick={() => navigateTo(2)}>Credits</button>
                  <button class="btn btn-dark" key={3} onClick={() => navigateTo(3)}>Dashboard</button>
                  <button class="btn btn-info" key={1} onClick={() => navigateTo(1)}>Sign-in!</button>
                  </nav>
                </div>
              </header>
            </div>
            <div class="nav-head mb-auto"></div>
    
            <main>
    
              <div id="myCarousel" class="carousel slide mb-6" data-bs-ride="carousel">
                <div class="carousel-indicators">
                  <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                  <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
                  <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div>
                <div class="carousel-inner">
                  <div class="carousel-item active">
                    <img src={require('./images/minecraft_1.jpg')} alt="minecraft1" style={{height: "100%", width: "100%"}}></img>
                    <div class="container">
                      <div class="carousel-caption text-start">
                        <h1>Minecraft</h1>
                        <p class="opacity-75">The classic survival game</p>
                        <p><a class="btn btn-lg btn-primary" href="https://www.minecraft.net/en-us">Sign Up</a></p>
                      </div>
                    </div>
                  </div>
                  <div class="carousel-item">
                    <img src={require('./images/minecraft_2.jpg')} alt="minecraft2" style={{ height: '100%', width: '100%' }}></img>
                    <div class="container">
                      <div class="carousel-caption">
                      </div>
                    </div>
                  </div>
                  <div class="carousel-item">
                    <img src={require('./images/minecraft_3.jpg')} alt="minecraft3" style={{ height: '100%', width: '100%' }}></img>
                    <div class="container">
                      <div class="carousel-caption text-end">
                      </div>
                    </div>
                  </div>
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#myCarousel" data-bs-slide="prev">
                  <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#myCarousel" data-bs-slide="next">
                  <span class="carousel-control-next-icon" aria-hidden="true"></span>
                  <span class="visually-hidden">Next</span>
                </button>
              </div>
    
              <div class="wrap_2"> {/*<!--stuff from json -->*/} 
                <div class ="center">
                  <h1 style={{ color: "#52D1DC"}}>Game Description</h1>
                  <p>{customData.games[2].description}</p>
                </div>
              </div>
    
              <div class="wrap">
                <div class="left">
                  <h1 style={{ color: "#52D1DC"}}>Lawson's Review</h1>
                  {customData.games[2].lawsons_review}
                </div>
                <div class="right">
                  <h1 style={{ color: "#52D1DC"}}>Michael's Review</h1>
                  {customData.games[2].michaels_review}
                </div>
              </div>

  
   {/*} <!-- FOOTER -->*/}
   <footer class="text-bg-dark mt-auto text-white-50 text-center">
    <p>Made by SE student Lawson Port and Com S student Michael Linker at Iowa State University</p>

    </footer>
    </main>
    <script src="../assets/dist/js/bootstrap.bundle.min.js"></script>
    
    </body>
    </div>
      ),
    },


     {//6: Runescape page
      title: "Runescape",
  
      component: (
        <div>
          <meta charset="utf-8"></meta>
          <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
          <meta name="description" content=""></meta>
          <meta name="author" content="Mark Otto, Jacob Thornton, and Bootstrap contributors"></meta>
          <meta name="generator" content="Hugo 0.122.0"></meta>
          <title>League</title>
    
          <link rel="canonical" href="https://getbootstrap.com/docs/5.3/examples/carousel/"></link>
    
          <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous"></link>
          
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@docsearch/css@3"></link>
          <link href="../assets/dist/css/bootstrap.min.css" rel="stylesheet"></link>
    
          {/* Custom styles for this template */}
          <link href="styles/style.css" rel="stylesheet"></link>
          <link href="styles/navbar.css" rel="stylesheet"></link>
    
          <body>
    
            <div class="cover-container d-flex w-100 mx-auto flex-column ">
              <header class="text-bg-dark p-3">
                <div>
                  <h3 class="nav-title float-md-start mb-0">Game Page</h3>
                  <nav class="nav nav-masthead justify-content-center float-md-end">
                  <button class="btn btn-dark" key={0} onClick={() => navigateTo(0)}>Home Screen</button>
                  <button class="btn btn-dark" key={2} onClick={() => navigateTo(2)}>Credits</button>
                  <button class="btn btn-dark" key={3} onClick={() => navigateTo(3)}>Dashboard</button>
                  <button class="btn btn-info" key={1} onClick={() => navigateTo(1)}>Sign-in!</button>
                  </nav>
                </div>
              </header>
            </div>
            <div class="nav-head mb-auto"></div>
    
            <main>
    
              <div id="myCarousel" class="carousel slide mb-6" data-bs-ride="carousel">
                <div class="carousel-indicators">
                  <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                  <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
                  <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div>
                <div class="carousel-inner">
                  <div class="carousel-item active">
                    <img src={require('./images/rs_1.jpg')} alt="rs1" style={{height: "100%", width: "100%"}}></img>
                    <div class="container">
                      <div class="carousel-caption text-start">
                        <h1>Runescape</h1>
                        <p class="opacity-75">Fantasy MMORPG</p>
                        <p><a class="btn btn-lg btn-primary" href="https://play.runescape.com/">Sign Up</a></p>
                      </div>
                    </div>
                  </div>
                  <div class="carousel-item">
                    <img src={require('./images/rs_2.jpg')} alt="rs2" style={{ height: '100%', width: '100%' }}></img>
                    <div class="container">
                      <div class="carousel-caption">
                      </div>
                    </div>
                  </div>
                  <div class="carousel-item">
                    <img src={require('./images/rs_3.jpg')} alt="rs3" style={{ height: '100%', width: '100%' }}></img>
                    <div class="container">
                      <div class="carousel-caption text-end">
                      </div>
                    </div>
                  </div>
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#myCarousel" data-bs-slide="prev">
                  <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#myCarousel" data-bs-slide="next">
                  <span class="carousel-control-next-icon" aria-hidden="true"></span>
                  <span class="visually-hidden">Next</span>
                </button>
              </div>
    
              <div class="wrap_2"> {/*<!--stuff from json -->*/} 
                <div class ="center">
                  <h1 style={{ color: "#52D1DC"}}>Game Description</h1>
                  <p>{customData.games[5].description}</p>
                </div>
              </div>
    
              <div class="wrap">
                <div class="left">
                  <h1 style={{ color: "#52D1DC"}}>Lawson's Review</h1>
                  {customData.games[5].lawsons_review}
                </div>
                <div class="right">
                  <h1 style={{ color: "#52D1DC"}}>Michael's Review</h1>
                  {customData.games[5].michaels_review}
                </div>
              </div>

  
   {/*} <!-- FOOTER -->*/}
   <footer class="text-bg-dark mt-auto text-white-50 text-center">
    <p>Made by SE student Lawson Port and Com S student Michael Linker at Iowa State University</p>

    </footer>
    </main>
    <script src="../assets/dist/js/bootstrap.bundle.min.js"></script>
    
    </body>
    </div>
      ),
    },


    {//7: Subnautica page
      title: "Subnautica",
  
      component: (
        <div>
          <meta charset="utf-8"></meta>
          <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
          <meta name="description" content=""></meta>
          <meta name="author" content="Mark Otto, Jacob Thornton, and Bootstrap contributors"></meta>
          <meta name="generator" content="Hugo 0.122.0"></meta>
          <title>League</title>
    
          <link rel="canonical" href="https://getbootstrap.com/docs/5.3/examples/carousel/"></link>
    
          <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous"></link>
          
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@docsearch/css@3"></link>
          <link href="../assets/dist/css/bootstrap.min.css" rel="stylesheet"></link>
    
          {/* Custom styles for this template */}
          <link href="styles/style.css" rel="stylesheet"></link>
          <link href="styles/navbar.css" rel="stylesheet"></link>
    
          <body>
    
            <div class="cover-container d-flex w-100 mx-auto flex-column ">
              <header class="text-bg-dark p-3">
                <div>
                  <h3 class="nav-title float-md-start mb-0">Game Page</h3>
                  <nav class="nav nav-masthead justify-content-center float-md-end">
                  <button class="btn btn-dark" key={0} onClick={() => navigateTo(0)}>Home Screen</button>
                  <button class="btn btn-dark" key={2} onClick={() => navigateTo(2)}>Credits</button>
                  <button class="btn btn-dark" key={3} onClick={() => navigateTo(3)}>Dashboard</button>
                  <button class="btn btn-info" key={1} onClick={() => navigateTo(1)}>Sign-in!</button>
                  </nav>
                </div>
              </header>
            </div>
            <div class="nav-head mb-auto"></div>
    
            <main>
    
              <div id="myCarousel" class="carousel slide mb-6" data-bs-ride="carousel">
                <div class="carousel-indicators">
                  <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                  <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
                  <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div>
                <div class="carousel-inner">
                  <div class="carousel-item active">
                    <img src={require('./images/subnautica_3.jpg')} alt="sub1" style={{height: "100%", width: "100%"}}></img>
                    <div class="container">
                      <div class="carousel-caption text-start">
                        <h1>Subnautica</h1>
                        <p class="opacity-75">Open World Underwater Survival Game</p>
                        <p><a class="btn btn-lg btn-primary" href="https://store.steampowered.com/app/264710/Subnautica/">Buy Today</a></p>
                      </div>
                    </div>
                  </div>
                  <div class="carousel-item">
                    <img src={require('./images/subnautica_2.webp')} alt="sub2" style={{ height: '100%', width: '100%' }}></img>
                    <div class="container">
                      <div class="carousel-caption">
                      </div>
                    </div>
                  </div>
                  <div class="carousel-item">
                    <img src={require('./images/subnautica_1.jpg')} alt="sub3" style={{ height: '100%', width: '100%' }}></img>
                    <div class="container">
                      <div class="carousel-caption text-end">
                      </div>
                    </div>
                  </div>
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#myCarousel" data-bs-slide="prev">
                  <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#myCarousel" data-bs-slide="next">
                  <span class="carousel-control-next-icon" aria-hidden="true"></span>
                  <span class="visually-hidden">Next</span>
                </button>
              </div>
    
              <div class="wrap_2"> {/*<!--stuff from json -->*/} 
                <div class ="center">
                  <h1 style={{ color: "#52D1DC"}}>Game Description</h1>
                  <p>{customData.games[0].description}</p>
                </div>
              </div>
    
              <div class="wrap">
                <div class="left">
                  <h1 style={{ color: "#52D1DC"}}>Lawson's Review</h1>
                  {customData.games[0].lawsons_review}
                </div>
                <div class="right">
                  <h1 style={{ color: "#52D1DC"}}>Michael's Review</h1>
                  {customData.games[0].michaels_review}
                </div>
              </div>

  
   {/*} <!-- FOOTER -->*/}
   <footer class="text-bg-dark mt-auto text-white-50 text-center">
    <p>Made by SE student Lawson Port and Com S student Michael Linker at Iowa State University</p>

    </footer>
    </main>
    <script src="../assets/dist/js/bootstrap.bundle.min.js"></script>
    
    </body>
    </div>
      ),
    },

    {//8: TOTK page
    title: "TOTK",
  
    component: (
      <div>
        <meta charset="utf-8"></meta>
        <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
        <meta name="description" content=""></meta>
        <meta name="author" content="Mark Otto, Jacob Thornton, and Bootstrap contributors"></meta>
        <meta name="generator" content="Hugo 0.122.0"></meta>
        <title>League</title>
  
        <link rel="canonical" href="https://getbootstrap.com/docs/5.3/examples/carousel/"></link>
  
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous"></link>
        
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@docsearch/css@3"></link>
        <link href="../assets/dist/css/bootstrap.min.css" rel="stylesheet"></link>
  
        {/* Custom styles for this template */}
        <link href="styles/style.css" rel="stylesheet"></link>
        <link href="styles/navbar.css" rel="stylesheet"></link>
  
        <body>
  
          <div class="cover-container d-flex w-100 mx-auto flex-column ">
            <header class="text-bg-dark p-3">
              <div>
                <h3 class="nav-title float-md-start mb-0">Game Page</h3>
                <nav class="nav nav-masthead justify-content-center float-md-end">
                <button class="btn btn-dark" key={0} onClick={() => navigateTo(0)}>Home Screen</button>
                <button class="btn btn-dark" key={2} onClick={() => navigateTo(2)}>Credits</button>
                <button class="btn btn-dark" key={3} onClick={() => navigateTo(3)}>Dashboard</button>
                <button class="btn btn-info" key={1} onClick={() => navigateTo(1)}>Sign-in!</button>
                </nav>
              </div>
            </header>
          </div>
          <div class="nav-head mb-auto"></div>
  
          <main>
  
            <div id="myCarousel" class="carousel slide mb-6" data-bs-ride="carousel">
              <div class="carousel-indicators">
                <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
              </div>
              <div class="carousel-inner">
                <div class="carousel-item active">
                  <img src={require('./images/totk_2.jpg')} alt="totk1" style={{height: "100%", width: "100%"}}></img>
                  <div class="container">
                    <div class="carousel-caption text-start">
                      <h1>Legend Of Zelda: Tears of the Kingdom</h1>
                      <p class="opacity-75">Open World Legend of Zelda Game</p>
                      <p><a class="btn btn-lg btn-primary" href="https://www.nintendo.com/us/store/products/the-legend-of-zelda-tears-of-the-kingdom-switch/">Buy Today</a></p>
                    </div>
                  </div>
                </div>
                <div class="carousel-item">
                  <img src={require('./images/totk_1.webp')} alt="totk2" style={{ height: '100%', width: '100%' }}></img>
                  <div class="container">
                    <div class="carousel-caption">
                    </div>
                  </div>
                </div>
                <div class="carousel-item">
                  <img src={require('./images/totk_3.jpg')} alt="totk3" style={{ height: '100%', width: '100%' }}></img>
                  <div class="container">
                    <div class="carousel-caption text-end">
                    </div>
                  </div>
                </div>
              </div>
              <button class="carousel-control-prev" type="button" data-bs-target="#myCarousel" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
              </button>
              <button class="carousel-control-next" type="button" data-bs-target="#myCarousel" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
              </button>
            </div>
  
            <div class="wrap_2"> {/*<!--stuff from json -->*/} 
              <div class ="center">
                <h1 style={{ color: "#52D1DC"}}>Game Description</h1>
                <p>{customData.games[1].description}</p>
              </div>
            </div>
  
            <div class="wrap">
              <div class="left">
                <h1 style={{ color: "#52D1DC"}}>Lawson's Review</h1>
                {customData.games[1].lawsons_review}
              </div>
              <div class="right">
                <h1 style={{ color: "#52D1DC"}}>Michael's Review</h1>
                {customData.games[1].michaels_review}
              </div>
            </div>


 {/*} <!-- FOOTER -->*/}
 <footer class="text-bg-dark mt-auto text-white-50 text-center">
  <p>Made by SE student Lawson Port and Com S student Michael Linker at Iowa State University</p>

  </footer>
  </main>
  <script src="../assets/dist/js/bootstrap.bundle.min.js"></script>
  
  </body>
  </div>
    ),
  },

  {//9: Valorant page
    title: "Valorant",
  
    component: (
      <div>
        <meta charset="utf-8"></meta>
        <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
        <meta name="description" content=""></meta>
        <meta name="author" content="Mark Otto, Jacob Thornton, and Bootstrap contributors"></meta>
        <meta name="generator" content="Hugo 0.122.0"></meta>
        <title>League</title>
  
        <link rel="canonical" href="https://getbootstrap.com/docs/5.3/examples/carousel/"></link>
  
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous"></link>
        
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@docsearch/css@3"></link>
        <link href="../assets/dist/css/bootstrap.min.css" rel="stylesheet"></link>
  
        {/* Custom styles for this template */}
        <link href="styles/style.css" rel="stylesheet"></link>
        <link href="styles/navbar.css" rel="stylesheet"></link>
  
        <body>
  
          <div class="cover-container d-flex w-100 mx-auto flex-column ">
            <header class="text-bg-dark p-3">
              <div>
                <h3 class="nav-title float-md-start mb-0">Game Page</h3>
                <nav class="nav nav-masthead justify-content-center float-md-end">
                <button class="btn btn-dark" key={0} onClick={() => navigateTo(0)}>Home Screen</button>
                <button class="btn btn-dark" key={2} onClick={() => navigateTo(2)}>Credits</button>
                <button class="btn btn-dark" key={3} onClick={() => navigateTo(3)}>Dashboard</button>
                <button class="btn btn-info" key={1} onClick={() => navigateTo(1)}>Sign-in!</button>
                </nav>
              </div>
            </header>
          </div>
          <div class="nav-head mb-auto"></div>
  
          <main>
  
            <div id="myCarousel" class="carousel slide mb-6" data-bs-ride="carousel">
              <div class="carousel-indicators">
                <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
              </div>
              <div class="carousel-inner">
                <div class="carousel-item active">
                  <img src={require('./images/valo_1.jpg')} alt="valo1" style={{height: "100%", width: "100%"}}></img>
                  <div class="container">
                    <div class="carousel-caption text-start">
                      <h1>Valorant</h1>
                      <p class="opacity-75">A 5v5 character-based tactical shooter</p>
                      <p><a class="btn btn-lg btn-primary" href="https://playvalorant.com/en-us/">Sign Up</a></p>
                    </div>
                  </div>
                </div>
                <div class="carousel-item">
                  <img src={require('./images/valo_2.jpg')} alt="valo2" style={{ height: '100%', width: '100%' }}></img>
                  <div class="container">
                    <div class="carousel-caption">
                    </div>
                  </div>
                </div>
                <div class="carousel-item">
                  <img src={require('./images/valo_3.jpg')} alt="valo3" style={{ height: '100%', width: '100%' }}></img>
                  <div class="container">
                    <div class="carousel-caption text-end">
                    </div>
                  </div>
                </div>
              </div>
              <button class="carousel-control-prev" type="button" data-bs-target="#myCarousel" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
              </button>
              <button class="carousel-control-next" type="button" data-bs-target="#myCarousel" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
              </button>
            </div>
  
            <div class="wrap_2"> {/*<!--stuff from json -->*/} 
              <div class ="center">
                <h1 style={{ color: "#52D1DC"}}>Game Description</h1>
                <p>{customData.games[3].description}</p>
              </div>
            </div>
  
            <div class="wrap">
              <div class="left">
                <h1 style={{ color: "#52D1DC"}}>Lawson's Review</h1>
                {customData.games[3].lawsons_review}
              </div>
              <div class="right">
                <h1 style={{ color: "#52D1DC"}}>Michael's Review</h1>
                {customData.games[3].michaels_review}
              </div>
            </div>


 {/*} <!-- FOOTER -->*/}
 <footer class="text-bg-dark mt-auto text-white-50 text-center">
  <p>Made by SE student Lawson Port and Com S student Michael Linker at Iowa State University</p>

  </footer>
  </main>
  <script src="../assets/dist/js/bootstrap.bundle.min.js"></script>
  
  </body>
  </div>
    ),
  },
  ];

  // Function to handle navigation between pages
  function navigateTo(pageIndex) {
    setCurrentPageIndex(pageIndex);
  }

  return (
    <div>
      {/* Render the current page */}
      {pages[currentPageIndex].component}
    </div>
  );
}

export default GameHub;