import { Injectable, inject } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {first, map} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  http = inject(HttpClient);

  private readonly baseURL = 'https://api.openweathermap.org/data/2.5/weather?q=';
  private readonly forcastURL = 'https://api.openweathermap.org/data/2.5/forecast?q=';
  private readonly appID = environment.appID;

  getWeather(city: string, metric: 'metric' | 'imperial' = 'metric'): Observable<any> {
    return this.http.get(
      `${this.baseURL}${city}&units=${metric}&APPID=${this.appID}`);
  }

  getForecast(city: string, metric: 'metric' | 'imperial' = 'metric'): Observable<any> {
    return this.http.get<any>(
      `${this.forcastURL}${city}&units=${metric}&APPID=${this.appID}`)
      .pipe(map((weather) => weather.list));
  }
}
