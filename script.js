let allCountries = [];

const container = document.getElementById('countries');
const searchInput = document.getElementById('search');
const darkModeBtn = document.getElementById('darkMod');

// Загружаем данные
fetch("https://cdn.jsdelivr.net/npm/world-countries@5.1.0/countries.json")
    .then(res => res.json())
    .then(data => {
        allCountries = data;
        displayCountries(allCountries);
    })
    .catch(error => console.log(error));

// Функция для показа стран
function displayCountries(countries) {
    container.innerHTML = "";

    countries.forEach(country => {
        const card = document.createElement('div');
        card.classList.add('country');

        // Надежно ищем флаг: сначала svg, потом png, либо через код страны
        let flagSrc = '';
        if (country.flags && country.flags.svg) {
            flagSrc = country.flags.svg;
        } else if (country.flags && country.flags.png) {
            flagSrc = country.flags.png;
        } else if (country.cca2) {
            flagSrc = `https://flagcdn.com/w320/${country.cca2.toLowerCase()}.png`;
        }

        const name = country.name && country.name.common ? country.name.common : 'Нет названия';

        card.innerHTML = `
            <img src="${flagSrc}" alt="${name} flag" style="width: 100%; display: block;">
            <h3>${name}</h3>
        `;

        container.appendChild(card);
    });
}

// Поиск стран
searchInput.addEventListener('input', (e) => {
    const text = e.target.value.toLowerCase();
    
    const filtered = allCountries.filter(country => {
        const name = country.name && country.name.common ? country.name.common.toLowerCase() : '';
        return name.includes(text);
    });

    displayCountries(filtered);
});

// Переключение темной темы
darkModeBtn.addEventListener('click', () => {
    document.body.classList.toggle('active-dark');
});