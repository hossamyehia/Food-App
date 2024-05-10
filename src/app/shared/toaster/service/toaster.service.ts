import { Injectable } from '@angular/core';
import NativeToaster from '../model/toaster.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToasterService {


  msg = new BehaviorSubject<NativeToaster>({
    msgType: null,
    msgShow: null,
    msgContent: null,
  });

  constructor() { }

  msgStart(msg: string, type: boolean) {
    this.msg.next({
      msgType: type,
      msgShow: true,
      msgContent: msg,
    })
    setTimeout(()=>{
      this.msgDone();
    }, 3000);
  }

  msgDone() {
    this.msg.next({
      msgType: null,
      msgShow: null,
      msgContent: null,
    })
  }
}
