import { Component } from '@angular/core';
import {WeatherService} from "./modules/core/services/weather.service";
import {switchMap, tap} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  constructor(private weatherService: WeatherService) {
  }
  // ip$ = this.weatherService.getCoordinates().pipe(
  //   switchMap(value => {
  //     return this.weatherService.getWeatherByCoordinates(value)
  //   })
  // )

  ip$ = this.weatherService.getWeatherByCity('Krakow').pipe(
    tap(value => console.log(value))
  );
}
