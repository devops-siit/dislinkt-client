import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MaterialModule } from '../material-module';
import { AllProfilesComponent } from './all-profiles/all-profiles.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { NewEducationComponent } from './new-education/new-education.component';
import { NewWorkExperienceComponent } from './new-work-experience/new-work-experience.component';
import { OneProfileComponent } from './one-profile/one-profile.component';

@NgModule({
  declarations: [OneProfileComponent, EditProfileComponent, AllProfilesComponent, NewWorkExperienceComponent, NewEducationComponent],
  imports: [ MatDialogModule, MaterialModule],
  exports: [OneProfileComponent, EditProfileComponent, AllProfilesComponent, NewWorkExperienceComponent, NewEducationComponent],
  providers: []
})

export class ProfilesModule { }
