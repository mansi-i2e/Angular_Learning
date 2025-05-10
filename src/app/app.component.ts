import { Component } from '@angular/core';
import { RouterLink, RouterOutlet, RouterLinkActive } from '@angular/router';
import { MasterComponent } from './components/master/master.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MasterComponent, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'my_angular_project';
}
