var last_selection = null;

function make_lunch()
{
  // Randomly select a category card
  var categories = document.querySelector("main").children;
  var cat_idx = Math.floor(Math.random() * categories.length);

  // Find position of selected card and scroll to it
  var scroll_pos = 0;
  var toolbar_offset = document.querySelector(".mdc-toolbar").clientHeight;
  toolbar_offset += 16;     // Account for padding in main element
  var obj = categories[cat_idx];
  if (obj.offsetParent)
  {
    do
    {
      scroll_pos += obj.offsetTop;
    } while (obj = obj.offsetParent);
  }
  window.scroll(0, scroll_pos - toolbar_offset);

  // Randomly select a restaurant from the category
  var restaurants = categories[cat_idx].querySelector("ul.restaurant-list").children;
  var rest_idx = Math.floor(Math.random() * restaurants.length);

  // Highlight the selection
  if (last_selection)
    last_selection.className = "";
  restaurants[rest_idx].className = "mdc-typography--title";
  last_selection = restaurants[rest_idx];
}
