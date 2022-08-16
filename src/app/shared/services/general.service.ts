import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {
  [x: string]: any;
 
  showDialog=false;

  constructor() { }
}
