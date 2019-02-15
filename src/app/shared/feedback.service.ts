import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private snackbar: MatSnackBar) { }

  success(msg) {
    this.snackbar.open(msg);
  }

  error(msg) {
    this.snackbar.open(msg);
  }
}
