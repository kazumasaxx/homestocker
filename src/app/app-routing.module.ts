import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { stockListComponent } from './stock/stock-list/stock-list.component';
import { stockEditComponent } from './stock/stock-edit/stock-edit.component';
import { stockAddComponent } from './stock/stock-add/stock-add.component';
import { InputComponent } from './input/input.component';
import { ItemEditComponent } from './item/item-edit/item-edit.component';
import { ItemListComponent } from './item/item-list/item-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'input', component: InputComponent },
  { path: 'stocks', component: stockListComponent },
  { path: 'stocks/:id/add', component: stockAddComponent },
  { path: 'stocks/:id/edit', component: stockEditComponent },
  { path: 'itemlist/:id/edit', component: ItemEditComponent },
  { path: 'itemlist', component: ItemListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
