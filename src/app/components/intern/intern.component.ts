import { Component, OnInit } from '@angular/core';
import { InternService, Intern } from '../../services/intern.service';
import { DxDataGridModule } from 'devextreme-angular';

@Component({
  selector: 'app-intern',
  imports: [DxDataGridModule],
  templateUrl: './intern.component.html',
  styleUrl: './intern.component.css'
})
export class InternComponent implements OnInit {
  internList: Intern[] = [];

  constructor(private internService: InternService) { }

  ngOnInit(): void {
    this.internList = this.internService.getInterns();
  }

  customizeColumns(columns: any) {
    columns[0].width = 100;
    columns[1].width = 150;
    columns[2].width = 100;
  }

  uni = [
    { UniversityID: 1, UniName: 'IIT Delhi' },
    { UniversityID: 2, UniName: 'BITS Pilani' },
    { UniversityID: 3, UniName: 'NIT Trichy' },
    { UniversityID: 4, UniName: 'IIIT Hyderabad' },
    { UniversityID: 5, UniName: 'VNIT Nagpur' }
  ];

}
