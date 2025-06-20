import { Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClientService } from '../../services/client.service';
import { APIResponseModel, ClientProject } from '../../model/interface/role';
import { Employee } from '../../model/interface/role';
import { Client } from '../../model/class/client';
import { CommonModule, DatePipe } from '@angular/common';
import { AlertComponent } from "../../reusableComponent/alert/alert.component";

@Component({
  selector: 'app-client-project',
  imports: [ReactiveFormsModule, CommonModule, DatePipe, AlertComponent],
  templateUrl: './client-project.component.html',
  styleUrl: './client-project.component.css'
})
export class ClientProjectComponent implements OnInit {

  projectForm: FormGroup = new FormGroup({
    clientProjectId: new FormControl(0),  // primary key
    projectName: new FormControl("", [Validators.required, Validators.minLength(4)]),
    startDate: new FormControl(""),
    expectedEndDate: new FormControl(""),
    leadByEmpId: new FormControl(""),  // foreign key
    completedDate: new FormControl(""),
    contactPerson: new FormControl(""),
    contactPersonContactNo: new FormControl(""),
    contactPersonEmailId: new FormControl(""),
    totalEmpWorking: new FormControl(""),
    projectCost: new FormControl(""),
    projectDetails: new FormControl(""),
    clientId: new FormControl(""),   // foreign key
  })

  clientSrv = inject(ClientService)
  empList: Employee[] = [];
  clientList: Client[] = [];

  firstName = signal("Angular 18");
  projList = signal<ClientProject[]>([])

  changeFName() {
    this.firstName.set("React")
  }

  ngOnInit(): void {
    this.getAllClient();
    this.getAllEmployee();
    this.getAllProj();
  }

  getAllEmployee() {
    this.clientSrv.getllEmployee().subscribe((res: APIResponseModel) => {
      this.empList = res.data;
    })
  }
  getAllClient() {
    this.clientSrv.getllEmployee().subscribe((res: APIResponseModel) => {
      this.clientList = res.data;
    })
  }

  getAllProj() {
    this.clientSrv.getAllProj().subscribe((res: APIResponseModel) => {
      // this.projList = res.data;
      this.projList.set(res.data);
    })
  }

  onSaveProject() {
    const formValue = this.projectForm.value;
    debugger;
    this.clientSrv.addUpdateClientProject(formValue).subscribe((res: APIResponseModel) => {
      if (res.result) {
        alert("Project created")
      }
      else {
        alert(res.message)
      }
    })
  }
}
