import React from "react";
import StarSelector from "./StarSelector";

function Listing({ selectedMode }) {
  let skillLevel = 3;
  let starsArray = [];
  var i;
  for (i = 0; i < 5; i++) {
    if (i < skillLevel) {
      starsArray.push(1);
    } else {
      starsArray.push(0);
    }
  }
  return (
    <div className="card">
      {selectedMode == "reviews" && (
        <div className="card-body">
          <h5 className="card-title">
            Raiting:
            {starsArray.map((value, index) => {
              if (value) {
                return <i className="fas fa-star" key={index}></i>;
              } else {
                return <i className="far fa-star" key={index}></i>;
              }
            })}
          </h5>
          <div className="row">
            <div className="col-12">He asked for more money</div>
          </div>
        </div>
      )}
      {selectedMode != "reviews" && (
        <div className="card-body">
          <h5 className="card-title">Football</h5>
          <div className="row">
            <div className="col-12">Koper, Slovenia</div>
            <div className="col-12">14:56</div>
            <div className="col-12">FREE</div>
            <div className="col-12">
              Skill Group <br />
              {starsArray.map((value, index) => {
                if (value) {
                  return <i className="fas fa-star" key={index}></i>;
                } else {
                  return <i className="far fa-star" key={index}></i>;
                }
              })}
            </div>
            {selectedMode == "enroll" && (
              <div className="col-12">
                <div className="col-12">User Raiting: 4.5</div>
                <div className="col-12">
                  <button className="btn btn-primary reviews-button">
                    User reviews
                  </button>
                </div>
                <div className="col-12">
                  <button className="btn btn-primary">Enroll</button>
                </div>
                <div className="col-12">8/12</div>
              </div>
            )}
            {selectedMode == "finished" && (
              <div className="col-12">
                <hr />
                <h6>Write a review</h6>
                <hr />
                <StarSelector className="col-12">Review raiting</StarSelector>
                <textarea
                  className="form-control"
                  rows="3"
                  placeholder="Write a review"
                ></textarea>
                <button className="btn btn-primary">Send review</button>
              </div>
            )}
            {selectedMode == "my" && <div className="col-12">8/12</div>}
          </div>
        </div>
      )}
    </div>
  );
}

export default Listing;
