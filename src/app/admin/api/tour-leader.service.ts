import { Injectable } from '@angular/core';
import TourLeaderModel from 'src/app/core/models/TourLeaderModel';
import { DataService } from 'src/app/core/services/data.service';

@Injectable({
  providedIn: 'root'
})
export class TourLeaderService {

  controllerName: String = "tourleader"
  constructor(private dataService: DataService) { }


  getAll() {
    return this.dataService.getData<TourLeaderModel[]>(this.controllerName);
  }
}
