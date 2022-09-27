var $villagerView = document.querySelector('#villager-view');
var speciesList = [];
var villagerList = null;

$villagerView.addEventListener('click', function (event) {
  return event.target;
});

var xhr = new XMLHttpRequest();
xhr.open('GET', 'https://acnhapi.com/v1a/villagers');
xhr.responseType = 'json';

function generateList(event) {
  villagerList = xhr.response;
  generateDomHeaders();
  return villagerList;
}

function generateDomHeaders() {
  for (var i = 0; i < 25; i++) {
    var villagerSpecies = villagerList[i].species;
    if (!speciesList.includes(villagerSpecies)) {

      speciesList.push(villagerSpecies);

      var $villagerSection = document.createElement('div');
      $villagerSection.className = 'villager-section';

      var $villagerContainer = document.createElement('div');
      $villagerContainer.className = 'container species-header row';

      var $columnFull = document.createElement('div');
      $columnFull.className = 'column-full';

      var $h1 = document.createElement('h1');
      $h1.textContent = villagerSpecies;
      $h1.className = 'species-header';

      $columnFull.appendChild($h1);
      $villagerContainer.appendChild($columnFull);
      $villagerSection.appendChild($villagerContainer);
      $villagerView.appendChild($villagerSection);
    }
  }
}
xhr.addEventListener('load', generateList);
xhr.send();
