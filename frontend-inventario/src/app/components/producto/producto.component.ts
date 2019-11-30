import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { LoginService } from '../../services/login.service';
import { HttpErrorResponse } from '@angular/common/http'
import { Router } from '@angular/router'
import { MatPaginatorIntl } from '@angular/material';
import { ProductoService } from '../../services/producto.service'

export class MatPaginatorIntlCro extends MatPaginatorIntl {
  itemsPerPageLabel = 'Ítems por página';
  nextPageLabel = 'Slijedeća stranica';
  previousPageLabel = 'Prethodna stranica';

  getRangeLabel = function (page, pageSize, length) {
    if (length === 0 || pageSize === 0) {
      return '0 de ' + length;
    }
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    // If the start index exceeds the list length, do not try and fix the end index to the end.
    const endIndex = startIndex < length ?
      Math.min(startIndex + pageSize, length) :
      startIndex + pageSize;
    return startIndex + 1 + ' - ' + endIndex + ' de ' + length;
  };
}

export interface UserData {
  _id: string;
  nombre: string;
  descripcion: string;
  stock: Number;
  precio: Number;
}

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css'],
  providers: [ProductoService, { provide: MatPaginatorIntl, useClass: MatPaginatorIntlCro }]
})

export class ProductoComponent implements OnInit {
  result
  productos: any;
  displayedColumns: string[] = ['nombre', 'descripcion', 'stock', 'precio', 'acciones'];
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private _loginService: LoginService,
    private _router: Router,
    private _productoService: ProductoService
  ) { }

  ngOnInit() {
    this.listarEmpleados();
    this._loginService.verify().subscribe(
      res => this.result = res,
      err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status == 401) {
            this._router.navigate(['/login']);
          }
        }
      }
    )
  }

  listarEmpleados() {
    this._productoService.listarProductos().subscribe(
      res => {
        console.log(res)
        this.dataSource = new MatTableDataSource(res.productos);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error => {
        console.log(error)
      }
    )
  }


}
