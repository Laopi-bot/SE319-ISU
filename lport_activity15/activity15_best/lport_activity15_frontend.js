
/*
<p>Student name : Lawson Port</p>
<p>email : lport@iastate.edu</p>
<p>date : 4/14/2024</p>
*/


fetch("http://localhost:8081/listRobots")
.then(response => response.json())
.then((robots) => loadRobots(robots));


function loadRobots(robots){

  console.log(robots);
  

    var CardRobot = document.getElementById("col");
    var checkboxes = [];
    var cards = [];

    for(var i = 0; i < robots.length; i++){
        let name = robots[i].name;
        let price = robots[i].price;
        let desc = robots[i].description;
        let url = robots[i].imageUrl;


        let AddCardRobot = document.createElement("div");
        AddCardRobot.classList.add("col");

        let checkbox = "checkbox" + i.toString();
        let card = "card" + i.toString();

        AddCardRobot.innerHTML = `
        <input type="checkbox" id=${checkbox} class="form-check-input" checked>
        <label for=${checkbox} class="form-check-label">Show Image ${i}</label>


       <div id=${card} class="card shadow-sm">
            <img src="${url}" class="card-img-top" alt="..."></img>
            <div class="card-body">
            <p class="card-text"> <strong>${name}</strong>, $${price}, ${desc}</p>
            <div class="d-flex justify-content-between align-items-center">
            <small class="text-body-secondary">9 mins</small>
          </div>
        </div>
      </div>
      `;

        CardRobot.appendChild(AddCardRobot); 

        let cbox = document.getElementById(checkbox);
        checkboxes.push(cbox);

        let ccard = document.getElementById(card);
        cards.push(ccard);

    }
   
    //console.log(checkboxes);
    //console.log(cards);
    

    checkboxes.forEach((checkboxParam, index) => {
        //console.log(index);
        checkboxParam.addEventListener('change', () => {
          if (checkboxParam.checked) {
              cards[index].style.display = 'block'; // Show the card
          } else {
              cards[index].style.display = 'none'; // Hide the card
          }
        });
      });
   }

   function updateRobot(robotId, updatedData) {
    fetch(`http://localhost:8081/updateRobot/${robotId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.text();
      })
      .then((data) => {
        console.log(data);
        // Handle success
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
        // Handle error
      });
  }
  function deleteRobot(robotId){
    fetch(`http://localhost:8081/deleteRobot/${robotId}`, {
        method: 'DELETE',
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.text();
      })
      .then((data) => {
        console.log(data);
        // Handle success
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
        // Handle error
      });
  }



   function addANewRobot(){
    fetch('http://localhost:8081/addRobot' , {
        method: 'POST',
        headers: { 'content-type' : 'application/json'},
        body: JSON.stringify(
          {
            "id": 4,
            "name": "Robot Lawson",
            "price": 69.420,
            "description": "I robot is one example of an image for my exercise",
            "imageUrl": "https://robohash.org/slinky"
          }
        )
    })
    .then(response => {
      if(response.status != 200){
        return response.json()
        .then(errData =>{
          throw new Error('POST response was not ok:\n Status: ${response.status}. \n Error: ${errData.error}');
        })
      }
        return response.json();})
      .then(data => {
        console.log(data);
        alert('Robot added successfully!'); //display alert with success message

      })
      .catch(error => {
        console.error('Error adding robot: ', error);
        alert('Error adding robot: ' +error.message);
      });
   }//end add robot

function specificRobot(val){
  robotValue = val;

  //todo change to while loop since we are adding robots

  if(robotValue == 1){
    fetch("http://localhost:8081/1")
    .then(response => response.json())
    .then((robot) => loadIndividualRobot(robot));
  }
  else if(robotValue == 2){
    fetch("http://localhost:8081/2")
.then(response => response.json())
.then((robot) => loadIndividualRobot(robot));
  }
  else if(robotValue == 3){
    fetch("http://localhost:8081/3")
.then(response => response.json())
.then((robot) => loadIndividualRobot(robot));
  }
  else if(robotValue == 4){
    fetch("http://localhost:8081/4")
.then(response => response.json())
.then((robot) => loadIndividualRobot(robot));
}
}


function loadIndividualRobot(robot){


  console.log(robot);

  var CardRobot = document.getElementById("col");

  if(CardRobot.children.length > 4){
  CardRobot.removeChild(CardRobot.lastChild);
  }

  let name = robot.name;
  let price = robot.price;
  let desc = robot.description;
  let url = robot.imageUrl;

  let card = "card" + robot.toString();

  let AddCardRobot = document.createElement("div");
  AddCardRobot.classList.add("col");

  AddCardRobot.innerHTML = `
 <div id=${card} class="card shadow-sm">
      <img src="${url}" class="card-img-top" alt="..."></img>
      <div class="card-body">
      <p class="card-text"> <strong>${name}</strong>, $${price}, ${desc}</p>
      <div class="d-flex justify-content-between align-items-center">
      <small class="text-body-secondary">9 mins</small>
    </div>
  </div>
</div>
`;

  CardRobot.appendChild(AddCardRobot); 

}

