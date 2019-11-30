import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { Router } from "@angular/router";
import { AuthService } from '../../services/auth.service'
import { HttpErrorResponse } from '@angular/common/http'
import Swal from 'sweetalert2'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {

  hide = true;

  loginForm = this.fb.group({
    correo: ['',
      [
        Validators.maxLength(40),
        Validators.required,
        Validators.email
      ]
    ],
    password: ['',
      [
        Validators.maxLength(30),
        Validators.required,
        Validators.minLength(4)
      ]
    ]
  });

  constructor(
    private fb: FormBuilder,
    private _loginService: LoginService,
    private _router: Router,
    private _auth: AuthService
  ) {
  }

  get correo() { return this.loginForm.get('correo'); }

  get password() { return this.loginForm.get('password'); }

  ngOnInit() {
    if (localStorage.getItem('token'))
      this._loginService.verify().subscribe(
        res => {
          this._router.navigate(['/home']);
        },
        err => {
          if (err instanceof HttpErrorResponse) {
            if (err.status == 401) {
              this._router.navigate(['/login']);
            }
          }
        }
      )
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
    this._loginService.login(this.loginForm.value).subscribe(
      response => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('msgStartSession', 'true')
        localStorage.setItem('empleado', JSON.stringify(response.empleadoDB));
        this._router.navigate(['/home']);
      },
      error => {
        Swal.fire({
          type: 'error',
          title: 'Correo y/o contraseña inválido(s)',
          text: 'Ingrese correctamente los datos'
        })
        console.log(error);
      }
    )
  }
}

