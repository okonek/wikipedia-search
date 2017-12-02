const API_URL = "https://en.wikipedia.org/w/api.php";
const searchForm = document.getElementById("search-form");
const resultsList = document.getElementById("results-list");
const main = document.getElementById("main");

searchForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const searchQueryInput = document.getElementById("search-query");
    callApi(searchQueryInput.value);
});

function createListElement(title, link) {
    const element = document.createElement("ul");
    const linkElement = document.createElement("a");
    linkElement.href = link;
    linkElement.appendChild(document.createTextNode(title));

    element.appendChild(linkElement);
    return element;
}

function createNoResultsElement() {
    const errorElement = document.createElement("span");
    errorElement.appendChild(document.createTextNode("No results"));

    return errorElement;
}

function parseApiCallResponse(response) {
    const result = JSON.parse(response.target.response);
    const titles = result[1];
    const links = result[3];

    if(titles.length === 0 ) {
        main.appendChild(createNoResultsElement());
    }
    else {
        while (resultsList.firstChild) {
            resultsList.removeChild(resultsList.firstChild);
        }

        for (var i = 0; i < titles.length; i++) {
            resultsList.appendChild(createListElement(titles[i], links[i]));
        }
    }
}

function callApi(query) {
    const apiRequest = new XMLHttpRequest();
    apiRequest.addEventListener("load", parseApiCallResponse);
    apiRequest.open("GET", API_URL + "?origin=*&action=opensearch&search=" + query);
    apiRequest.send();
}