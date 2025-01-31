import { Component, OnInit } from '@angular/core';
import { IconDefinition, faUserCircle, faAt, faCalendarAlt, faCar, faKey, faEdit, faUser } from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { User } from '@route-optimizer/core/models/User';
import { AuthenticationService } from '@route-optimizer/core/services/authentication.service';
import { BusinessTripService } from '@route-optimizer/core/services/business-trip.service';
import { Page } from '@route-optimizer/core/models/Page';
import { BusinessTrip } from '@route-optimizer/core/models/BusinessTrip';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { UpdateProfileModal } from '../../modals/update-profile.modal';
import { UserService } from '@route-optimizer/core/services/user.service';
import { UpdateProfileFormData } from '@route-optimizer/core/models/forms/UpdateProfileFormData';
import { ChangePasswordModal } from '../../modals/change-password.modal';

@Component({
  selector: 'app-dashboard-profile',
  templateUrl: './dashboard-profile.component.html'
})
export class DashboardProfileComponent implements OnInit {
  faUserCircle: IconDefinition = faUserCircle;
  faAt: IconDefinition = faAt;
  faCalendarAlt: IconDefinition = faCalendarAlt;
  faCar: IconDefinition = faCar;
  faKey: IconDefinition = faKey;
  faEdit: IconDefinition = faEdit;
  faUser: IconDefinition = faUser;

  lastBusinessTrip: string;

  user: BehaviorSubject<User>;

  constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private businessTripService: BusinessTripService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.user = this.authenticationService.currentUser;
    this.businessTripService
      .getPastBusinessTrips(1, this.user.getValue().id)
      .pipe(map((page: Page<BusinessTrip>) => page.results))
      .subscribe({
        next: (businessTrips: BusinessTrip[]) => {
          if (businessTrips.length > 0) {
            this.lastBusinessTrip = businessTrips[0].finishDate;
          } else {
            this.lastBusinessTrip = 'nigdy';
          }
        },
        error: () => {
          this.lastBusinessTrip = 'nigdy';
        }
      });
  }

  editProfile(): void {
    const user = this.authenticationService.currentUser.getValue();
    const profileForm = new FormGroup({
      firstName: new FormControl(user.firstName, [Validators.required]),
      lastName: new FormControl(user.lastName, [Validators.required]),
      email: new FormControl(user.email, [Validators.required, Validators.email])
    });

    const dialogRef = this.dialog.open(UpdateProfileModal, {
      width: '400px',
      data: {
        profileForm
      }
    });

    dialogRef
      .afterClosed()
      .pipe(
        filter((result: UpdateProfileFormData) => result != null),
        switchMap((formData: UpdateProfileFormData) => this.userService.updateProfile(formData))
      )
      .subscribe({
        next: (changedUser: User) => {
          this.authenticationService.currentUser.next(changedUser);
        },
        error: () => {}
      });
  }

  changePassword(): void {
    const passwordForm: FormGroup = new FormGroup({
      oldPassword: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
      password2: new FormControl(null, [Validators.required])
    });

    passwordForm.get('password2').valueChanges.subscribe(value => {
      if (value !== passwordForm.get('password').value) {
        passwordForm.get('password2').setErrors({ passwordMismatch: true });
      } else {
        passwordForm.get('password2').setErrors(null);
      }
    });

    const dialogRef = this.dialog.open(ChangePasswordModal, {
      width: '400px',
      data: {
        passwordForm
      }
    });

    dialogRef
      .afterClosed()
      .pipe(filter(result => result != null))
      .subscribe(result => {
        this.authenticationService.logout();
      });
  }
}

// TODO: move to more accurate place
export interface FormErrorResponse {
  nonFieldErrors?: string[];
}

export interface ChangePasswordErrorResponse extends FormErrorResponse {
  oldPassword?: string[];
  password?: string[];
  password2?: string[];
}
