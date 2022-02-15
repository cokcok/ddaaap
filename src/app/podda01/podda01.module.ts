import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Podda01PageRoutingModule } from './podda01-routing.module';
import { Podda01Page } from './podda01.page';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { IonicSelectableModule } from 'ionic-selectable';
import { Ionic4DatepickerModule } from '@logisticinfotech/ionic4-datepicker';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Podda01PageRoutingModule,ReactiveFormsModule,
    IonicSelectableModule,Ionic4DatepickerModule
  ],
  declarations: [Podda01Page]
})
export class Podda01PageModule {}
