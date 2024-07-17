import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoaderComponent } from './helper/loader/loader.component';
import { FormsModule } from '@angular/forms';
import { AuthGuard } from './helper/auth.guard';
import { UtilityService } from './services/util.service';
import { ApiService } from './services/api.service';
import { AuthService } from './services/auth.service';
import { ToastrModule } from 'ngx-toastr'; 
import { SharedModule } from './helper/shared.module';
import { ProfileComponent } from './pages/profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    ToastrModule.forRoot(),
    SharedModule
  ],
  providers: [AuthGuard, { provide: 'AuthGuard', useClass: AuthGuard }, UtilityService, ApiService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
