import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { APIResponseModel, IRole } from '../../model/interface/role';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-roles',
  imports: [CommonModule, FormsModule],
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.css'
})
export class RolesComponent {
  // variable declaration
  // firstName: string = "My Angular Project";
  // angularVersion = "Version 19";

  // version: number = 18;

  // isActive: boolean = true;

  // currentDate: Date = new Date();

  // inputType: string = "radio";

  // inputType1: string = "checkbox"

  // selectedState: string = '';

  // showWelcomeAlert() {
  //   alert("Welcome to Angular 18 Tutorial")
  // }

  // showMessage(message: string) {
  //   alert(message)
  // }

  roleList: IRole[] = [];
  http = inject(HttpClient);

  ngOnInit(): void {
    this.getAllRoles()
  }

  getAllRoles() {
    this.http.get<APIResponseModel>("/api/api/ClientStrive/GetAllRoles").subscribe((res: APIResponseModel) => {
      console.log("API Response:", res);
      this.roleList = res.data;
    });
  }


}