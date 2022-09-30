/* exported data */

var data = {
  view: 'villager-list',
  favoritesList: [],
  editing: false,
  nextFavorite: 0
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
