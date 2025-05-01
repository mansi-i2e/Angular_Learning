import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-roles',
  imports: [FormsModule],
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.css'
})
export class RolesComponent {
  // variable declaration
  firstName: string = "My Angular Project";
  angularVersion = "Version 19";

  version: number = 18;

  isActive: boolean = true;

  currentDate: Date = new Date();

  inputType: string = "radio";

  inputType1: string = "checkbox"

  selectedState: string = '';

  showWelcomeAlert() {
    alert("Welcome to Angular 18 Tutorial")
  }

  showMessage(message: string) {
    alert(message)
  }

}