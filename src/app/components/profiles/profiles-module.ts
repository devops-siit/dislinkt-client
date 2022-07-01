import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MaterialModule } from '../material-module';
import { AllProfilesComponent } from './all-profiles/all-profiles.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { OneProfileComponent } from './one-profile/one-profile.component';

@NgModule({
  declarations: [OneProfileComponent, EditProfileComponent, AllProfilesComponent],
  imports: [ MatDialogModule, MaterialModule],
  exports: [OneProfileComponent, EditProfileComponent, AllProfilesComponent],
  providers: []
})

export class ProfilesModule { }
