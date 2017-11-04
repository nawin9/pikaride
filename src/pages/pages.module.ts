import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';

import { HomePageModule } from './home/home.module';
import { JourneyPageModule } from './journey/journey.module';


@NgModule({
  imports: [
    CommonModule,
    IonicModule.forRoot(HomePageModule),
    HomePageModule,
    JourneyPageModule
  ],
  declarations: [
  ],
  exports: [
  ],
  providers: []
})
export class PagesModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: PagesModule,
      providers: [ ]
    };
  }
}
