/* exported data */
var data = {
    view: 'home-view',
    favoritesList: [],
    editing: false,
    editingNumber: null,
    nextFavorite: 0,
    informationTracker: [],
    deleteFavorite: null
};
var previousData = localStorage.getItem('acnh-villager-favorites');
if (previousData !== null) {
    data = JSON.parse(previousData);
}
window.addEventListener('beforeunload', storeToLocalStorage);
window.addEventListener('pagehide', storeToLocalStorage);
function storeToLocalStorage(event) {
    var dataJSON = JSON.stringify(data);
    if (data.view === 'add-info') {
        data.view = 'favorites-view';
    }
    if (data.view === 'error-message') {
        data.view = 'home-view';
    }
    localStorage.setItem('acnh-villager-favorites', dataJSON);
}
