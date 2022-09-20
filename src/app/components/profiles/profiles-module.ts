import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MaterialModule } from '../material-module';
import { AllProfilesComponent } from './all-profiles/all-profiles.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { FollowRequestsComponent } from './follow-requests/follow-requests.component';
import { NewEducationComponent } from './new-education/new-education.component';
import { NewWorkExperienceComponent } from './new-work-experience/new-work-experience.component';
import { OneProfileComponent } from './one-profile/one-profile.component';
import { PublicProfilesComponent } from './public-profiles/public-profiles.component';

@NgModule({
  declarations: [FollowRequestsComponent, OneProfileComponent, EditProfileComponent, AllProfilesComponent, NewWorkExperienceComponent, PublicProfilesComponent, NewEducationComponent],
  imports: [ MatDialogModule, MaterialModule],
  exports: [FollowRequestsComponent, OneProfileComponent, EditProfileComponent, AllProfilesComponent, NewWorkExperienceComponent, PublicProfilesComponent, NewEducationComponent],
  providers: []
})

export class ProfilesModule { }
