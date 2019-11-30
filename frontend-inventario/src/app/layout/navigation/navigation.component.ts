import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NavigationStart, NavigationEnd, Router } from '@angular/router';
import { UploadService } from '../../services/upload.service';
import { Global } from '../../services/global';
import Swal from 'sweetalert2'
import { Subscription } from 'rxjs'
export let browserRefresh = false;
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
  providers: [LoginService, UploadService],
})
export class NavigationComponent implements OnInit {
  result;
  empleado: any;
  url: string;
  filesToUpload: Array<File>;
  subscription: Subscription;
  constructor(
    private _loginService: LoginService,
    private _router: Router,
    private _uploadService: UploadService
  ) {
    this.url = Global.url;
    if (window.localStorage.getItem('msgStartSession')=='true') {
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000
      });

      Toast.fire({
        type: 'success',
        title: 'Inicio de sesión correcto'
      })
    }
  }

  ngOnInit() {
    this._loginService.verify().subscribe(
      res => this.result = res,
      err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status == 401) {
            this._router.navigate(['/login']);
          }
        }
      }
    );
    this.empleado = JSON.parse(localStorage.getItem('empleado'));
    window.localStorage.setItem('msgStartSession','false')
  }

  logout() {
    window.localStorage.removeItem("token");
    this._router.navigate(['']);
  }

  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
    if (this.filesToUpload) {
      this._uploadService.makeFileRequest(Global.url + "/upload-image/" + this.empleado._id, [], this.filesToUpload, 'image')
        .then((result: any) => {
          localStorage.setItem('empleado', JSON.stringify(result.empleado));
          this.empleado = JSON.parse(localStorage.getItem('empleado'));
        });
    }
  }

}
