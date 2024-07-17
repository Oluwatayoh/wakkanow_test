import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

declare var $: any;

@Injectable()
export class UtilityService {
  constructor(private toastr: ToastrService) { }

  showLoading(): void {
    $('#loading-overlay').show();
  }

  hideLoading(): void {
    $('#loading-overlay').hide();
  }

  showSuccess(title: any, message: any) {
    this.toastr.success(message, title);
  }

  showError(title: any, message: any) {
    this.toastr.error(message, title);
  }

  showWarning(title: any, message: any) {
    this.toastr.warning(message, title);
  }
}
