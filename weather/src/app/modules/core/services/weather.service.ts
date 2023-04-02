import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {map} from "rxjs";

@Injectable({ providedIn: 'root' })
export class WeatherService{

  url = 'https://api.openweathermap.org/data/2.5/weather';
  private headers = new HttpHeaders({
    'X-RapidAPI-Key': 'd50f3c073dmsh609e884b4ae6a1fp18b0bcjsnd38469ec4816',
    'X-RapidAPI-Host': 'visual-crossing-weather.p.rapidapi.com'
  });

  constructor(private http: HttpClient) {
  }

  getCoordinates() {
    return this.http
      .get('https://ipgeolocation.abstractapi.com/v1/?api_key=24e3964aabfe4a7fac2f419b7b69fe4f').pipe(
        map((res: any) => {
          return {
            latitude: res.latitude,
            longitude: res.longitude
          };
        })
      )
  }

  getWeatherByCoordinates(coordinates: {latitude: number, longitude: number}){
    const params = new HttpParams({
      fromObject: {
        lat: coordinates.latitude,
        lon: coordinates.longitude,
        appid: 'c3531d3d912deaa70b85baa88117d8b5'
      }}
    )
    return this.http.get<any>(`${this.url}`, { params });
  }

  getWeatherByCity(city: string){
    const params = new HttpParams({
      fromObject: {
        startDateTime: '2019-01-01T00:00:00',
        aggregateHours: '24',
        location: 'Kraków',
        endDateTime: '2019-01-03T00:00:00',
        unitGroup: 'metric',
        dayStartTime: '8:00:00',
        contentType: 'json',
        dayEndTime: '17:00:00',
        shortColumnNames: '0'
      }}
    )
    return this.http.get<any>(`https://visual-crossing-weather.p.rapidapi.com/history`, {
      headers: this.headers,
      params: params
    });
  }

}
