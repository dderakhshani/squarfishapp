import TourModel, { TourStatus, CurrencyUnitTitles } from './../../../core/models/TourModel';
import { TourService } from './../../api/tour.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DialogData, GeneralDialog } from 'src/app/components/general-dialog/general-dialog.component';

@Component({
  selector: 'app-tours',
  templateUrl: './tours.component.html',
  styleUrls: ['./tours.component.scss']
})
export class ToursComponent implements OnInit {

  displayedColumns: string[] = ['action', 'TourName', 'Price', 'Leaders', 'StartTime', 'Status'];
  dataSource!: MatTableDataSource<TourModel>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  filterTabs: string[] = ['All', 'Not Confimed', 'Confirmed'];
  selectedFilterTabIndex: number = 0;
  isLoading: boolean = true;
  currencyUnitTitles = CurrencyUnitTitles
  tourStatus = TourStatus

  constructor(private dataService: TourService,
    public dialog: MatDialog,
    private router: Router,) { }

  ngOnInit(): void {

    this.loadData();
  }

  loadData() {
    this.dataService.getAll().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);

    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  onTabChanged($event: any) {
    this.dataSource.filterPredicate = function (data: any, filter: string): boolean {
      return data.status == Number(filter) || filter == "0";
    };
    this.dataSource.filter = this.selectedFilterTabIndex.toString();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  applyFilter(event: Event) {
    this.selectedFilterTabIndex = 0;
    this.dataSource.filterPredicate = function (data: any, filter: string): boolean {
      return data.tourTitle.trim().toLowerCase().includes(filter) || filter == "";
    };
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  addTour() {
    this.router.navigate(['/admin/create-tour']);
  }

  editItem(tour: TourModel) {
    this.router.navigate(['/admin/create-tour', { tour: JSON.stringify(tour) }]);
  }

  deleteItem(tour: TourModel) {
    const dialogRef = this.dialog.open(GeneralDialog, {
      width: '350px',
      data: <DialogData>{ title: "Confirmation", text: "Are you sure?", cancelTitle: "No", confirmTitle: "Yes" }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.dataService.delete(tour).subscribe(data => {
        this.loadData();
      });
    });
  }

  confirm(tour: TourModel) {
    this.dataService.confirm(tour).subscribe(data => {
      this.loadData();
    });
  }

  cancel(tour: TourModel) {
    this.dataService.cancel(tour).subscribe(data => {
      this.loadData();
    });
  }

}
