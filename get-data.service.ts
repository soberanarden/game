import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Question, SlidesData } from './interfaces/question.interface';

@Injectable({
  providedIn: 'root',
})
export class GetDataService {
  private data!: Observable<SlidesData>;
  private localStorageKey = 'data';

  constructor(private http: HttpClient) {
    try {
      const data = localStorage.getItem(this.localStorageKey);
      if (data) {
        const parsedData = JSON.parse(data);
        this.data = of(parsedData);
      }
    } catch (ingored) {}
  }

  public getData(): Observable<SlidesData> {
    if (this.data) {
      return this.data;
    }
    return this.http.get<SlidesData>('./../assets/convertjson.json');
  }

  public saveData(data: SlidesData): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(data));
  }
}
