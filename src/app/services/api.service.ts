import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ReplaySubject } from 'rxjs';
import { Person } from '../models/person';
import { environment } from '../../../src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private _people: ReplaySubject<Person []>;
  private _endpoint = environment.apiEndpint;

  constructor(private http: HttpClient) { }

  public getPeople() {
    return this.http.get<Person []>(`${this._endpoint}/people`);
  }

  public get people() {
    if (!this._people) {
      this._people = new ReplaySubject<Person []>(1);
      this.getPeople().subscribe(p => this._people.next(p));
    }
    return this._people;
  }
}
