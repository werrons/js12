const row = document.querySelector('.row')
const all = document.querySelector('#all')
const search = document.querySelector('#search')
const searchBox = document.querySelector('.search-wrapper')
const searchInput = document.querySelector('#searchInput')
const submit = document.querySelector('#submit')
const poisk = document.querySelector('#poisk')
const country = document.querySelector('#country')
const currency = document.querySelector('#currency')
const flags = document.querySelector('#flags')
const locationCapital = document.querySelector('#locationCapital')
const img = document.querySelector('#img')
const verdict = document.querySelector('#verdict')
const inner = document.querySelector('.inner')


all.addEventListener('change', () => {
    if (all.checked) {
        row.classList.remove('hidden')
        searchBox.classList.add('hidden')
    }
})

search.addEventListener('change', () => {
    if (search.checked) {
        searchBox.classList.remove('hidden')
        row.classList.add('hidden')
    }
})


searchInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        performSearch()
        poisk.click()
    }
});



function performSearch() {
    const value = searchInput.value;
    fetch(`https://restcountries.com/v3.1/name/${value}`)
        .then(res => res.json())
        .then(json => {
            console.log(json)
            img.src = json[0].flags.png
            country.innerHTML = json[0].capital
            fetch(`http://api.weatherapi.com/v1/current.json?key=2ee1be0614a9423caf260947230811&lang=ru&q=${json[0].capital}}`)
                .then(res => res.json())
                .then(json => {
                    console.log(json)
                    locationCapital.innerHTML = json.current.temp_c
                    verdict.innerHTML = json.current.condition.text
                })
        })
    inner.classList.remove('hidden')
}



const handleGetCountries = () => {
    fetch(`https://restcountries.com/v3.1/all`)
        .then(res => res.json())
        .then(json => {
            json.forEach(country => {
                row.innerHTML += `
            <div class = "col-4">
                <div class = "card">
                  <img src="${country.flags.png}" class="card-img-top" alt="...">
                  <div class="card-body">
                  <a href="${country.maps.googleMaps}" target="_blank">Maps</a>
                    <h5 class="card-title">${country.translations.rus.official}<?h5>
                    <p class="card-text">${country.capital}</p>
                  </div>
                </div>
            </div>
            `
            })
        })

}

handleGetCountries()


