import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { GeneralService } from '../../services/general.service';
import * as $ from "jquery";
//import {JitsiComponent} from './MyComponent/jitsi.component';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
  
})
export class DialogComponent implements OnInit {

  @Output() passedEvents = new EventEmitter<string>();

  password: any;

  constructor(public generalService: GeneralService) { }

  ngOnInit(): void {
  }


  security(){

    console.log("Hello World");
    this.password = $('#passwordPWD').val();
    console.log(this.password);

    this.passedEvents.next(this.password);

  }

  //  public callPassword!: void;{
  //   this.jitsi.password()
  //  }

}
