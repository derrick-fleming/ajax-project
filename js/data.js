/* exported data */

var data = {
  view: 'favorities-entry',
  favoritesList: [],
  editing: null,
  nextFavorite: 1
};

var previousData = localStorage.getItem('acnh-villager-favorites');
if (previousData !== null) {
  data = JSON.parse(previousData);
}

window.addEventListener('beforeunload', storeToLocalStorage);

function storeToLocalStorage(event) {
  var dataJSON = JSON.stringify(data);
  localStorage.setItem('acnh-villager-favorites', dataJSON);
}
