import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { ProductsComponent } from './shopping/components/products/products.component';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { AdminAuthGuardService } from './admin/services/admin-auth-guard.service';

import { SharedModule } from 'shared/shared.module';
import { AdminModule } from './admin/admin.module';
import { ShoppingModule } from './shopping/shopping.module';
import { CoreModule } from './core/core.module';
import { LoginComponent } from './core/components/login/login.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    SharedModule,
    AdminModule,
    ShoppingModule,
    CoreModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideDatabase(() => getDatabase()),
    RouterModule.forRoot([
      { path: '', component: ProductsComponent },
      { path: 'login', component: LoginComponent },
    ]),
  ],
  providers: [
    { provide: FIREBASE_OPTIONS, useValue: environment.firebase },
    AdminAuthGuardService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
