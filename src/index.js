console.log('%c HI', 'color: firebrick')
let breeds =[]
document.addEventListener('DOMContentLoaded', function () {
  fetchDog();
  getAllBreed();
});

function fetchDog(){
  const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
  fetch(imgUrl)
  .then((resp)=>resp.json())
  .then((data)=>{data.message.forEach(image => addImage(image))})
}
function addImage(dogImg) {
  let container = document.querySelector('#dog-image-container');
  let newImage = document.createElement('img');
  newImage.src = dogImg;
  container.appendChild(newImage);
}

function getAllBreed() {
  const breedUrl = 'https://dog.ceo/api/breeds/list/all'
  fetch(breedUrl)
    .then(res => res.json())
    .then(data => {

      breeds = Object.keys(data.message);
      updateBreedList(breeds);
      breedEventListener();
    });
}

function updateBreedList(breeds) {
  let ul = document.querySelector('#dog-breeds');
  removeChildren(ul);
  breeds.forEach(breed => addBreed(breed));
}

function removeChildren(element) {
  let child = element.lastElementChild;
  while (child) {
    element.removeChild(child);
    child = element.lastElementChild;
  }
}

function selectBreedsStartingWith(letter) {
  updateBreedList(breeds.filter(breed => breed.startsWith(letter)));
}

function breedEventListener() {
  let dropdown = document.querySelector('#breed-dropdown');
  dropdown.addEventListener('change', function (event) {
    selectBreedsStartingWith(event.target.value);
  });
}

function addBreed(breed) {
  let ul = document.querySelector('#dog-breeds');
  let li = document.createElement('li');
  li.innerText = breed;
  li.style.cursor = 'pointer';
  ul.appendChild(li);
  li.addEventListener('click', updateColor);
}

function updateColor(event) {
  event.target.style.color = 'brown';
}

