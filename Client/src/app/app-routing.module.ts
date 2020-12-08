import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConsultantComponent } from './forms/consultant/consultant.component';
import { ResearchComponent } from './forms/research/research.component';
import { TrainingComponent } from './forms/training/training.component';
import { HomeComponent } from './home/home/home.component';
import { ConsultantDetailComponent } from './details/consultant-detail/consultant-detail.component';
import { FinishedComponent } from './forms/finished/finished.component';
import { UserLoginComponent } from './home/user-login/user-login.component';
import { UserRegisterComponent } from './home/user-register/user-register.component';
import { UserGuardGuard } from './home/service/user-guard.guard';
import { UserProfileComponent } from './home/user-profile/user-profile.component';
import { UserPassswordComponent } from './home/user-passsword/user-passsword.component';
import { UserLogoutComponent } from './home/user-login/user-logout.component';
import { UserDashComponent } from './home/user-dash/user-dash.component';
import { MessageDetailComponent } from './home/user-dash/message-detail/message-detail.component';
import {AppComponent} from './app.component';
import { RequestPartnerComponent} from './forms/request-partner/request-partner.component';
import {UpdateProfileComponent} from './home/user-profile/update-profile/update-profile.component';
import { ResearchRequestDetailComponent} from './details/research-request-detail/research-request-detail.component';
import {TrainingRequestDetailComponent} from './details/training--request-detail/training-request-detail.component';
import { MissionVisionComponent } from './details/mission-vision/mission-vision.component';
import { BlogComponent } from './home/blog/blog.component';
import {ResetPasswordComponent} from './home/user-login/reset-password/reset-password.component';
import { ForgetPasswordComponent } from './home/user-login/forget-password/forget-password.component';
import { EvaluationsComponent } from './home/evaluations/evaluations.component';
import { UploadFileComponent } from './forms/upload-file/upload-file.component';
import { AggrementConsultComponent} from './forms/aggrements/aggrement-consult/aggrement-consult.component';
import { DeliveryComponent } from './home/delivery/delivery.component';
import { Form1Component } from './home/user-register/form1/form1.component';

const routes: Routes = [
	{
		path: '' ,
		component: AppComponent,
		children:[
			{path: '', component:HomeComponent},
			{path: 'consultant/form', component: ConsultantComponent},
			{path: 'consultant', component:ConsultantDetailComponent},
			{path: 'research/form', component: ResearchComponent},
			{path: 'research', component: ResearchRequestDetailComponent},
			{path: 'training/form', component: TrainingComponent},
			{path: 'training', component: TrainingRequestDetailComponent},
			{path: 'request/partner', component: RequestPartnerComponent},
			{path: 'form/finished', component: FinishedComponent},
			{path: 'mission', component: MissionVisionComponent},
			{path: 'blog', component:BlogComponent},
			{path: 'login', component: UserLoginComponent},
			{path: 'register', component: UserRegisterComponent},
			{path: 'user/dashboard', component: UserDashComponent, canActivate:[UserGuardGuard]},
			{path: 'message/detail/:_id', component: MessageDetailComponent, canActivate:[UserGuardGuard]},
			{path: 'user/profile', component:UserProfileComponent, canActivate:[UserGuardGuard]},
			{path: 'user/profile/update', component:UpdateProfileComponent, canActivate:[UserGuardGuard]},
			{path: 'user/profile/password', component:UserPassswordComponent, canActivate:[UserGuardGuard]},
			{ path: 'consultant/consultant.detail', component: ConsultantDetailComponent, canActivate:[UserGuardGuard] },
			{ path: 'user/logout', component: UserLogoutComponent,canActivate:[UserGuardGuard]},
			{ path: 'user/reset/:token', component: ResetPasswordComponent},
			{ path: 'user/forgot', component: ForgetPasswordComponent},
			{ path: 'evaluations', component: EvaluationsComponent},
			{ path: 'evaluations/drag-drop', component: UploadFileComponent},
			{ path: 'aggrements', component:AggrementConsultComponent},
			{ path: 'delivery', component: DeliveryComponent},
			{ path: 'form', component: Form1Component},
		]
	},
	
	// { path: 'research/research_detail', component: Research}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
