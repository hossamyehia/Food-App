import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import Table from './model/table.model';
import { KeyValue } from '@angular/common';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent{

  @Input() table!: Table;
  @Output() operationData = new EventEmitter()
  BaseUrl = "https://upskilling-egypt.com:3006/";

  constructor(){
  }


  onCompare(_left: KeyValue<any, any>, _right: KeyValue<any, any>): number {
    return 1;
  }


  onClick(data: any, operationInfo: string){
    this.operationData.emit({data: data, operationInfo: operationInfo});
  }

  getLength(obj: object) {
    return Object.keys(obj).length;
  }

}
