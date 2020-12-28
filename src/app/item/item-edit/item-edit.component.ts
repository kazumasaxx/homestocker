import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../tools/confirm-dialog/confirm-dialog.component';
import { m_store, m_item } from '../../input/input';
import * as Enumerable from "linq";

import { InputService } from '../../input/input.service';
@Component({
  selector: 'app-item-edit',
  templateUrl: './item-edit.component.html',
  styleUrls: ['./item-edit.component.css']
})
export class ItemEditComponent implements OnInit {
  item: m_item = { id: 0, name: '', price: 0, storeid: 1, store: '' };
  selected = '';
  selecteditem = '';
  storeid: number = 1;
  stores: m_store[];
  testmessage: string;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: InputService,
    private dialog: MatDialog
  ) {
    //updateなので店情報は変更しない
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.service.getmasteritem(id).subscribe(res => {
      if (res.length > 0)
        this.item = res[0];
    });
    this.service.getstores().subscribe(res => {
      this.stores = res;
      if (this.item.storeid === 0) this.item.storeid = 1;
      this.selected = Enumerable.from(this.stores).where(w => w.id == this.item.storeid).select(s => s.storename).firstOrDefault();
    });
  }
  changestore(): void {
    for (var keys in this.stores) {
      if (this.selected === this.stores[keys]["storename"]) {
        this.storeid = this.stores[keys]["id"];
        break;
      }
    }
  }
  onSubmit(form: any): void {
    let item: m_item = {
      id: form.id,
      name: form.name,
      price: form.price,
      storeid: this.storeid,
      store: '',
    };

    let dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: {
        title: 'Confirm',
        message: 'Are you sure you want to update this item?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.service.setmasteritem(item).subscribe(() => {
          this.router.navigate(["/itemlist"]);
        });
      }
    });
  }
}
