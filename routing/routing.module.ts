import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from "../app/login/login.component";
import { HomeComponent } from 'src/app/home/home.component';
import { AppGuard } from 'src/guards/app.guard';
import { AdminListComponent } from 'src/app/admin-list/admin-list.component';
import { ServSetsListComponent } from 'src/app/serv-sets-list/serv-sets-list.component';
import { ServSetsAddComponent } from 'src/app/serv-sets-add/serv-sets-add.component';
import { ServFieldsComponent } from 'src/app/serv-fields/serv-fields.component';
import { ServFieldsDialogComponent } from 'src/app/serv-fields-dialog/serv-fields-dialog.component';
import { GroupedbufPhysicalListComponent } from 'src/app/groupedbuf-physical-list/groupedbuf-physical-list.component';
import { GroupedbufFieldsPhysicalListComponent } from 'src/app/groupedbuf-fields-physical-list/groupedbuf-fields-physical-list.component';
import { EditGroupedPhysBuffsComponent } from 'src/app/edit-grouped-phys-buffs/edit-grouped-phys-buffs.component';
import { GroupedbufLogicalListComponent } from 'src/app/groupedbuf-logical-list/groupedbuf-logical-list.component';
import { EditGrLogicBuffComponent } from 'src/app/edit-gr-logic-buff/edit-gr-logic-buff.component';
const defaultRoute = '';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full', canActivate: [AppGuard]},
  { path: 'login', component: LoginComponent },
  {path: 'home', component: HomeComponent, canActivate: [AppGuard]},
  {path: 'servlist', component: ServSetsListComponent, canActivate: [AppGuard]},
  {path: 'adminlist', component: AdminListComponent, canActivate: [AppGuard]},
  {path: 'editserv/:serv_id', component: ServSetsAddComponent, canActivate: [AppGuard]},
  {path: 'editserv', component: ServSetsAddComponent, canActivate: [AppGuard]},
  {path: 'servfields/:serv_id', component: ServFieldsComponent, canActivate: [AppGuard]},
  {path: 'servfieldadd/:serv_id', component: ServFieldsDialogComponent, canActivate: [AppGuard]},
  {path: 'groupedbuflist', component: GroupedbufPhysicalListComponent, canActivate: [AppGuard]},
  {path: 'groupedbuffieldlist/:buffer_id', component: GroupedbufFieldsPhysicalListComponent, canActivate: [AppGuard]},
  {path: 'editgroupphysbuff/:buffer_id', component: EditGroupedPhysBuffsComponent, canActivate: [AppGuard]},
  {path: 'editgroupphysbuff', component: EditGroupedPhysBuffsComponent, canActivate: [AppGuard]},
  {path: 'groupedbuflogiclist', component: GroupedbufLogicalListComponent, canActivate: [AppGuard]},
  {path: 'editlogicgrbuff/:buffer_id', component: EditGrLogicBuffComponent, canActivate: [AppGuard]},
  {path: 'addlogicgrbuff', component: EditGrLogicBuffComponent, canActivate: [AppGuard]},
  //  { path: 'add-user', component: AddUserComponent },
 // { path: 'list-user', component: ListUserComponent },
 // { path: 'edit-user', component: EditUserComponent },
 
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
  