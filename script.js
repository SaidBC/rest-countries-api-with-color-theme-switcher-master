const apiDataUrl = './data.json';
const mainContainer = document.querySelector('.main-container');
const mainElement = document.querySelector('main')
const countriesContainer = document.querySelector('.countries-container')
// main page counrty Box
const countryBox = (element) => {
    const countryContainer = document.createElement('a');
    countryContainer.href = `?query=${element.alpha2Code}`
    countryContainer.classList.add('country-container');
    const countryFlag = document.createElement('img');
    countryFlag.setAttribute('src', element.flags.png)
    countryFlag.setAttribute('alt', element.name + ' Flag');
    const countryContent = document.createElement('div');
    countryContent.classList.add('country-content')
    const counrtyNameHeading = document.createElement('h2');
    counrtyNameHeading.textContent = element.name;
    const countryDetails = document.createElement('div');
    countryDetails.classList.add('details')
    const countryPopulation = document.createElement('p')
    const countryRegion = document.createElement('p')
    const countryCapital = document.createElement('p');

    countryPopulation.innerHTML = `<b>Population: </b><span>${element.population}</span>`;
    countryRegion.innerHTML = `<b>Region: </b><span>${element.region}</span>`;
    countryCapital.innerHTML = `<b>Capital: </b><span>${element.capital}</span>`;
    // append Element :
    countriesContainer.appendChild(countryContainer);
    countryContainer.appendChild(countryFlag)
    countryContainer.appendChild(countryContent)
    countryContent.appendChild(counrtyNameHeading)
    countryContent.appendChild(countryDetails)
    countryDetails.appendChild(countryPopulation)
    countryDetails.appendChild(countryRegion)
    countryDetails.appendChild(countryCapital)
}
// Separated Page Country Data;
const countryData = (element, allCountries) => {
    const forward = document.createElement('div');
    forward.classList.add('forward-link')
    const backLink = document.createElement('a');
    backLink.href = './'
    backLink.classList.add('back')
    const backIcon = document.createElement('i');
    backIcon.className = 'fa-solid fa-arrow-left-long';
    const backSpan = document.createElement('span');
    backSpan.textContent = 'Back'
    const _countryData = document.createElement('div');
    _countryData.classList.add('country-data');
    const countryFlag = document.createElement('div');
    countryFlag.classList.add('country-flag')
    const flag = document.createElement('img');
    flag.setAttribute('src', element.flags.png)
    flag.setAttribute('alt', element.name + ' Flag');
    const dataDetails = document.createElement('div');
    dataDetails.classList.add('data-details');
    const countryName = document.createElement('h1');
    countryName.textContent = element.name;
    const data = document.createElement('div');
    data.classList.add('data')
    const dataParentList = document.createElement('ul');
    const countriesBorder = document.createElement('div');
    countriesBorder.classList.add('countries-border');
    const countriesBorderBold = document.createElement('b');
    countriesBorderBold.textContent = 'Border Countries:';
    const countriesBorderLinks = document.createElement('div')
    // append elements

    mainElement.appendChild(forward);
    forward.appendChild(backLink);
    backLink.appendChild(backIcon)
    backLink.appendChild(backSpan)

    mainElement.appendChild(_countryData);
    _countryData.appendChild(countryFlag);
    countryFlag.appendChild(flag);
    _countryData.appendChild(dataDetails);
    dataDetails.appendChild(countryName)
    dataDetails.appendChild(data);
    data.appendChild(dataParentList)
    const dataListArray = [[`<b>Native Name:</b> ${element.nativeName}`, `<b>Population:</b> ${element.population}`, `<b>Region:</b> ${element.region}`, `<b>Sub Region:</b> ${element.subregion}`, `<b>Capital:</b> ${element.capital}`], [`<b>Top Level Domain:</b> ${element.topLevelDomain.join(' ')}`, `<b>Currencies:</b> ${element.currencies.map(e => e.code).join(' ')}`, `<b>Languanges:</b> ${element.languages.map(e => e.name).join(' ')}`]]
    for (let i = 0; i < 2; i++) {
        const dataList = document.createElement('ul');
        if (i == 0) {
            for (let i = 0; i < 5; i++) {
                const dataItems = document.createElement('li');
                dataItems.innerHTML = dataListArray[0][i]
                dataList.appendChild(dataItems)
            }
        } else if (i == 1) {
            for (let i = 0; i < 3; i++) {
                const dataItems = document.createElement('li');
                dataItems.innerHTML = dataListArray[1][i]
                dataList.appendChild(dataItems)
            }
        }

        dataParentList.appendChild(dataList)
    }
    dataDetails.appendChild(countriesBorder);
    countriesBorder.appendChild(countriesBorderBold)
    countriesBorder.appendChild(countriesBorderLinks)
    const countriesBorderArray = element.borders;
    const filteredCountries = allCountries.filter(ele => {
        return countriesBorderArray.includes(ele.alpha3Code);
    })
    for (let i = 0; i < countriesBorderArray.length; i++) {
        const countriesBorderLink = document.createElement('a');
        countriesBorderLink.href = `?query=${filteredCountries[i].alpha2Code}`
        countriesBorderLink.textContent = filteredCountries[i].name;
        countriesBorderLinks.appendChild(countriesBorderLink)
    }
}

// User INPUT
const userIpnut = document.getElementById('search-input');
const selectRegion = document.getElementById('select-region');
const checkBoxToggle = document.querySelector('.toggle');
const checkBoxToggleHandler = document.querySelector('.toggle-handler');
if (window.localStorage.getItem('dark_mode') == 'true') {
    checkBoxToggle.checked = true;
    mainContainer.classList.add('dark-mode');
}
checkBoxToggle.addEventListener('change', () => {

    if (checkBoxToggle.checked) {
        mainContainer.classList.add('dark-mode');
        window.localStorage.setItem('dark_mode', true)

    } else {
        mainContainer.classList.remove('dark-mode');
        window.localStorage.setItem('dark_mode', false)

    }
})
checkBoxToggleHandler.addEventListener('click', () => {
    checkBoxToggle.checked = !checkBoxToggle.checked;
    if (checkBoxToggle.checked) {
        mainContainer.classList.add('dark-mode');
        window.localStorage.setItem('dark_mode', true)
    } else {
        mainContainer.classList.remove('dark-mode');
        window.localStorage.setItem('dark_mode', false);
    }
})
fetch(apiDataUrl).then(res => {
    return res.json()
}).then(data => {
    if (!window.location.search) {

        for (let i = 0; i < data.length; i++) {
            countryBox(data[i]);
        }
        userIpnut.addEventListener('input', (ev) => {
            let filteredCountries = data.filter(ele => {
                return ele.name.toUpperCase().includes(ev.target.value.toUpperCase())
            })
            for (let i = 1; i < 6; i++) {
                if (selectRegion.children[i].selected) {
                    filteredCountries = data.filter(ele => {
                        return ele.region.includes(selectRegion[i].value) && ele.name.toUpperCase().includes(ev.target.value.toUpperCase())
                    })
                }
            }
            countriesContainer.innerHTML = '';
            filteredCountries.forEach(ele => {
                countryBox(ele)
            })
        })
        selectRegion.addEventListener('change', (ev) => {
            if (!ev.target.children[0].selected) {
                countriesContainer.innerHTML = '';
            } else {
                const filteredCountries = data.filter(ele => {
                    return ele.name.toUpperCase().includes(userIpnut.value.toUpperCase())
                })
                countriesContainer.innerHTML = '';
                filteredCountries.forEach(ele => {
                    countryBox(ele)
                })
            }
            for (let i = 1; i < 6; i++) {
                if (ev.target.children[i].selected) {
                    const filteredCountries = data.filter(ele => {
                        return ele.region.includes(ev.target.children[i].value) && ele.name.toUpperCase().includes(userIpnut.value.toUpperCase())
                    })
                    filteredCountries.forEach(ele => {
                        countryBox(ele)
                    })
                }
            }
        })
    } else {
        document.querySelector('.user-input').remove();
        mainElement.classList.add('selected-country-main')
        const filteredCountry = data.filter(ele => {
            return window.location.search.slice(7) == ele.alpha2Code;
        })
        countryData(filteredCountry[0], data)
    }
});