import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';

import { SmartTablesService } from './smartTables.service';
import { LocalDataSource } from 'ng2-smart-table';

import 'style-loader!./smartTables.scss';

@Component({
  selector: 'smart-tables',
  templateUrl: './smartTables.html',
})
export class SmartTables {
  dPipe = new DatePipe('es-US');
  query: string = '';
  datos = [];

  settings = {
    actions: false,
    // add: {
    //   addButtonContent: '<i class="ion-ios-plus-outline"></i>',
    //   createButtonContent: '<i class="ion-checkmark"></i>',
    //   cancelButtonContent: '<i class="ion-close"></i>',
    // },
    // edit: {
    //   editButtonContent: '<i class="ion-edit"></i>',
    //   saveButtonContent: '<i class="ion-checkmark"></i>',
    //   cancelButtonContent: '<i class="ion-close"></i>',
    // },
    // delete: {
    //   deleteButtonContent: '<i class="ion-trash-a"></i>',
    //   confirmDelete: true
    // },
    columns: {
      id: {
        title: 'ID',
        type: 'number'
      },
      filmeTituloOriginal: {
        title: 'Titulo Original',
        type: 'string'
      },
      filmePaisProduccion: {
        title: 'Pais producción',
        type: 'string'
      },
      produccionNombreProductor: {
        title: 'Productor',
        type: 'string'
      },
      filmeAnioProduccion: {
        title: 'Año producción',
        type: 'date',
        noDataMessage: "No data"
      },
      createdAt: {
        title: 'Fecha',
        type: 'string',
      },
      pdfName:{
        title:'PDF',
        type:'html',
        valuePrepareFunction:(pdfName)=>{
          return `<a target="_blank" class="btn btn-success" href="https://www.festivaldelima.com/2016/wp-content/themes/fdcl2016/modulos/convocatoria/docs/${pdfName}">PDF</a>`
        },
        filter:false     
      }
    }
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(protected service: SmartTablesService) {
    this.service.getData().then((data) => {
      //this.datos = data; 
      //console.log(this.datos.data);
      //this.source.load(this.datos.data);
      console.log(this.dPipe.transform(new Date(), 'yyyy-MMMM-dd'));
      this.source.load(data);
    });
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
}
