import { NgModule } from '@angular/core';
import { HomeComponent } from './components/home/home.component';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SharedModule } from 'shared/shared.module';
import { BsNavbarComponent } from './components/bs-navbar/bs-navbar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [BsNavbarComponent, HomeComponent, LoginComponent],
  imports: [SharedModule, NgbModule, RouterModule.forChild([])],
  exports: [BsNavbarComponent],
})
export class CoreModule {}
