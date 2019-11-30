import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ProveedorService } from '../../services/proveedores.service';
import { MatPaginatorIntl } from '@angular/material';
declare var $: any;

import { FormBuilder, Validators } from '@angular/forms';

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
  direccion: string;
  telefono: string;
  celular: string;
  email: string;
}

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.css'],
  providers: [ProveedorService, { provide: MatPaginatorIntl, useClass: MatPaginatorIntlCro }]
})

export class ProveedoresComponent implements OnInit {
  empleados: any;
  displayedColumns: string[] = ['nombre', 'direccion', 'telefono', 'celular', 'email', 'acciones'];
  dataSource: MatTableDataSource<UserData>;
  nuevoEmpleadoForm = this.fb.group({
    nombre: ['',
      [
        Validators.maxLength(40),
        Validators.required
      ]
    ],
    direccion: ['',
      [
        Validators.maxLength(30),
        Validators.required
      ]
    ],
    telefono: ['',
      [
        Validators.maxLength(30),
        Validators.required
      ]
    ],
    celular: ['',
      [
        Validators.maxLength(30),
        Validators.required
      ]
    ],
    email: ['',
      [
        Validators.maxLength(30),
        Validators.required
      ]
    ],
  });

  get nombre() { return this.nuevoEmpleadoForm.get('nombre'); }
  get direccion() { return this.nuevoEmpleadoForm.get('direccion'); }
  get telefono() { return this.nuevoEmpleadoForm.get('telefono'); }
  get celular() { return this.nuevoEmpleadoForm.get('celular'); }
  get email() { return this.nuevoEmpleadoForm.get('email'); }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private _proveedorService: ProveedorService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.listarProveedores();
    $("#modalNuevoEmpleado").appendTo("body");
  }

  listarProveedores() {
    this._proveedorService.listarProveedores().subscribe(
      res => {
        console.log(res)
        this.dataSource = new MatTableDataSource(res.proveedores);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error => {
        console.log(error)
      }
    )
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  guardarProveedor() {
    console.log(this.nuevoEmpleadoForm.value);
  }

}
