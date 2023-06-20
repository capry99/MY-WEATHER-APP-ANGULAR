import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css'],
})
export class WeatherComponent {
  @Input() city: any;

  getWeatherIconUrl(icon: string): string {
    return `http://openweathermap.org/img/w/${icon}.png`;
  }
}
