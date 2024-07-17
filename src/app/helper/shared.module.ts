import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppBarComponent } from '../app-bar/app-bar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FontAwesomeCustomModule } from './icons.module';
import { CapitalizePipe } from './customPipe.pipe';
@NgModule({
    declarations: [AppBarComponent, CapitalizePipe],
    imports: [CommonModule, FormsModule,
        FontAwesomeModule,
        FontAwesomeCustomModule,],
    exports: [CommonModule, FormsModule, AppBarComponent,
        FontAwesomeModule,
        FontAwesomeCustomModule, CapitalizePipe],
})
export class SharedModule { }