/* exported data */

var data = {
  view: 'home-view',
  favoritesList: [],
  editing: false,
  editingNumber: null,
  nextFavorite: 0
};

var previousData = localStorage.getItem('acnh-villager-favorites');
if (previousData !== null) {
  data = JSON.parse(previousData);
}

window.addEventListener('beforeunload', storeToLocalStorage);
window.addEventListener('pagehide', storeToLocalStorage);

function storeToLocalStorage(event) {
  var dataJSON = JSON.stringify(data);
  localStorage.setItem('acnh-villager-favorites', dataJSON);
}
