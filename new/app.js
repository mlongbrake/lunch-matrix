"use strict";

let LunchMatrix = (() => {

  // Fetches a restaurant list from a specified URL. The target should be JSON
  // with a single array of restaurant objects.
  async function fetchRestaurantList(url) {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Error " + response.status + " " + response.statusText);
    }
    const list = await response.json();

    // Convert restaurant list into a quickly searchable Map
    const map = new Map();
    list.map(x => map.set(x.name, x));
    return map;
  }

  function generateLunchMatrix(restaurantList) {
    // Construct a list of restaurants for each category
    const categoryLists = new Map();
    for (const restaurant of restaurantList.values()) {
      for (const category of restaurant.categories) {
        const categoryList = categoryLists.get(category);
        if (categoryList === undefined) {
          categoryLists.set(category, [restaurant.name]);
        } else {
          categoryList.push(restaurant.name);
        }
      }
    }

    // Remove previous lunch matrix if it exists
    let node = document.getElementById("lunchMatrix");
    while (node.hasChildNodes()) {
      node.removeChild(node.lastChild);
    }

    const frag = document.createDocumentFragment();
    for (const [category, restaurants] of categoryLists) {
      // Create container for one restaurante list
      const container = document.createElement("div");
      container.classList.add("restaurant-list");
      frag.appendChild(container);

      // Create category title for restaurant list
      const title = document.createElement("h2");
      title.appendChild(document.createTextNode(category));
      container.appendChild(title);

      // Create list for restaurants
      const list = document.createElement("ul");
      container.appendChild(list);
      for (const restaurant of restaurants) {
        const li = document.createElement("li");
        li.appendChild(document.createTextNode(restaurant));
        list.appendChild(li);
      }
    }

    node.appendChild(frag);
  }

  function makeLunch() {
    const node = document.getElementById("lunchMatrix");
    const catIdx = Math.floor(Math.random() * node.childElementCount);
    const category = node.childNodes[catIdx].firstChild.innerText;
    const list = node.childNodes[catIdx].lastChild;
    const restIdx = Math.floor(Math.random() * list.childElementCount);
    const recommendation = document.getElementById("recommendation");
    recommendation.innerText = list.childNodes[restIdx].innerText;
  }

  return {
    fetchRestaurantList: fetchRestaurantList,
    generateLunchMatrix: generateLunchMatrix,
    makeLunch: makeLunch
  }
})();

(async () => {
  const initialData = await
    LunchMatrix.fetchRestaurantList("restaurant_list.json");

  function init() {
    LunchMatrix.generateLunchMatrix(initialData);
    const button = document.getElementById("btnMakeLunch");
    button.addEventListener("click", LunchMatrix.makeLunch);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();