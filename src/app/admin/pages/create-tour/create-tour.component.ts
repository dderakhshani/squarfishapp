import { WaitingDialogComponent } from './../../../components/waiting-dialog/waiting-dialog.component';
import { CurrencyUnits } from './../../../core/models/TourModel';
import { TourService } from './../../api/tour.service';
import TourModel from 'src/app/core/models/TourModel';

import { Component, OnInit } from '@angular/core';
import TourLeaderModel from 'src/app/core/models/TourLeaderModel';
import { TourLeaderService } from '../../api/tour-leader.service';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-create-tour',
  templateUrl: './create-tour.component.html',
  styleUrls: ['./create-tour.component.scss']
})
export class CreateTourComponent implements OnInit {

  tourLeaders!: TourLeaderModel[];
  tour: TourModel = <TourModel>{};
  currencyUnits = CurrencyUnits;
  form: FormGroup;
  selected = -1;

  constructor(
    private tourService: TourService,
    private tourLeaderService: TourLeaderService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,) {

    if (this.activatedRoute.snapshot.params.tour != undefined) {
      this.tour = JSON.parse(this.activatedRoute.snapshot.params.tour);
      this.tour.tourLeaderIds = [];
      this.tour.leaders.forEach(x => {
        this.tour.tourLeaderIds.push(x.id);
      })
    }
    else {
      this.tour.currencyUnit = 1;
    }

    this.tourLeaderService.getAll().subscribe(result => {
      this.tourLeaders = result;

    });
    this.form = this.fb.group({
      tourTitle: [this.tour.tourTitle, [Validators.required]],
      tourLeaderIds: [this.tour.tourLeaderIds, [Validators.required]],
      price: [this.tour.price, [Validators.required]],
      currencyUnit: [this.tour.currencyUnit, [Validators.required]],
      startTime: new FormControl(this.tour.startTime, [this.dateRangeValidator()]),
    })
  }

  ngOnInit(): void {
  }

  onChange(tourLeaderModel: TourLeaderModel) {

  }
  dateRangeValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const dateValue = this.form?.controls['startTime']?.value;
      ;
      if (dateValue == null || dateValue == undefined)
        return null;

      if (new Date(dateValue) < new Date()) {
        return { message: 'date must be greater than today' };
      }
      return null;
    }
  }

  submit() {


    if (this.form.invalid) {
      let snackBarRef = this.snackBar.open('Validation error,please fill out all fields', 'OK');
      return;
    }
    const dialogRef = this.dialog.open(WaitingDialogComponent, {
      width: '150px',
    });

    this.tour = <TourModel>{
      tourTitle: this.form.get("tourTitle")?.value,
      tourLeaderIds: this.form.get("tourLeaderIds")?.value,
      price: this.form.get("price")?.value,
      currencyUnit: this.form.get("currencyUnit")?.value,
      startTime: this.form.get("startTime")?.value,
    }
    if (this.tour.id == 0)
      this.tourService.add(this.tour).subscribe(result => {
        dialogRef.close();
        this.snackBar.open('Saved Successfuly', 'Ok');
        this.router.navigate(['/admin/tours']);
      });
    else {
      this.tourService.update(this.tour).subscribe(result => {
        dialogRef.close();
        this.snackBar.open('Saved Successfuly', 'Ok');
        this.router.navigate(['/admin/tours']);
      });
    }
  }

}


