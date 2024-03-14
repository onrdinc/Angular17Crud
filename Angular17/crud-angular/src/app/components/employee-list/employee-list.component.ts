import { Component, inject } from '@angular/core';
import { IEmployee } from '../../Interfaces/employee';
import { HttpService } from '../../http.service';
import {MatTableModule} from '@angular/material/table';
import { MatButton } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [MatTableModule,MatButton,RouterLink],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent {
router = inject(Router);
employeeList:IEmployee[]=[];
httpService = inject(HttpService);
toaster = inject(ToastrService);
displayedColumns: string[] = [
  'id', 
  'name', 
  'email', 
  'age',
  'phone',
  'salary',
  'action'];


ngOnInit(){
this.getEmployeeFromServer();
}
getEmployeeFromServer(){
  this.httpService.getAllEmployee().subscribe(result =>{
    this.employeeList = result;
  });
}
edit(id:number){
  this.router.navigateByUrl("/employee/"+id);
}
delete(id:number){
  this.httpService.deleteEmployee(id).subscribe(()=>{
    //this.employeeList = this.employeeList.filter(x=>x.id!=id);
  this.getEmployeeFromServer();
  this.toaster.success("Başarıyla Silindi");
  })
}
}
