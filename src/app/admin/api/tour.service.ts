import { Injectable } from '@angular/core';
import TourModel from 'src/app/core/models/TourModel';
import { DataService } from 'src/app/core/services/data.service';

@Injectable({
  providedIn: 'root'
})
export class TourService {

  controllerName: String = "tour"
  constructor(private dataService: DataService) { }


  add(tourModel: TourModel) {
    return this.dataService.postJsonData<TourModel>(tourModel, this.controllerName);
  }

  getAll() {
    return this.dataService.getData<TourModel[]>(this.controllerName);
  }

  delete(tourModel: TourModel) {
    return this.dataService.deleteData<TourModel>(tourModel.id, this.controllerName);
  }

  update(tourModel: TourModel) {
    return this.dataService.putJsonData<TourModel>(tourModel.id, tourModel, this.controllerName);
  }

  confirm(tourModel: TourModel) {
    return this.dataService.putJsonData<TourModel>(tourModel.id, null, this.controllerName, "Confirm");
  }

  cancel(tourModel: TourModel) {
    return this.dataService.putJsonData<TourModel>(tourModel.id, null, this.controllerName, "Cancel");
  }

}
