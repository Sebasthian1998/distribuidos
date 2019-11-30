import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { EmpleadoService } from '../../services/empleados.service';
import { MatPaginatorIntl } from '@angular/material';

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
  role: string;
  nombres: string;
  apellidos: string;
  edad: Number;
  email: string;
}

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css'],
  providers: [EmpleadoService, { provide: MatPaginatorIntl, useClass: MatPaginatorIntlCro }]
})

export class EmpleadosComponent implements OnInit {
  empleados: any;
  displayedColumns: string[] = ['id', 'nombres', 'apellidos', 'email', 'edad', 'rol', 'acciones'];
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private _empleadoService: EmpleadoService
  ) { }

  ngOnInit() {
    this.listarEmpleados();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  listarEmpleados() {
    this._empleadoService.listarEmpleados().subscribe(
      res => {
        this.dataSource = new MatTableDataSource(res.listaUsuarios);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error => {
        console.log(error)
      }
    )
  }
}
