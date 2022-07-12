import { Routes } from '@angular/router';
import { LoginPageComponent } from '../components/auth/login-page/login-page.component';
import { RegistrationComponent } from '../components/auth/registration/registration.component';
import { AllChatsComponent } from '../components/messages/all-chats/all-chats.component';
import { ChatMessagesComponent } from '../components/messages/chat-messages/chat-messages.component';
import { AllProfilesComponent } from '../components/profiles/all-profiles/all-profiles.component';
import { EditProfileComponent } from '../components/profiles/edit-profile/edit-profile.component';
import { OneProfileComponent } from '../components/profiles/one-profile/one-profile.component';
import { LoginGuard } from '../guards/login/login.service';
import { RoleGuard } from '../guards/role/role.service';


export const routes: Routes = [
    {
       path: 'login',
       component: LoginPageComponent,
      // canActivate: [LoginGuard] // putanja kojoj moze da pristupi korisnik samo ukoliko NIJE ulogovan
    },
    {
      path: 'register',
      component: RegistrationComponent,
    //  canActivate: [LoginGuard] // putanja kojoj moze da pristupi korisnik samo ukoliko NIJE ulogovan
   },
   {
      path: 'profiles',
      component: AllProfilesComponent,
   },
   {
      path: 'profile/:id',
      component: OneProfileComponent,
   },
   {
      path: 'edit-profile',
      component: EditProfileComponent,
   },
   {
      path: 'chat-messages/:id',
      component: ChatMessagesComponent,
   },
   {
      path: 'all-chats',
      component: AllChatsComponent,
   },
 
    // {
    // putanja kojoj moze da pristupi samo registrivani korisnik sa konkretnom ulogom
    //     path: 'favorites',
    //     component: FavoriteComponent,
    //     canActivate: [RoleGuard],
    //     data: {expectedRoles: 'ROLE_REGISTERED_USER'}
    // },
];
