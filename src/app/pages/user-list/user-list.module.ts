import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { UserListComponent } from './user-list.component';
import { SharedModule } from '../../helper/shared.module';

const routes: Routes = [
  { path: '', component: UserListComponent }
];

@NgModule({
  declarations: [UserListComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class UserListModule { }
