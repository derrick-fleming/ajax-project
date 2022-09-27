var $villagerView = document.querySelector('#villager-view');
var $loadMoreLink = document.querySelector('.load-link');
var $scrollPopUp = document.querySelector('#scroll-info');

$scrollPopUp.addEventListener('click', function () {
  if (event.target.tagName === 'I') {
    $scrollPopUp.className = 'hidden';
  }
});

var speciesList = [];
var villagerList = null;
var speciesNumber = 0;

var xhr = new XMLHttpRequest();
xhr.open('GET', 'https://acnhapi.com/v1a/villagers');
xhr.responseType = 'json';

xhr.addEventListener('load', generateList);
xhr.send();

function generateList(event) {
  villagerList = xhr.response;
  generateDomVillagersList();
  return villagerList;
}

$loadMoreLink.addEventListener('click', function () {
  generateDomVillagersList();
  if (speciesNumber > 300) {
    $loadMoreLink.className = 'load-link hidden';
  }
});

function generateDomVillagersList() {

  for (var i = speciesNumber; i < speciesNumber + 100; i++) {
    if (i === 0) {
      generateAlligator();
    }

    if (i === 143) {
      generateEagle();
    }

    var villagerSpecies = villagerList[i].species;

    if (villagerSpecies === 'Alligator' || villagerSpecies === 'Eagle') {
      continue;
    }

    var villagerIcon = villagerList[i].icon_uri;
    var villagerName = villagerList[i].name['name-USen'];
    if (!speciesList.includes(villagerSpecies)) {
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

      var $villagerContainerSpeciesList = document.createElement('div');
      $villagerContainerSpeciesList.className = 'container species-list row';
      $villagerContainerSpeciesList.setAttribute('id', villagerSpecies.toLowerCase());

    }

    var $villagerColumn = document.createElement('div');
    $villagerColumn.className = 'column-one-third center';

    var $anchorVillager = document.createElement('a');

    var $villagerIcon = document.createElement('img');
    $villagerIcon.setAttribute('src', villagerIcon);
    $villagerIcon.className = 'villager-icon';
    $villagerIcon.setAttribute('alt', villagerName);

    var $villagerName = document.createElement('h2');
    $villagerName.className = 'villager-name';
    $villagerName.textContent = villagerName;

    $anchorVillager.appendChild($villagerIcon);
    $anchorVillager.appendChild($villagerName);
    $villagerColumn.appendChild($anchorVillager);

    if (speciesNumber > 100 && villagerList[speciesNumber - 1].species === villagerSpecies) {
      var $villagerSectionUpdate = document.querySelector('#' + villagerSpecies.toLowerCase());
      $villagerSectionUpdate.appendChild($villagerColumn);
      continue;
    }

    $villagerContainerSpeciesList.appendChild($villagerColumn);

    if (i === 390) {
      $villagerSection.appendChild($villagerContainerSpeciesList);
      speciesNumber = 390;
      return;
    }

    if (villagerSpecies !== villagerList[i + 1].species || i === speciesNumber + 99) {
      $villagerSection.appendChild($villagerContainerSpeciesList);
    }

  }
  speciesNumber += 100;
  return speciesNumber;
}

function generateAlligator() {
  for (var i = 93; i < 100; i++) {
    var villagerSpecies = villagerList[i].species;
    var villagerIcon = villagerList[i].icon_uri;
    var villagerName = villagerList[i].name['name-USen'];
    if (!speciesList.includes(villagerSpecies)) {
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
      $villagerSection.appendChild($villagerContainerHeader);
      $villagerView.appendChild($villagerSection);

      var $villagerContainerSpeciesList = document.createElement('div');
      $villagerContainerSpeciesList.className = 'container species-list row';
    }

    var $villagerColumn = document.createElement('div');
    $villagerColumn.className = 'column-one-third center';
    $villagerColumn.setAttribute('id', villagerName);

    var $anchorVillager = document.createElement('a');

    var $villagerIcon = document.createElement('img');
    $villagerIcon.setAttribute('src', villagerIcon);
    $villagerIcon.className = 'villager-icon';
    $villagerIcon.setAttribute('alt', villagerName);

    var $villagerName = document.createElement('h2');
    $villagerName.className = 'villager-name';
    $villagerName.textContent = villagerName;

    $anchorVillager.appendChild($villagerIcon);
    $anchorVillager.appendChild($villagerName);
    $villagerColumn.appendChild($anchorVillager);
    $villagerContainerSpeciesList.appendChild($villagerColumn);

    if (i === 99) {
      $villagerSection.appendChild($villagerContainerSpeciesList);
    }
  }

}

function generateEagle() {
  for (var i = 279; i < 288; i++) {
    var villagerSpecies = villagerList[i].species;
    var villagerIcon = villagerList[i].icon_uri;
    var villagerName = villagerList[i].name['name-USen'];
    if (!speciesList.includes(villagerSpecies)) {
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
      $villagerSection.appendChild($villagerContainerHeader);
      $villagerView.appendChild($villagerSection);

      var $villagerContainerSpeciesList = document.createElement('div');
      $villagerContainerSpeciesList.className = 'container species-list row';
    }

    var $villagerColumn = document.createElement('div');
    $villagerColumn.className = 'column-one-third center';
    $villagerColumn.setAttribute('id', villagerName);

    var $anchorVillager = document.createElement('a');

    var $villagerIcon = document.createElement('img');
    $villagerIcon.setAttribute('src', villagerIcon);
    $villagerIcon.className = 'villager-icon';
    $villagerIcon.setAttribute('alt', villagerName);

    var $villagerName = document.createElement('h2');
    $villagerName.className = 'villager-name';
    $villagerName.textContent = villagerName;

    $anchorVillager.appendChild($villagerIcon);
    $anchorVillager.appendChild($villagerName);
    $villagerColumn.appendChild($anchorVillager);
    $villagerContainerSpeciesList.appendChild($villagerColumn);

    if (i === 287) {
      $villagerSection.appendChild($villagerContainerSpeciesList);
    }
  }
}

function generateLink() {
  var $topLink = document.createElement('a');
  $topLink.textContent = 'Back to top';
  $topLink.className = 'top-link';
  $topLink.setAttribute('href', '#villager-view');
  return $topLink;
}
