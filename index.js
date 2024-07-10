const getInfo = async (event) => {
    event.preventDefault();
    
    const city_name = document.getElementById("cityname");
    const temp = document.querySelector('.temp');
    const temp_range = document.querySelector('.tempmin_max');
    const location = document.querySelector('.location');
    const weatherCon = document.querySelector('#weatherCon');

    let cityVal = city_name.value;

    if (cityVal === "") {
        location.innerText = "Please write the name before search";
    } else {
        try {
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityVal}&appid=88b70016c9d85f615f1d509a8e09ee20&units=metric`;
            const response = await fetch(url);
            const data = await response.json();

            if (data.cod === "404") {
                location.innerText = "Please enter the city name properly";
            } else {
                temp.innerText = `${data.main.temp}°C`;
                temp_range.innerHTML = `Min ${data.main.temp_min}°C | Max ${data.main.temp_max}°C`;
                location.innerText = `${data.name}, ${data.sys.country}`;

                let tempStatus = data.weather[0].main;

                if (tempStatus === "Clear") {
                    weatherCon.innerHTML = '<i class="fa-solid fa-sun" style="color:#e5d65e"></i>';
                } else if (data.main.temp <=15) {
                    weatherCon.innerHTML = '<i class="fa-solid fa-temperature-arrow-down style="color:#ffffff" ></i>';
                } else if (tempStatus === "Rain") {
                    weatherCon.innerHTML = "<i class='fa-solid fa-cloud-rain' style='color:#ffffff'></i>";
                }else if (tempStatus=='Haze'){
                    weatherCon.innerHTML='<i class="fa-solid fa-smog"></i>'; 
                } else {
                    weatherCon.innerHTML = '<i class="fa-solid fa-cloud-sun" style="color:#e5d65e"></i>';
                }
            }
        } catch (error) {
            location.innerText = "Please enter the city name properly";
        }
    }
}

const getCurrentDay = () => {
    const weekday = ["Sunday", "Mon", "Tue", "Wed", "Thu", "Friday", "Sat"];
    const months = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];

    let currentTime = new Date();
    var month = months[currentTime.getMonth()];
    var week = weekday[currentTime.getDay()];
    var day = currentTime.getDate();
    var hour = currentTime.getHours();
    let ending = "AM";
    if (hour > 11) {
        ending = "PM";
    }
    if (hour > 12) {
        hour -= 12;
    }
    const min = currentTime.getMinutes().toString().padStart(2, '0');
    return `${week} | ${month} ${day} | ${hour}:${min} ${ending}`;
};

const current_specs = getCurrentDay();
document.getElementById("date").innerHTML = current_specs;

const submitBtn = document.getElementById('searchbutton');
submitBtn.addEventListener('click', getInfo);
var input = document.getElementById("myInput");

submitBtn.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    getInfo();
   
  }
});

