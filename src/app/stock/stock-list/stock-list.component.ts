import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { stock } from '../stock';
import { stockService } from '../stock.service';

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.css']
})
export class stockListComponent implements OnInit {
  stocks: stock[];
  testmessage: string;
  constructor(
    private service: stockService,
    private router: Router
  ) {
    this.testmessage = "test";
  }

  ngOnInit(): void {
    this.service.getstocks().subscribe(res => {
      //group byしたものを表示（店は関係ない）個数はSUM
      this.stocks = res;
    });

    this.testmessage = this.stocks.length.toString();
    this.testmessage = "testinit";
    this.stocks = [
      { id: 1, item: 1, name: 'test', count: 1, storeid: 1 }
    ]
    this.router.onSameUrlNavigation = "reload";
  }
  plusAction(id: number, count: number): void {
    //insert
    //this.testmessage = "test+" + id;
    let item: stock =
      { id: 0, item: id, name: 'test', count: count + 1, storeid: 1 }

    this.service.setstockincr(item).subscribe(ret => {
      //URLが変わらないとリロードできない
      //this.router.navigate(["/stocks"]);
      this.testmessage = "test+" + ret[0].id;
      this.service.changecountup(ret[0]).subscribe(() => {
        this.router.navigate(["."])
      });
    });
  }
  minusAction(id: number, count: number): void {
    //insert
    this.testmessage = "test-" + id;
    let item: stock =
      { id: 0, item: id, name: 'test', count: count - 1, storeid: 1 }

    this.service.setstockless(item).subscribe(ret => {
      //URLが変わらないとリロードできない
      //this.router.navigate(["/stocks"]);
      this.testmessage = "test-" + ret[0].id;
      this.service.changecountdown(ret[0]).subscribe(() => {
        this.router.navigate(["."])
      });
    });
  }
}
