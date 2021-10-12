import { Injectable } from '@angular/core';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})


export class GlobalService {

  constructor(private dataService: DataService) {


  }


}

