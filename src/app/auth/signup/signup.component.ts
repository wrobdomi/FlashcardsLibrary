import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { UIService } from 'src/app/shared/ui.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {

  startDate = new Date(1996, 0, 1);
  minDate = new Date(1900, 0, 1);
  maxDate = new Date(2015, 0, 1);

  isLoading = false;
  private loadingSubs: Subscription;


  constructor(
    private authService: AuthService,
    private uiService: UIService) { }

  ngOnInit() {
    this.loadingSubs = this.uiService.loadingStateChanged.subscribe(isLoading =>
      this.isLoading = isLoading
      )
  }

  onSubmit(form: NgForm) {
    this.authService.registerUser({
      email: form.value.email,
      password: form.value.password
    });
  }

  ngOnDestroy() {
    if ( this.loadingSubs ) {
      this.loadingSubs.unsubscribe();
    }
  }

}
