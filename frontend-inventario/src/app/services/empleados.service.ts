import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Global } from './global';

@Injectable()
export class EmpleadoService {
    public url: string;

    constructor(private _http: HttpClient) {
        this.url = Global.url
    }

    listarEmpleados(): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.get(this.url + '/empleados', { headers: headers });
    }

    editarEmpleado(): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.put(this.url + '/empleado', { headers: headers });
    }

    borrarEmpleado(): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.delete(this.url + '/empleado', { headers: headers });
    }
}
