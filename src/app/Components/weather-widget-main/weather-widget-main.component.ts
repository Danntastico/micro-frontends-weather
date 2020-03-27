import { Component, OnInit } from '@angular/core';
import { faSun} from '@fortawesome/free-solid-svg-icons';
import { faMoon} from '@fortawesome/free-solid-svg-icons';
import { faCloud} from '@fortawesome/free-solid-svg-icons';
 
@Component({
  selector: 'app-weather-widget-main',
  templateUrl: './weather-widget-main.component.html',
  styleUrls: ['./weather-widget-main.component.scss']
})
export class WeatherWidgetMainComponent implements OnInit {
  faSun = faSun;
  faMoon = faMoon;
  faCloud = faCloud;
  WeatherData: any;
  constructor() { }

  ngOnInit(): void {
    this.WeatherData = {
      main: {},
      isDay: true
    }

    this.getWeatherData();
    console.log(this.WeatherData)
  }

  getWeatherData() {
    fetch('http://api.openweathermap.org/data/2.5/weather?id=3688685&appid=b520871a169f5634fd348a042ff5e220')
    .then(response=>response.json())
    .then(data => {this.setWeatherData(data);})
    let data = JSON.parse('{"coord":{"lon":-74.18,"lat":4.25},"weather":[{"id":721,"main":"Haze","description":"haze","icon":"50n"}],"base":"stations","main":{"temp":286.15,"feels_like":284.38,"temp_min":286.15,"temp_max":286.15,"pressure":1031,"humidity":82},"visibility":9000,"wind":{"speed":2.6,"deg":20},"clouds":{"all":75},"dt":1585027056,"sys":{"type":1,"id":8582,"country":"CO","sunrise":1585047535,"sunset":1585091195},"timezone":-18000,"id":3688685,"name":"Bogota D.C.","cod":200}');
    this.setWeatherData(data);
  }
  setWeatherData(data) {
    this.WeatherData = data;
    let sunsetTime = new Date(this.WeatherData.sys.sunset * 1000);
    this.WeatherData.sunset_time = sunsetTime.toLocaleTimeString();
    let currentDate = new Date();
    this.WeatherData.isDay = (currentDate.getTime() < sunsetTime.getTime());
    this.WeatherData.temp_celcius = (this.WeatherData.main.temp - 273.15).toFixed(0);
    this.WeatherData.temp_min = (this.WeatherData.main.temp_min - 273.15).toFixed(0);
    this.WeatherData.temp_max = (this.WeatherData.main.temp_max - 273.15).toFixed(0);
    this.WeatherData.temp_feels_like = (this.WeatherData.main.feels_like - 273.15).toFixed(0);

  }
}
