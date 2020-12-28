import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { stockService } from './stock/stock.service';
import { stockListComponent } from './stock/stock-list/stock-list.component';
import { stockEditComponent } from './stock/stock-edit/stock-edit.component';
import { ConfirmDialogComponent } from './tools/confirm-dialog/confirm-dialog.component';
import { InputComponent } from './input/input.component';
import { stockAddComponent } from './stock/stock-add/stock-add.component';
import { ItemEditComponent } from './item/item-edit/item-edit.component';
import { ItemListComponent } from './item/item-list/item-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MenuComponent,
    DashboardComponent,
    stockListComponent,
    stockEditComponent,
    stockAddComponent,
    ConfirmDialogComponent,
    InputComponent,
    stockAddComponent,
    ItemEditComponent,
    ItemListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatDialogModule,
    BrowserAnimationsModule
  ],
  providers: [
    stockService
  ],
  entryComponents: [
    ConfirmDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
