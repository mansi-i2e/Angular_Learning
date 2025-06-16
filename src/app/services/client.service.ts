import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from '../model/class/client';
import { APIResponseModel } from '../model/interface/role';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private apiBaseUrl = 'api/api/ClientStrive/'; // Proxied path

  constructor(private http: HttpClient) { }

  getAllUsers(){
    return this.http.get("https://jsonplaceholder.typicode.com/users")
  }

  getAllClients(): Observable<APIResponseModel> {
    return this.http.get<APIResponseModel>(`${this.apiBaseUrl}GetAllClients`);
  }

  getllEmployee(): Observable<APIResponseModel> {
    return this.http.get<APIResponseModel>(`${this.apiBaseUrl}GetAllEmployee`);
  }

  addUpdate(obj: Client): Observable<APIResponseModel> {
    return this.http.post<APIResponseModel>(`${this.apiBaseUrl}AddUpdateClient`, obj);
  }

  deleteClient(id: number): Observable<APIResponseModel> {
    return this.http.delete<APIResponseModel>(`${this.apiBaseUrl}DeleteClientByClientId?clientId=${id}`);
  }

  addUpdateClientProject(obj: Client): Observable<APIResponseModel> {
    return this.http.post<APIResponseModel>(`${this.apiBaseUrl}AddUpdateClientProject`, obj);
  }
}