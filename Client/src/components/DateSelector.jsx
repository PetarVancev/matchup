import React from "react";

function DateSelector() {
  const date = new Date();

  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  let dates = [];
  var i;

  // This arrangement can be altered based on how we want the date's format to appear.
  let currentDate = `${day}.${month}.${year}`;

  for (i = 1; i <= 10; i++) {
    let nextDay = day + i;
    let nextDate = `${nextDay}.${month}.${year}`;
    dates.push(nextDate);
  }
  return (
    <div className="date-selector-row">
      <div className="col-12 text-center">
        <div className="dropdown show">
          <a
            className="dropdown-toggle"
            href="#"
            role="button"
            id="dropdownMenuLink"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            {currentDate}
          </a>

          <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
            {dates.map((date, index) => (
              <a className="dropdown-item" href="#" key={index}>
                {date}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DateSelector;
