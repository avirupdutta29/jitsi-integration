import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InteractionService {

  private _passwordApplySource= new Subject<string>();

  passwordApplySource$=this._passwordApplySource.asObservable();

  constructor() { }
}
