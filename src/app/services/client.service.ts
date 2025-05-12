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

  constructor(private http: HttpClient) {}

  getAllClients(): Observable<APIResponseModel> {
    return this.http.get<APIResponseModel>(`${this.apiBaseUrl}GetAllClients`);
  }

  addUpdate(obj: Client): Observable<APIResponseModel> {
    return this.http.post<APIResponseModel>(`${this.apiBaseUrl}AddUpdateClient`, obj);
  }

  deleteClient(id: number): Observable<APIResponseModel> {
    return this.http.delete<APIResponseModel>(`${this.apiBaseUrl}DeleteClientByClientId?clientId=${id}`);
  }
}