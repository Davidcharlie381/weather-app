const search = document.querySelector('.search');
const overlay = document.querySelector('.overlay.hidden');
const clos = document.querySelector('.close');
const mainInputField = document.querySelectorAll('.main-input');
const mainBtn = document.querySelectorAll('.main-btn');


const allowBtn = document.querySelector('.allowBtn');
const endPoint = 'http://dataservice.accuweather.com/locations/v1/topcities/50?apikey=o9I8UmxOErWHZmnRw2WQi755tEID5ZZD';
const dont = document.querySelector('.dont');
const reject = document.querySelector('.reject');
const allow = document.querySelector('.allow');
const barUp = document.querySelector('.bar-up');
const preloader = document.querySelector('.preloader');
const apikey = "o9I8UmxOErWHZmnRw2WQi755tEID5ZZD";
const searchByLoc = "http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?";


search.addEventListener('click', () => {
    overlay.classList.remove('hidden');
    mainInputField.forEach(inputField => inputField.focus());
});

clos.addEventListener('click', () => {
    overlay.classList.add('hidden');
});

mainInputField.forEach(inputField => inputField.addEventListener('change', ()=>{
  mainBtn.forEach(btn => btn.addEventListener('click', () => {
  // async function fetchyTwo() {
  //   const resp = await fetch()
  // }
  document.querySelector('.search-div').style.display = 'none';
  preloader.style.display = 'block';

  console.log('good');
    console.log(inputField.value);
  
    searchValue = inputField.value;
  //console.log(searchValue);

  async function fetchCountry(countryName) {
    const resp = await fetch(`http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${apikey}&q=${countryName}`);
    const data = await resp.json();
    console.log(data);
    const countryNameOne = data[0].Country.EnglishName || countryName;
    const locationKeyOne = data[0].Key;

    getWeather(locationKeyOne, countryNameOne);
  }
 
  fetchCountry(searchValue);

})
)

}) 
)
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const date =  new Date();
const day = date.getDay();
const month = date.getMonth();
const year =  date.getFullYear();

const today = document.querySelector('.day');
today.textContent = days[day];
const thisMonth = document.querySelector('.month-year');
thisMonth.textContent = `${months[month]}, ${year}`;

const confirm = document.querySelector('.confirmation');

setTimeout(() => {
  confirm.classList.remove('hidden')
}, 5000);


const condition = document.querySelector('.desc');
const temp = document.querySelector('.temp-no');
const locus = document.querySelector('.country');


allowBtn.addEventListener('click', function() {
  navigator.geolocation.getCurrentPosition((position) => {
    barUp.style.display = 'none';
    preloader.style.display = 'block';

    let long = position.coords.longitude;
    let lat = position.coords.latitude;

    setTimeout(() => {
      async function fetchy() {
        const resp = await fetch(`${searchByLoc}apikey=${apikey}&q=${lat}%2C${long}`);
        const data = await resp.json();
        //console.log(data)
        //console.log(data.Country.EnglishName);
        //console.log(data.Key);
        const countryName = data.Country.EnglishName;
        const locationKey = data.Key;
        const locationDetails = {countryName, locationKey};
        
        
          
          getWeather(locationKey, countryName)
       }
      
       fetchy()
    }, 2000);

    

  })
})

async function getWeather(locationKey, countryName) {
  const searchByKey = `http://dataservice.accuweather.com/currentconditions/v1/${locationKey}`
  const resp = await fetch(`${searchByKey}?apikey=${apikey}`);
  const data = await resp.json();
  //console.log(data);
  //console.log(data[0].Temperature)
  const temperature = `${data[0].Temperature.Metric.Value}`;
  const weatherCondition = data[0].WeatherText;
  perm.style.display = 'none'
  condition.textContent = weatherCondition;
  temp.textContent = Math.round(temperature);
  locus.textContent = countryName;
}

dont.addEventListener('click', () => {
  confirm.style.display = 'none';
  allow.style.display = 'none';
  reject.style.display = 'block'
})


// async function fetchy() {
//   const resp = await fetch(endPoint);
//   const data = await resp.json();
//   console.log(data)
// }

// fetchy()