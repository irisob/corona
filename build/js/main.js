"use strict";

function getData() {
  let url = 'https://irisob.github.io/corona/build/data/data.json';
  return fetch(url);
}

function handleScroll(e) {
  var elm = e.target;
  var scrollPosition = elm.scrollLeft;
  var endScrollPosition = elm.scrollWidth - elm.offsetWidth - 10;
  var fcElements = document.getElementsByClassName("js-toggle-shadow-fc");
  var wElements = document.getElementsByClassName("js-toggle-shadow-w");

  if (scrollPosition == 0) {
    for (var i = 0; i < fcElements.length; i++) {
      fcElements[i].classList.remove('active');
    }
  } else {
    for (var i = 0; i < fcElements.length; i++) {
      fcElements[i].classList.add('active');
    }
  }

  if (scrollPosition >= endScrollPosition) {
    for (var i = 0; i < wElements.length; i++) {
      wElements[i].classList.remove('active');
    }
  } else {
    for (var i = 0; i < wElements.length; i++) {
      wElements[i].classList.add('active');
    }
  }
}

function createCountriesTable(data) {
  var countriesTable = /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", null, "N \u2013 corona-cases per 100,000 people per week"), /*#__PURE__*/React.createElement("p", null, "N", /*#__PURE__*/React.createElement("sub", null, "e"), " range \u2013 emulated N (\u0441alculated by deaths in 7 days if the lethality of the virus is 0.5% or 1%)"), /*#__PURE__*/React.createElement("p", null, "Countries with a record this week are highlighted in red")), /*#__PURE__*/React.createElement("div", {
    className: "countries-table__wrapper"
  }, /*#__PURE__*/React.createElement("div", {
    className: "countries-table__wrap",
    onScroll: handleScroll
  }, /*#__PURE__*/React.createElement("table", {
    className: "countries-table"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", {
    className: "js-toggle-shadow-fc"
  }, "Country"), /*#__PURE__*/React.createElement("th", null, "N"), /*#__PURE__*/React.createElement("th", null, "N week ago"), /*#__PURE__*/React.createElement("th", null, "N 2\xA0weeks ago"), /*#__PURE__*/React.createElement("th", null, "N", /*#__PURE__*/React.createElement("sub", null, "e"), " range"), /*#__PURE__*/React.createElement("th", null, "Compared to last week"), /*#__PURE__*/React.createElement("th", null, "Weekly dynamics"))), /*#__PURE__*/React.createElement("tbody", null, createCountryRows(data))), /*#__PURE__*/React.createElement("div", {
    className: "countries-table__overflow js-toggle-shadow-w active"
  }))));
  return countriesTable;
}

function createCountryRows(data) {
  var countriesRows = data.map(country => /*#__PURE__*/React.createElement("tr", {
    key: country.id,
    className: country.is_this_week_record ? 'countries-table__row country record' : 'countries-table__row country'
  }, /*#__PURE__*/React.createElement("td", {
    className: "country__name js-toggle-shadow-fc"
  }, country.country_name), /*#__PURE__*/React.createElement("td", {
    className: "country__cases"
  }, country.cases_per_ht), /*#__PURE__*/React.createElement("td", {
    className: "country__cases-week-ago"
  }, country.cases_per_ht_week_ago), /*#__PURE__*/React.createElement("td", {
    className: "country__cases-two-weeks-ago"
  }, country.cases_per_ht_two_week_ago), /*#__PURE__*/React.createElement("td", {
    className: "country__range"
  }, country.es_from, "-", country.es_to), /*#__PURE__*/React.createElement("td", {
    className: country.estimation_match_symbol == ">" ? 'country__compared more' : 'country__compared'
  }, country.estimation_match_symbol), /*#__PURE__*/React.createElement("td", {
    className: "country__dynamic"
  }, country.direction)));
  return countriesRows;
}

function getContent() {
  return getData().then(function (response) {
    if (response.status !== 200) {
      console.log('Looks like there was a problem. Status Code: ' + response.status);
      return;
    }

    let countries_table = response.json().then(function (data) {
      return createCountriesTable(data);
    });
    return countries_table;
  }).catch(function (err) {
    console.log('Fetch Error :-S', err);
  });
}

function App() {
  return getContent().then(content => {
    return /*#__PURE__*/React.createElement("div", {
      className: "container"
    }, content);
  });
}

;
App().then(app => {
  ReactDOM.render(app, document.querySelector("#main"));
});