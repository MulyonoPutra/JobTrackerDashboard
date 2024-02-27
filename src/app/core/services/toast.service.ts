import { Toast, ToastType } from '../models/toast';

import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  toasts: Toast[] = [];
  delay = 6000;

  subject = new BehaviorSubject<Toast[]>(null!);
  toasts$ = this.subject.asObservable();

  add(toast: Toast) {
    this.toasts = [toast, ...this.toasts];
    this.subject.next(this.toasts);

    setTimeout(() => {
      this.toasts = this.toasts.filter(v => v !== toast);
      this.subject.next(this.toasts);
    }, this.delay);
  }

  remove(index: number) {
    this.toasts = this.toasts.filter((toast, i) => i !== index);
    this.subject.next(this.toasts);
  }

  showSuccess(title: string, message: string) {
    this.add({
      type: ToastType.success,
      title: title,
      message: message
    });
  }

  showError(title: string, message: string) {
    this.add({
      type: ToastType.error,
      title: title,
      message: message
    });
  }

  showWarning(title: string, message: string) {
    this.add({
      type: ToastType.warning,
      title: title,
      message: message
    });
  }

}
