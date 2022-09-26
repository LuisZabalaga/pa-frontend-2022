import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from 'angular-toastify';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hide = true;
  usersForm !: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private _toastService: ToastService,
    private userService: UsersService,
  ) { }

  ngOnInit(): void {
    this.usersForm = this.formBuilder.group({
      emp_usuario: ['', Validators.required],
      emp_contraseña: ['', Validators.required],
    });
  }

  UserLogIn() {
    this.userService.getEmployeeForUser(this.usersForm.value).subscribe({
      next: (res) => {
        if (res.token) {
          localStorage.setItem('token', res.token);
          this._toastService.success('Bienvenido a Proyectos Ambientales C&C');
          this.router.navigate(['/']);
        } else {
          this._toastService.error('Error, Usuario o Contraseña Incorrectos');
        }
        
      },
      error: (e) => {
        console.log(e);
      }
    });
  }

}
