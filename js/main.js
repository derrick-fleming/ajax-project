var $villagerView = document.querySelector('#villager-view');
var speciesList = [];
var villagerList = null;
/*
var speciesNumber = 0;
*/

function generateLink() {
  var $topLink = document.createElement('a');
  $topLink.textContent = 'Back to top';
  $topLink.className = 'top-link';
  $topLink.setAttribute('href', '#villager-view');
  return $topLink;
}

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
  for (var i = 0; i < 30; i++) {
    var villagerSpecies = villagerList[i].species;
    var villagerIcon = villagerList[i].icon_uri;
    var villagerName = villagerList[i].name.USen;
    if (!speciesList.includes(villagerSpecies)) {
      // speciesNumber++;
      speciesList.push(villagerSpecies);

      var $villagerSection = document.createElement('div');
      $villagerSection.setAttribute('id', villagerSpecies);
      $villagerSection.className = 'villager-section';

      var $villagerContainerHeader = document.createElement('div');
      $villagerContainerHeader.className = 'container species-header row';

      var $headerContainer = document.createElement('div');
      $headerContainer.className = 'header-container';

      var $h1 = document.createElement('h1');
      $h1.textContent = villagerSpecies;
      $h1.className = 'species-header';

      $headerContainer.appendChild($h1);
      $villagerContainerHeader.appendChild($headerContainer);
      $villagerContainerHeader.appendChild(generateLink());
      $villagerSection.appendChild($villagerContainerHeader);
      $villagerView.appendChild($villagerSection);

    }

    var $villagerContainerList = document.createElement('div');
    $villagerContainerList.className = 'container species-list row';

    var $villagerColumn = document.createElement('div');
    $villagerColumn.className = 'column-one-third center';
    $villagerColumn.setAttribute('id', villagerName);

    /*
    var $anchorVillager = document.createElement('a');
*/

    var $villagerIcon = document.createElement('img');
    $villagerIcon.setAttribute('src', villagerIcon);
    $villagerIcon.className = 'villager-icon';
    $villagerIcon.setAttribute('alt', villagerName);

    var $villagerName = document.createElement('h2');
    $villagerName.className = 'villager-name';
    $villagerName.textContent = villagerName;
  }
}

xhr.addEventListener('load', generateList);
xhr.send();
