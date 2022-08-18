import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validator, Validators } from '@angular/forms';
import { ApiserviceService } from '../services/apiservice.service';
import { ToastService } from 'angular-toastify';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  constructor(
    private apiService: ApiserviceService,
    private router: ActivatedRoute,
    private _toastService: ToastService) { }

  getParamId: any;

  ngOnInit(): void {

    this.getParamId = this.router.snapshot.paramMap.get('id');
    if (this.getParamId) {
      this.apiService.getSingleData(this.getParamId).subscribe((res) => {
        console.log(res, 'res ==>');
        this.userForm.patchValue({
          fullName: res.data[0].fullName,
          email: res.data[0].email,
          mobile: res.data[0].mobile
          
        });
      });
    }
    
  }

  userForm: FormGroup = new FormGroup({
    $key: new FormControl(null),
    fullName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    mobile: new FormControl('',[Validators.required, Validators.minLength(9)])
  });

  departments = [
    { id: 1, value: 'Arequipa' },
    { id: 2, value: 'Lima' },
    { id: 3, value: 'Tacna' },
    { id: 4, value: 'Cuzco' }
  ];

  onClear() {
    this.userForm.reset();
    this.userForm.setValue({
      $key: null,
      fullName: '',
      email: '',
      mobile: ''
    });
  }

  userSubmit() {
    // if (this.userForm.valid) {
      console.log(this.userForm.value);
      this.apiService.createData(this.userForm.value).subscribe((res) => {
        console.log(res, 'res==>');
        this.userForm.reset();
      })
      this._toastService.success('Usuario añadido con exicto!!!');
    // } else {
      console.log("All field is required");
    // }
    
  }

  userUpdate() {
    // console.log(this.userForm.value, 'upDatedForm');
    this.apiService.updateData(this.userForm.value, this.getParamId).subscribe((res) => {
      console.log(res, 'User is update!!');
    });
    this._toastService.info('Usuario Actualizado con exicto!!!');
  }

   
}
