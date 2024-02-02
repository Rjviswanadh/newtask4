const searchEl = document.getElementById("input-search");
//const homebutton = document.getElementById("home-button");
const searchButton = document.getElementById("search-button");
const section2 = document.getElementById("section2");
const section2container = document.getElementById("section2-container");
const homepage = document.getElementById("home-page");
const librarycontainer = document.getElementById("library-id");
const changeposition = document.getElementById("change-position");
const navcontainer = document.getElementById("container-nav");
const homeitems = document.getElementById("home-items");
const previoussearch = document.getElementById("previous-search");

function searchedItems() {
  let stringifiedTodoList = localStorage.getItem("todoList");
  let List = JSON.parse(stringifiedTodoList);
  if (List === null) {
    return [];
  } else {
    return List;
  }
}

const listItem = searchedItems();
function getinput() {
  const value = searchEl.value;
  const values = {
    textvalue: value,
  };
  listItem.push(values);
  localStorage.setItem("List", JSON.stringify(listItem));
}

searchButton.addEventListener("click", () => {
  searchEl.style.display = "block";
  changeposition.style.display = "flex";
  navcontainer.style.width = "100%";
  librarycontainer.style.width = "100%";
  console.log("hello");
  homeitems.style.display = "none";
});

function displaySearched(displaydata) {
  console.log(displaydata);
  const searchedpara = document.createElement("p");
  searchedpara.textContent = displaydata.textvalue;
  searchedpara.style.marginLeft = "30px";
  previoussearch.appendChild(searchedpara);
}

function hideSearch() {
  section2container.style.display = "none";
  searchEl.style.display = "none";
  homeitems.style.display = "flex";
  const data = localStorage.getItem("List");
  const resultdata = JSON.parse(data);
  for (let j of resultdata) {
    displaySearched(j);
  }
}

async function getspotify() {
  const clientId = "18342743d2ef41eaad1d3def8a7c051f";
  const secretId = "5dad4617206f4714b3296e7106516185";
  const url = "https://accounts.spotify.com/api/token";
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Basic " + btoa(clientId + ":" + secretId),
    },
    body: "grant_type=client_credentials",
  };
  const response = await fetch(url, options);
  const result = await response.json();
  localStorage.setItem("jwt_token", result.access_token);
  section2container.style.display = "block";
}

const token = localStorage.getItem("jwt_token");
console.log(token);

function displayCategorieList(list) {
  for (let i of list.categories.items) {
    const div = document.createElement("div");
    div.classList.add("categorie-list");
    div.style.cursor = "pointer";
    section2.appendChild(div);
    const h1 = document.createElement("h1");
    h1.textContent = i.name;
    h1.style.marginLeft = "10px";
    h1.style.display = "inline-block";
    div.appendChild(h1);
    const img = document.createElement("img");
    img.src = i.icons[0].url;
    img.classList.add("img-element");
    div.appendChild(img);
  }
}

async function getcategories() {
  const url1 = "https://api.spotify.com/v1/browse/categories";
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Bearer " + token,
    },
  };
  const response1 = await fetch(url1, options);
  const result1 = await response1.json();
  displayCategorieList(result1);
}
getcategories();
