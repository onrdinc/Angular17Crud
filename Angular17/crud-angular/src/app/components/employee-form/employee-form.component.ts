import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import { HttpService } from '../../http.service';
import { IEmployee } from '../../Interfaces/employee';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [MatInputModule,MatButtonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.css'
})
export class EmployeeFormComponent {
formBuilder = inject(FormBuilder);
httpService = inject(HttpService);
router  = inject(Router);
toaster = inject(ToastrService);
route = inject(ActivatedRoute);
employeeForm = this.formBuilder.group({
  name:['',[Validators.required]],
  email:['',[Validators.required,Validators.email]],
  age:[0,[Validators.required]],
  phone:['',[Validators.required]],
  salary:[0,[Validators.required]],
});
employeeId!:number;
isEdit=false;
ngOnInit(){
  this.employeeId = this.route.snapshot.params['id'];
  if(this.employeeId){
    this.isEdit = true;
    this.httpService.getEmployee(this.employeeId).subscribe(result=>{
      this.employeeForm.patchValue(result);
      // this.employeeForm.controls.email.disable();
      console.log(result);

    });
  }
};
save(){
  const employee : IEmployee={
    name:this.employeeForm.value.name!,
    age:this.employeeForm.value.age!,
    email:this.employeeForm.value.email!,
    phone:this.employeeForm.value.phone!,
    salary:this.employeeForm.value.salary!
  };
  if(this.isEdit){
    this.httpService.updateEmployee(this.employeeId,employee).subscribe(()=>{
      this.toaster.success("Başarıyla Güncellendi");
      this.router.navigateByUrl("/employee-list");
    });
  }else{
    this.httpService.createEmployee(employee).subscribe(()=>{
      this.toaster.success("Başarıyla Eklendi");
      this.router.navigateByUrl("/employee-list")
    });
  }

}
}
