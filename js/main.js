var $villagerView = document.querySelector('#villager-view');
var speciesList = [];

$villagerView.addEventListener('click', function (event) {
  return event.target;
});

var xhr = new XMLHttpRequest();
xhr.open('GET', 'https://acnhapi.com/v1a/villagers');
xhr.responseType = 'json';

function generateHeaders(event) {
  for (var i = 0; i < 25; i++) {
    var villagerSpecies = xhr.response[i].species;
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

xhr.addEventListener('load', generateHeaders);

xhr.send();
