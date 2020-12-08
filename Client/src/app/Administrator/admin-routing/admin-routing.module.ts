import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '../login/login.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { AdminProfileComponent } from '../dashboard/admin-profile/admin-profile.component';
import { DetailComponent } from '../dashboard/admin-partner/detail/detail.component';
import { AdminPartnerComponent} from '../dashboard/admin-partner/admin-partner.component';
import { AdminConsultComponent } from '../dashboard/admin-consult/admin-consult.component';
import { AdminUsersComponent } from '../dashboard/admin-users/admin-users.component';
import { ConsultDetailComponent } from '../dashboard/admin-consult/consult-detail/consult-detail.component';
import { AuthGuard } from '../shared/auth.guard';
import { ResearchDetailComponent } from '../dashboard/admin-research/research-detail/research-detail.component';
import { AdminResearchComponent } from '../dashboard/admin-research/admin-research.component';
import { AdminTrainingComponent } from '../dashboard/admin-training/admin-training.component';
import { TrainingDetailComponent } from '../dashboard/admin-training/training-detail/training-detail.component';
// import {DelePartnComponent} from '../dashboard/dialogs/partner/dele-partn/dele-partn.component';
import { AdminBlogComponent } from '../dashboard/admin-blog/admin-blog.component';
import {AdminLogoutComponent } from '../shared/admin-logout.component';
import {ImageErrorComponent } from '../dashboard/admin-partner/image-error/image-error.component';
import {ViewUserComponent} from '../dashboard/admin-users/view-user/view-user.component';
import { MessageComponent } from '../dashboard/message/message.component';
import { AdminPasswordComponent } from '../dashboard/admin-password/admin-password.component';
import { ViewUserProfileComponent} from '../dashboard/admin-users/view-user-profile/view-user-profile.component';
import { EvaluatedConsultantComponent } from '../dashboard/Evaluate/evaluated-consultant/evaluated-consultant.component';
import { EvaluatedResearchComponent } from '../dashboard/Evaluate/evaluated-research/evaluated-research.component';
import { EvaluatedConsultantViewComponent } from '../dashboard/Evaluate/evaluated-consultant/evaluated-consultant-view/evaluated-consultant-view.component';
import { EvaluatedResearchViewComponent } from '../dashboard/Evaluate/evaluated-research/evaluated-research-view/evaluated-research-view.component';
import { ReportprogressResearchComponent } from '../dashboard/admin-research/reportprogress-research/reportprogress-research.component';

const admin_route : Routes =[
	// {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
	{path: 'aau/admin/login', component: LoginComponent},
	{
		path: 'aau/admin/dashboard', 
		component: DashboardComponent, 
		canActivate:[AuthGuard]	,
		children:[
			{path: '', component:DashboardComponent},
			{path: 'users/list', component: AdminUsersComponent, canActivate:[AuthGuard]},
			{path: 'users/list/detail/:_id', component: ViewUserComponent, canActivate:[AuthGuard]},
			{path: 'users/list/detail/profile/:_id', component: ViewUserProfileComponent, canActivate:[AuthGuard]},
			{path: 'partner/list', component: AdminPartnerComponent, canActivate:[AuthGuard]},
			{path: 'partner/detail/:_id', component: DetailComponent, canActivate:[AuthGuard]},
			{path: 'consultant/list', component: AdminConsultComponent, canActivate:[AuthGuard]},
			{path: `consultant/list/details/:_id`, component:ConsultDetailComponent, canActivate:[AuthGuard]},
			{path: 'research/list', component: AdminResearchComponent, canActivate:[AuthGuard]},
			{path: 'research/list/details/:_id', component: ResearchDetailComponent, canActivate:[AuthGuard]},
			{path: 'training/list', component: AdminTrainingComponent, canActivate:[AuthGuard]},
			{path: 'training/list/details/:_id', component: TrainingDetailComponent, canActivate:[AuthGuard]},
			{path: 'blogs', component: AdminBlogComponent, canActivate:[AuthGuard]},
			{path: 'message', component: MessageComponent, canActivate:[AuthGuard]},
			{path: 'admin/profile', component:AdminProfileComponent, canActivate:[AuthGuard]},
			{path: 'admin/password', component:AdminPasswordComponent, canActivate:[AuthGuard]},
			{path: 'admin/logout', component:AdminLogoutComponent, canActivate:[AuthGuard]},
			{path: 'Evaluate/consultant', component:EvaluatedConsultantComponent, canActivate:[AuthGuard]},
			{path: 'Evaluate/research', component: EvaluatedResearchComponent, canActivate:[AuthGuard]},
			{path: 'evaluated/consultant/details/:_id' , component:EvaluatedConsultantViewComponent, canActivate:[AuthGuard]},
			{path: 'evaluated/research/details/:_id' , component:EvaluatedResearchViewComponent, canActivate:[AuthGuard]},
			{path: 'research/report', component:ReportprogressResearchComponent,canActivate:[AuthGuard]}
		]
	},
	// {path: 'admin/logout', component:AdminLogoutComponent, canActivate:[AuthGuard]},
	// {path: 'aau/admin/users/list', component: AdminUsersComponent, canActivate:[AuthGuard]},
	// {path: 'aau/admin/partner/list', component: AdminPartnerComponent, canActivate:[AuthGuard]},
	// {path: 'aau/admin/partner/detail/:_id', component: DetailComponent, canActivate:[AuthGuard]},
	// {path: 'aau/admin/consultant/list', component: AdminConsultComponent, canActivate:[AuthGuard]},
	// {path: `aau/admin/consultant/list/details/:_id`, component:ConsultDetailComponent, canActivate:[AuthGuard]},
	// {path: 'aau/admin/research/list', component: AdminResearchComponent, canActivate:[AuthGuard]},
	// {path: 'aau/admin/research/list/details/:_id', component: ResearchDetailComponent, canActivate:[AuthGuard]},
	// {path: 'aau/admin/training/list', component: AdminTrainingComponent, canActivate:[AuthGuard]},
	// {path: 'aau/admin/training/list/details/:_id', component: TrainingDetailComponent, canActivate:[AuthGuard]},
	
	// {path: 'aau/admin/partner/list/dele-partn/delete/:_id', component:DelePartnComponent, canActivate:[AuthGuard]}

];

@NgModule({
  declarations: [
	ImageErrorComponent,
	AdminLogoutComponent
  ],
  imports: [
    CommonModule,RouterModule.forRoot(admin_route)
  ]
})
export class AdminRoutingModule { }
