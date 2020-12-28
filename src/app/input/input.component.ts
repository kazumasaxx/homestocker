import { Component, OnInit } from '@angular/core';
//import { iteminfo } from '../Struct/iteminfo'
import { ActivatedRoute, Router } from '@angular/router';
import { m_store, m_item } from './input';
import { InputService } from './input.service';
import * as Enumerable from "linq";
import { stock } from '../stock/stock';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {
  selected = '';
  selectedid;
  selecteditem = '';
  selecteditemid;
  selecteditemcount = '';
  selectedcount = "1";
  items: m_item[];
  stores: m_store[];
  itemcount: string[] = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
  testmessage: string;
  constructor(
    private service: InputService,
    private router: Router,
  ) {
    //this.stores = DATA
    this.testmessage = "test";
  }

  ngOnInit(): void {
    this.service.getstores().subscribe(res => {
      this.stores = res;
    });
  }
  show(): void {
  }
  showstore(): void {
    //表示する品物を入れる
    for (var keys in this.stores) {
      if (this.selected === this.stores[keys]["storename"]) {
        this.selectedid = this.stores[keys]["id"];
        break;
      }
    }
    this.service.getmasteritems().subscribe(res => {
      this.items = Enumerable.from(res).where(w => w.storeid == this.selectedid).select(s => s).toArray();
    });
  }
  showitem(): void {
    for (var keys in this.items) {
      if (this.selecteditem === this.items[keys]["name"]) {
        this.selecteditemid = this.items[keys]["id"];
        break;
      }
    }
  }
  onSubmit(form: any): void {
    let stock: stock = {
      id: 0,
      item: this.selecteditemid,
      name: '',
      count: form.comitemcount,
      storeid: this.selectedid
    };
    // this.testmessage = "testsubmit";
    // this.testmessage = this.selectedid;
    //Insert
    this.service.setstock(stock).subscribe(() => {
      this.router.navigate(["/stocks"]);
    });
  }
}
