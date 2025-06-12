import { Component, ViewChild } from '@angular/core';
import { DxButtonModule, DxDataGridModule, DxDataGridComponent } from 'devextreme-angular';
import { Employee, EmployeesService } from '../../service/employee.service';
import { CommonModule } from '@angular/common';
import { exportDataGrid } from 'devextreme/excel_exporter';
import { exportDataGrid as exportDataGridToPdf } from 'devextreme/pdf_exporter';
import { Workbook } from 'exceljs';
import * as FileSaver from 'file-saver';
import * as jsPDF from 'jspdf';

@Component({
    selector: 'app-employee',
    standalone: true,
    imports: [DxDataGridModule, CommonModule, DxButtonModule],
    templateUrl: './employee.component.html',
    styleUrl: './employee.component.css'
})
export class EmployeeComponent {
    @ViewChild('dataGrid', { static: false }) dataGrid!: DxDataGridComponent;
    employees: Employee[] = [];
    selectedEmployee?: Employee;
    expanded: boolean = true;

    constructor(service: EmployeesService) {
        this.employees = service.getEmployees();
        this.selectEmployee = this.selectEmployee.bind(this);
    }

    selectEmployee(e: any) {
        e.component.byKey(e.currentSelectedRowKeys[0]).done((employee: Employee) => {
            if (employee) {
                this.selectedEmployee = employee;
            }
        });
    }

    // Export to Excel
    exportToExcel(e: any) {
        const workbook = new Workbook();
        const worksheet = workbook.addWorksheet('Employees');

        exportDataGrid({
            component: e.component,
            worksheet: worksheet,
            autoFilterEnabled: true
        }).then(() => {
            workbook.xlsx.writeBuffer().then((buffer) => {
                FileSaver.saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'Employees.xlsx');
            });
        });
    }

    // Export to PDF
    exportToPdf(dataGrid: DxDataGridComponent) {
        const doc = new jsPDF.default();
        exportDataGridToPdf({
            jsPDFDocument: doc,
            component: dataGrid.instance // Use the DataGrid instance
        }).then(() => {
            doc.save('Employees.pdf');
        });
    }
}