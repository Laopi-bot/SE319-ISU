import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";

function Robots() {
  const [myRobots, setMyRobots] = useState([]);

  useEffect(() => {
    //read file with movies:
    fetch("http://localhost:8081/listRobots")
      .then((response) => response.json())
      .then((myRobots) => {
        console.log("hi hi");
        setMyRobots(myRobots);
      });
  }, []);

  const ShowRobots = () => {
    return (
      <div className="container mt-3">
             {" "}
        <div className="row">
                 {" "}
          {myRobots.map((robot) => (
            <div
              key={robot.id}
              className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
            >
                         {" "}
              <div className="card">
                             {" "}
                <img
                  src={robot.imageUrl}
                  className="card-img-top"
                  alt={robot.name}
                  style={{ objectFit: "cover", height: "200px" }}
                />
                             {" "}
                <div className="card-body">
                                  <h5 className="card-title">{robot.name}</h5> 
                                <p className="card-text">{robot.description}</p>
                               {" "}
                </div>
                           {" "}
              </div>
                       {" "}
            </div>
          ))}
               {" "}
        </div>
           {" "}
      </div>
    );
  };

  return (
    <div>
      <ShowRobots />
    </div>
  );
}

export default Robots;
