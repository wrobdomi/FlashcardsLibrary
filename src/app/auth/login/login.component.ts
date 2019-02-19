import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service';
import { UIService } from 'src/app/shared/ui.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  isLoading = false;
  private loadingSubs: Subscription;

  constructor(
    private authService: AuthService,
    private uiService: UIService) { }

  ngOnInit() {
    this.loadingSubs = this.uiService.loadingStateChanged.subscribe(isLoading =>
      this.isLoading = isLoading );
  }

  onSubmit(f) {
    this.authService.login({
      email: f.value.email,
      password: f.value.password
    });
  }

  ngOnDestroy() {
    if( this.loadingSubs ) {
      this.loadingSubs.unsubscribe();
    }
  }

}
