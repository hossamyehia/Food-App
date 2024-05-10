import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { ToasterService } from './service/toaster.service';

@Component({
  selector: 'app-toaster',
  templateUrl: './toaster.component.html',
  styleUrls: []
})
export class ToasterComponent implements OnInit {

  
  type!: boolean | null;
  show!: boolean | null;
  msg!: string | null;

  constructor( private _toasterService: ToasterService){}


  ngOnInit(): void {
    this._toasterService.msg.subscribe({
      next: (value) => {
        this.type = value.msgType;
        this.show = value.msgShow;
        this.msg = value.msgContent;
      }
    });
  }
}
