import { Component, inject, OnInit } from '@angular/core';
import { Client } from '../../model/class/client';
import { FormsModule } from '@angular/forms';
import { ClientService } from '../../services/client.service';
import { APIResponseModel } from '../../model/interface/role';
import { AsyncPipe, DatePipe, JsonPipe, UpperCasePipe } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-client',
  imports: [FormsModule, UpperCasePipe, DatePipe, JsonPipe,AsyncPipe],
  templateUrl: './client.component.html',
  styleUrl: './client.component.css'
})
export class ClientComponent {

  currentDate: Date = new Date();

  clientObj: Client = new Client();
  clientList: Client[] = [];

  clientService = inject(ClientService)

  userList$: Observable<any> = new Observable<any>

  ngOnInit(): void {
    this.loadClient();
    this.userList$ = this.clientService.getAllUsers();
  }

  loadClient() {
    this.clientService.getAllClients().subscribe({
      next: (res: APIResponseModel) => {
        console.log('API Response:', res); // Log the full response
        this.clientList = res.data || []; // Fallback to empty array if res.data is undefined
      },
      error: (err) => {
        console.error('Error fetching clients:', err); // Log error details
        alert('Failed to load clients. Check console for details.');
      }
    });
  }

  onSaveClient() {
    debugger;
    this.clientService.addUpdate(this.clientObj).subscribe((res: APIResponseModel) => {
      if (res.result) {
        alert("Client created successfully")
        this.loadClient();
        this.clientObj = new Client();
      }
      else {
        alert(res.message)
      }
    })
  }

  onEdit(data: Client) {
    this.clientObj = data;
  }

  onDelete(id: number) {
    const isDelete = confirm("Are you sure you want to delete ");
    if (isDelete) {
      this.clientService.deleteClient(id).subscribe((res: APIResponseModel) => {
        if (res.result) {
          alert("Client deleted successfully")
          this.loadClient();
        }
        else {
          alert(res.message)
        }
      })
    }
  }

}

