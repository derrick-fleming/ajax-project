var $villagerView = document.querySelector('#villager-view');

$villagerView.addEventListener('click', function (event) {
  return event.target;
});

var xhr = new XMLHttpRequest();
xhr.open('GET', 'https://acnhapi.com/v1/villagers');
xhr.responseType = 'json';

function generateList(event) {

}

xhr.addEventListener('load', generateList);

xhr.send();
