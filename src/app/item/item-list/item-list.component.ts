import { Component, OnInit } from '@angular/core';
import { m_store, m_item } from '../../input/input';
import { InputService } from '../../input/input.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {
  items: m_item[];
  constructor(
    private service: InputService,
  ) { }

  ngOnInit(): void {
    this.service.getmasteritems().subscribe(res => {
      this.items = res;
    });
  }

}
