const cityName = document.getElementById('cityName');

const submitBtn = document.getElementById('submitBtn');

const city_name = document.getElementById('city_name');

const temp_real_val = document.getElementById('temp_real_val');
const temp_status = document.getElementById('temp_status');

const datahide = document.querySelector('.middle_layer');

const curdate = document.getElementById('date');

const getCurrentDay = () => {
    var weekday = new Array(7);
    weekday[0] = "Sunday"
    weekday[1] = "Monday"
    weekday[2] = "Tueday"
    weekday[3] = "Wedday"
    weekday[4] = "Thurday"
    weekday[5] = "Friday"
    weekday[6] = "Satday"

    let currentTime = new Date();
    let day = weekday[currentTime.getDay()];
    return day;
}

const getCurrentTime = () => {
    var months = [
        "January",
        "Febuary", 
        "March",
        "April", 
        "May",
        "June",
        "July",
        "August",
        "September", 
        "October", 
        "November",
        "December"
    ];
    
    var now = new Date();
    var month = months[now.getMonth()];
    var date = now.getDate();
    let year = now.getFullYear();

    let hours = now.getHours();
    let mins = now.getMinutes();


    let periods = "AM";

    if(hours > 11) {
        periods = "PM";
        if(hours > 12) {
            hours -= 12;
        }
    }
    if(mins < 10) {
        mins = "0" + mins;
    }
    return `${month} ${date} ${year} | ${hours} : ${mins} ${periods}`;
}

//getCurrentDay();
//getCurrentTime();

curdate.innerHTML = getCurrentDay() + " | " + getCurrentTime();

const getInfo = async(event) => {
    event.preventDefault();

    let cityVal = cityName.value;

    if(cityVal === "") {
        city_name.innerText = `Please Enter the City name`;
        datahide.classList.add('data_hide');
    }
    else {
        try {
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityVal}&units=metric&appid=6d9467b3fe67cc9a07afbbec841a0ca0`;
            const response = await fetch(url);
            // console.log(response);
            const data = await response.json();
            // console.log(data);
            const arrData = [data];
            // console.log(arrData);

            city_name.innerText = `${arrData[0].name}, ${arrData[0].sys.country}`;
            temp_real_val.innerText = arrData[0].main.temp;

            const tempMood = arrData[0].weather[0].main;

            // Conditions to check sunny or cloudy
            if(tempMood == 'Clear') {
                temp_status.innerHTML = '<i class="fa-solid fa-sun" style= "color: #eccc68;"></i>';
            }
            else if(tempMood == 'Clouds') {
                temp_status.innerHTML = '<i class="fa-solid fa-cloud" style= "color: #f1f2f6;"></i>';
            }
            else if(tempMood == 'Rain') {
                temp_status.innerHTML = '<i class="fa-solid fa-rain" style= "color: #a4b0be;"></i>';
            }
            else {
                temp_status.innerHTML = '<i class="fa-solid fa-sun" style= "color: #f1f2f6;"></i>';
            }

            datahide.classList.remove('data_hide');
             
        }
        catch {
            city_name.innerText = `Please Enter a valid City name`;
            datahide.classList.add('data_hide');
        }
    }
}

submitBtn.addEventListener('click', getInfo);