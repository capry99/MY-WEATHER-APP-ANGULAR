import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  cityName = ''; // Variable para almacenar el nombre de la ciudad ingresada
  countryCode = ''; // Variable para almacenar el código de país ingresado
  cities: any[] = []; // Arreglo para almacenar los datos de las ciudades buscadas

  constructor(private http: HttpClient) {}

  search() {
    this.http
      .get<any>(
        `https://api.openweathermap.org/data/2.5/weather?q=${this.cityName},${this.countryCode}&lang=sp&appid=2b9b43f480cdb2dcbdeee1fbae62487e&units=metric`
      )
      .subscribe((data) => {
        console.log(data);
        const cityData = {
          name: data.name,
          countryCode: this.countryCode.toUpperCase(),
          weatherIcon: data.weather[0].icon,
          temperature: data.main.temp,
          humidity: data.main.humidity,
          latitude: data.coord.lat,
          longitude: data.coord.lon,
          description: data.weather[0].description,
          windSpeed: data.wind.speed,
        };
        this.cities.push(cityData); // Agrega los datos de la ciudad al arreglo cities
        this.cityName = ''; // Restablece el valor de cityName a una cadena vacía
        this.countryCode = ''; // Restablece el valor de countryCode a una cadena vacía
      });
  }

  getWeatherIconUrl(icon: string): string {
    return `http://openweathermap.org/img/w/${icon}.png`;
  }

  deleteCity(city: any) {
    const index = this.cities.indexOf(city);
    if (index !== -1) {
      this.cities.splice(index, 1); // Elimina la ciudad del arreglo cities
    }
  }
}
