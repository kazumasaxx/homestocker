import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../tools/confirm-dialog/confirm-dialog.component';
import { m_store, m_item } from '../../input/input';

import { stock } from '../stock';
import { stockService } from '../stock.service';

@Component({
  selector: 'app-stock-edit',
  templateUrl: './stock-edit.component.html',
  styleUrls: ['./stock-edit.component.css']
})
export class stockEditComponent implements OnInit {
  stock: stock = { id: 0, name: '', item: 0, count: 0, storeid: 0 };
  items: m_item[];
  selecteditem = '';
  storeid: number;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: stockService,
    private dialog: MatDialog
  ) {
    //updateなので店情報は変更しない
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.service.getstock(id).subscribe(res => {
      this.stock = res;
    });
    this.stock.count = 1;
    this.storeid = Number(this.route.snapshot.paramMap.get('storeid'));
  }

  onSubmit(form: any): void {
    let stock: stock = {
      id: form.id,
      //仮
      item: form.id,
      name: '',
      count: form.count,
      storeid: this.storeid
    };

    let dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: {
        title: 'Confirm',
        message: 'Are you sure you want to update this stock?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.service.setstock(stock).subscribe(() => {
          this.router.navigate(["/stocks"]);
        });
      }
    });
  }
}
