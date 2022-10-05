var $villagerView = document.querySelector('#villager-view');
var $loadMoreLink = document.querySelector('.load-link');
var $containerPopSection = document.querySelector('.container.pop-section.row.justify-center');
var $modalInformation = document.querySelector('.hidden.modal-villager-info');
var $overlay = document.querySelector('.hidden.overlay');
var $modalPhotoContainer = document.querySelector('#modal-photo-container');
var $speciesHeading = document.querySelector('#species');
var $genderHeading = document.querySelector('#gender');
var $personalityHeading = document.querySelector('#personality');
var $birthdayHeading = document.querySelector('#birthday');
var $hobbyHeading = document.querySelector('#hobby');
var $catchphraseHeading = document.querySelector('#catchphrase');
var $sayingHeading = document.querySelector('#saying');
var $leftArrow = document.querySelector('#left-arrow');
var $rightArrow = document.querySelector('#right-arrow');
var $emptyHeartIcon = document.querySelector('#favorite-icon');
var $addedFavorites = document.querySelector('.added-favorites.hidden');
var $favoritesPageIcon = document.querySelector('.fa-solid.fa-heart.nav-icon');
var $homePageIcon = document.querySelector('.fa-solid.fa-house.nav-icon');
var $navBar = document.querySelector('nav');
var $ul = document.querySelector('ul');
var $noFavoritesContainer = document.querySelector('.no-favorites-container');
var $favoritesList = document.querySelector('#favorites-list');
var $addInformationScreen = document.querySelector('#add-information');
var $navHomeText = document.querySelector('.nav-home.home-page-link');
var $navFavoriteText = document.querySelector('.nav-home.favorites-page-link');
var addedFavoritesTimer = null;
var countdown = 300;
var speciesList = [];
var villagerList = null;
var speciesNumber = 0;
var timerId = null;
var modalVillagerNumber = null;
var $viewSwapping = document.querySelectorAll('.page');

var xhr = new XMLHttpRequest();
xhr.open('GET', 'https://acnhapi.com/v1a/villagers');
xhr.responseType = 'json';

xhr.addEventListener('load', generateList);
xhr.send();

xhr.addEventListener('error', function () {
  data.view = 'error-message';
  switchViews('error-message');
});

function generateList(event) {
  villagerList = xhr.response.sort(function (a, b) { return a.species.localeCompare(b.species); });
  renderVillagersList();
  return villagerList;
}

$loadMoreLink.addEventListener('click', function () {
  renderVillagersList();
  if (speciesNumber > 300) {
    $loadMoreLink.className = 'load-link hidden';
  }
});

function generateDomTree(tagName, attributes, children) {
  if (!children) {
    children = [];
  }

  var $element = document.createElement(tagName);
  for (var key in attributes) {
    if (key === 'textContent') {
      $element.textContent = attributes.textContent;
    } else {
      $element.setAttribute(key, attributes[key]);
    }
  }

  for (var i = 0; i < children.length; i++) {
    $element.append(children[i]);
  }
  return $element;
}

function renderVillagersList() {
  for (var i = speciesNumber; i < speciesNumber + 100; i++) {
    var villagerSpecies = villagerList[i].species;
    var villagerIcon = villagerList[i].icon_uri;
    var villagerName = villagerList[i].name['name-USen'];
    if (!speciesList.includes(villagerSpecies)) {
      speciesList.push(villagerSpecies);
      var $villagerSection =
      generateDomTree('div', { class: 'species-list', id: villagerSpecies }, [
        generateDomTree('div', { class: 'container row' }, [
          generateDomTree('div', { class: 'header-species-container' }, [
            generateDomTree('h1', { textContent: villagerSpecies })]),
          generateDomTree('a', { class: 'top-page-link', href: '#home-view', textContent: 'Back to Top' })
        ])
      ]);

      $villagerView.appendChild($villagerSection);
      if (villagerSpecies === 'Alligator') {
        var removeLink = document.querySelector('.top-page-link');
        removeLink.remove();
      }

      var $villagerContainerSpeciesList = generateDomTree('div', { class: 'container row', id: 'section-' + villagerSpecies.toLowerCase() });
    }

    var $villagerColumn =
    generateDomTree('div', { class: 'column-one-third center', 'data-id': i }, [
      generateDomTree('a', {}, [
        generateDomTree('img', { src: villagerIcon, class: 'villager-icon', alt: villagerName })
      ]),
      generateDomTree('h4', { class: 'villager-name', textContent: villagerName })
    ]);

    if (speciesNumber > 100 && villagerList[speciesNumber - 1].species === villagerSpecies) {
      var $villagerSectionUpdate = document.querySelector('#' + 'section-' + villagerSpecies.toLowerCase());
      $villagerSectionUpdate.appendChild($villagerColumn);
      continue;
    }

    $villagerContainerSpeciesList.appendChild($villagerColumn);

    if (i === 390) {
      $villagerSection.appendChild($villagerContainerSpeciesList);
      speciesNumber = 390;
    }

    if (villagerSpecies !== villagerList[i + 1].species || i === speciesNumber + 99) {
      $villagerSection.appendChild($villagerContainerSpeciesList);
    }

  }
  speciesNumber += 100;
  return $villagerContainerSpeciesList;
}

$containerPopSection.addEventListener('click', aidDisappear);
$noFavoritesContainer.addEventListener('click', aidDisappear);
function aidDisappear(event) {
  if (event.target.tagName === 'I') {
    var $hideElement = event.target.closest('.column-quarter');
    if ($hideElement !== null) {
      $hideElement.className = 'hidden';
    } else {
      $hideElement = event.target.closest('.help');
      $hideElement.className = 'hidden';
    }
  }
}

$villagerView.addEventListener('click', openModalWindow);
function openModalWindow(event) {
  if (event.target.className !== 'villager-icon') {
    return;
  }
  var $modalPopUp = event.target.closest('div');
  modalVillagerNumber = $modalPopUp.getAttribute('data-id');
  var addedModalInfo = villagerList[modalVillagerNumber];
  renderModalInfo(addedModalInfo);
  checkFavoriteVillager(addedModalInfo);

  $overlay.className = 'overlay';
  $modalInformation.className = 'modal-villager-info';
  timerId = setInterval(loadingImageIcon, 0);
}

function loadingImageIcon() {
  var image = document.querySelector('.modal-villager-photo');
  loadingIcon.className = 'lds-ring';
  if (image.complete === true) {
    loadingIcon.className = 'lds-ring hidden';
    clearInterval(timerId);
  }
  return timerId;
}

function checkFavoriteVillager(info) {
  for (var i = 0; i < data.favoritesList.length; i++) {
    var checkFavorite = data.favoritesList[i];
    if (info.name['name-USen'] === checkFavorite.villagerName) {
      $emptyHeartIcon.className = 'fa-solid fa-heart liked-heart';
      return $emptyHeartIcon;
    }
  }
}

function renderModalInfo(info) {
  var $villagerInfoPhoto = generateDomTree('img', { src: info.image_uri, alt: 'Image of ' + info.name['name-USen'], class: 'modal-villager-photo' }, []);
  $modalPhotoContainer.appendChild($villagerInfoPhoto);

  var birthday = info.birthday.split('/');
  birthday = birthday.reverse();

  var capitalizeCatch = info['catch-phrase'];
  var firstLetter = capitalizeCatch[0].toUpperCase();
  var wordOutput = firstLetter + capitalizeCatch.slice(1);

  var infoCardArray = [
    ['.modal-heading', info.name['name-USen']],
    ['#species-card', info.species],
    ['#gender-card', info.gender],
    ['#personality-card', info.personality],
    ['#birthday-card', birthday.join('/')],
    ['#hobby-card', info.hobby],
    ['#catchphrase-card', '"' + wordOutput + '"'],
    ['#saying-card', '"' + info.saying + '"']
  ];
  for (var i = 0; i < infoCardArray.length; i++) {
    var $element = document.querySelector(infoCardArray[i][0]);
    $element.textContent = infoCardArray[i][1];
  }
}

$modalInformation.addEventListener('click', function () {
  var modalId = event.target.getAttribute('id');
  if (modalId === 'cancel') {
    var $imageDelete = document.querySelector('.modal-villager-photo');
    resetRightArrowTextContainer();
    $imageDelete.remove();
    countdown = 300;
    $overlay.className = 'hidden overlay';
    $modalInformation.className = 'hidden modal-villager-info';
    $emptyHeartIcon.className = 'fa-regular fa-heart empty-heart';
    clearInterval(addedFavoritesTimer);
    $addedFavorites.className = 'added-favorites hidden';
  }

  if (modalId === 'left-arrow') {
    resetRightArrowTextContainer();
  }

  if (modalId === 'right-arrow') {
    resetLeftArrowTextContainer();
  }

  if (modalId === 'favorite-icon') {
    if ($emptyHeartIcon.className === 'fa-regular fa-heart empty-heart') {
      $emptyHeartIcon.className = 'fa-solid fa-heart liked-heart';
      addedFavoritesTimer = setInterval(displayAddedToFavoritesText, 0);
      var favoriteInfo = saveFavoriteVillager();
      createFavoritesList(favoriteInfo);
      $noFavoritesContainer.className = 'hidden';
    }

  }
});

function displayAddedToFavoritesText() {
  countdown--;
  $addedFavorites.className = 'added-favorites';
  if (countdown < 1) {
    clearInterval(addedFavoritesTimer);
    $addedFavorites.className = 'added-favorites hidden';
  }
  return $addedFavorites;
}

function resetRightArrowTextContainer() {
  $leftArrow.className = 'hidden';
  $rightArrow.className = 'fa-solid fa-chevron-right arrow';

  $speciesHeading.className = 'less-margin';
  $genderHeading.className = 'less-margin';
  $personalityHeading.className = 'less-margin';
  $birthdayHeading.className = 'less-margin';

  $hobbyHeading.className = 'less-margin hidden-text-box';
  $catchphraseHeading.className = 'less-margin hidden-text-box';
  $sayingHeading.className = 'less-margin hidden-text-box';
}

function resetLeftArrowTextContainer() {
  $rightArrow.className = 'hidden';
  $leftArrow.className = 'fa-solid fa-chevron-left arrow';
  $speciesHeading.className = 'less-margin hidden-text-box';
  $genderHeading.className = 'less-margin hidden-text-box';
  $personalityHeading.className = 'less-margin hidden-text-box';
  $birthdayHeading.className = 'less-margin hidden-text-box';

  $hobbyHeading.className = 'less-margin';
  $catchphraseHeading.className = 'less-margin';
  $sayingHeading.className = 'less-margin';
}

function saveFavoriteVillager() {
  var villagerData = villagerList[modalVillagerNumber];

  var favoriteVillagerInformation = {
    favoriteOrder: data.nextFavorite,
    villagerId: modalVillagerNumber,
    villagerPicture: villagerData.image_uri,
    villagerName: villagerData.name['name-USen'],
    formValues: null
  };
  modalVillagerNumber = 0;
  data.nextFavorite++;
  data.favoritesList.push(favoriteVillagerInformation);
  return favoriteVillagerInformation;

}

var changeNavClassToFavorites = [[$favoritesPageIcon, 'fa-solid fa-heart nav-icon currently-island'], [$navFavoriteText, 'nav-home favorites-page-link currently-island'],
  [$homePageIcon, 'fa-solid fa-house nav-icon house-outline'], [$navHomeText, 'nav-home home-page-link']];

var changeNavClassToHome = [[$favoritesPageIcon, 'fa-solid fa-heart nav-icon house-outline'],
  [$homePageIcon, 'fa solid fa-house nav-icon currently-island'],
  [$navFavoriteText, 'nav-home favorites-page-link'],
  [$navHomeText, 'nav-home home-page-link currently-island']];

$navBar.addEventListener('click', changeNavIconAndPage);
function changeNavIconAndPage(event) {
  var navCheck = event.target.className;
  if (navCheck === 'fa-solid fa-heart nav-icon house-outline' || navCheck === 'nav-home favorites-page-link' || navCheck === 'favorites-page-link') {
    data.view = 'favorites-view';
    switchViews(data.view);
  }

  if (navCheck === 'fa-solid fa-house nav-icon house-outline' || navCheck === 'nav-home home-page-link' || navCheck === 'home-page-link') {
    data.view = 'home-view';
    switchViews(data.view);
  }

  if (data.view === 'favorites-view') {
    for (var i = 0; i < changeNavClassToFavorites.length; i++) {
      changeNavClassToFavorites[i][0].className = changeNavClassToFavorites[i][1];
    }
  } else {
    for (var x = 0; x < changeNavClassToHome.length; x++) {
      changeNavClassToHome[x][0].className = changeNavClassToHome[x][1];
    }
  }
}

if (data.view === 'home-view') {
  switchViews(data.view);
  for (var x = 0; x < changeNavClassToHome.length; x++) {
    changeNavClassToHome[x][0].className = changeNavClassToHome[x][1];
  }
} else if (data.view === 'add-info' || data.view === 'favorites-view') {
  switchViews(data.view);
  for (var i = 0; i < changeNavClassToFavorites.length; i++) {
    changeNavClassToFavorites[i][0].className = changeNavClassToFavorites[i][1];
  }
}

function switchViews(view) {
  for (var i = 0; i < $viewSwapping.length; i++) {
    if ($viewSwapping[i].getAttribute('data-view') === view) {
      $viewSwapping[i].className = 'page';
    } else {
      $viewSwapping[i].className = 'hidden';
    }
  }
}

function createFavoritesList(favorite) {
  var $li = generateDomTree('li', { class: 'row', id: favorite.villagerId },
    [generateDomTree('div', { class: 'column-third row justify-center' }, [
      generateDomTree('img', { class: 'favorite-image', alt: favorite.villagerName + ' Photo', src: favorite.villagerPicture }, [])]),
    generateDomTree('div', { class: 'column-two-third', id: favorite.villagerName }, [
      generateDomTree('h1', { class: 'no-top-margin', textContent: favorite.villagerName }),
      generateDomTree('div', { class: 'add-edit', 'data-view': 'add-info' }, [
        generateDomTree('a', { class: 'align-items' }, [
          generateDomTree('div', { class: 'pencil-icon-container align-items justify-center nav-link' }, [
            generateDomTree('img', { class: 'edit-icon', src: 'images/pencil-icon.webp', alt: 'Edit Icon' })]),
          generateDomTree('p', { class: 'light-weight no-margin', textContent: 'Add/Edit Information' })
        ])
      ])
    ])
    ]
  );
  $ul.appendChild($li);
}

var loadingIcon = document.querySelector('.lds-ring.hidden');
document.addEventListener('readystatechange', loadingCursor);
function loadingCursor(event) {
  if (document.readyState === 'loading' || document.readyState === 'interactive') {
    loadingIcon.className = 'lds-ring';
  } else {
    loadingIcon.className = 'lds-ring hidden';
  }
}

document.addEventListener('DOMContentLoaded', appendFavoriteVillagersToFavoritesPage);
function appendFavoriteVillagersToFavoritesPage(event) {
  data.editing = false;
  for (var i = 0; i < data.favoritesList.length; i++) {
    var favorite = data.favoritesList[i];
    createFavoritesList(favorite);
    if (favorite.formValues !== null) {
      addFavoritesInformationToDom(favorite);
    }
  }

  if (data.favoritesList.length > 0) {
    $noFavoritesContainer.className = 'hidden';
  }
}

var $placeholderImage = document.querySelector('#placeholder');
$favoritesList.addEventListener('click', changeScreenToAddEditForm);
function changeScreenToAddEditForm(event) {
  if (event.target.className === 'edit-icon' || event.target.className === 'light-weight no-margin') {
    data.view = 'add-info';
    switchViews(data.view);
    var $closestVillager = event.target.closest('li');
    var $villagerID = $closestVillager.getAttribute('id');
    for (var i = 0; i < data.favoritesList.length; i++) {
      if ($villagerID === data.favoritesList[i].villagerId) {
        var $villagerGet = data.favoritesList[i];
        data.editingNumber = i;
        $placeholderImage.setAttribute('src', $villagerGet.villagerPicture);
        $placeholderImage.setAttribute('alt', $villagerGet.villagerName + "'s Photo.");
        if ($villagerGet.formValues !== null) {
          data.editing = true;
          $addEditForm.elements.island.value = $villagerGet.formValues.islandStatus;
          $addEditForm.elements.photo.checked = $villagerGet.formValues.photoCollected;
          $addEditForm.elements.notes.value = $villagerGet.formValues.notes;
        }
      }
    }
    $addInformationScreen.className = 'container padding-top';
  }

}

var $addEditForm = document.querySelector('form');
$addEditForm.addEventListener('submit', saveInformation);
function saveInformation(event) {
  var villagerNumber = data.editingNumber;
  event.preventDefault();
  var formInputValues = {
    islandStatus: $addEditForm.elements.island.value,
    photoCollected: $addEditForm.elements.photo.checked,
    notes: $addEditForm.elements.notes.value
  };

  data.favoritesList[villagerNumber].formValues = formInputValues;
  $placeholderImage.setAttribute('src', 'images/placeholder-image-square-1.jpg');
  $placeholderImage.setAttribute('alt', 'Placeholder Image');
  $addEditForm.reset();
  data.view = 'favorites-view';
  switchViews(data.view);
  addFavoritesInformationToDom(data.favoritesList[villagerNumber]);
  $addInformationScreen.className = 'hidden';
}

function addFavoritesInformationToDom(favorite) {
  var $liUpdate = document.getElementById(favorite.villagerName);
  var islandValue = favorite.formValues.islandStatus;
  var islandText = null;
  var islandClass = null;
  var photoValue = favorite.formValues.photoCollected;
  var notesValue = favorite.formValues.notes;
  var boxClass = null;

  if (islandValue === 'formerly') {
    islandClass = 'formerly-island';
    islandText = 'Formerly on island';
  } else if (islandValue === 'currently') {
    islandClass = 'currently-island';
    islandText = 'Currently on island';
  } else {
    islandClass = 'wish-island';
    islandText = 'Wish on island';
  }

  if (photoValue === true) {
    boxClass = 'checked fa-solid fa-square-check';
  } else {
    boxClass = 'unchecked fa-regular fa-square';
  }

  var $responseRow =
    generateDomTree('div', { id: 'id-' + favorite.favoriteOrder, class: 'row shrink-indicator' }, [
      generateDomTree('div', { class: 'column-one-half' }, [
        generateDomTree('p', { class: islandClass, textContent: islandText })]),
      generateDomTree('div', { class: 'column-one-half' }, [
        generateDomTree('p', { class: 'photo-response inline-block', textContent: 'Photo Collected: ' }),
        generateDomTree('i', { class: boxClass })
      ]),
      generateDomTree('p', { class: 'text-response', textContent: notesValue })]);

  if (data.editing === true) {
    data.editing = false;
    var $replaceRow = document.querySelector('#id-' + favorite.favoriteOrder);
    $replaceRow.replaceWith($responseRow);
    return;
  }

  $liUpdate.appendChild($responseRow);

}

$addInformationScreen.addEventListener('click', cancelEntries);
function cancelEntries(event) {
  if (event.target.tagName === 'A') {
    $addEditForm.reset();
    data.view = 'favorites-view';
    switchViews(data.view);
    $placeholderImage.setAttribute('src', 'images/placeholder-image-square-1.jpg');
    $placeholderImage.setAttribute('alt', 'Placeholder Image');
  }
}
