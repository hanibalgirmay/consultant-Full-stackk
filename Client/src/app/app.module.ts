import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatButtonModule,
        MatCheckboxModule ,
        MatFormFieldModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatInputModule,
        MatRippleModule} from '@angular/material';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatStepperModule} from '@angular/material/stepper';
import {MatRadioModule} from '@angular/material/radio';
import { MatDialogModule} from '@angular/material/dialog';
import {MatTabsModule} from '@angular/material/tabs';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
// import {admin_route } from './Administrator/admin-routing/admin-routing.module';
import { RouterModule } from '@angular/router';
import { FileUploadModule } from 'ng2-file-upload';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule ,HTTP_INTERCEPTORS} from '@angular/common/http';
import { AppComponent } from './app.component';
import { ConsultantComponent } from './forms/consultant/consultant.component';
import { TrainingComponent } from './forms/training/training.component';
import { ResearchComponent } from './forms/research/research.component';
import { HeaderComponent } from './home/header/header.component';
import { FooterComponent } from './home/footer/footer.component';
import { HomeComponent } from './home/home/home.component';
import { PartnersComponent } from './home/partners/partners.component';
import { ContactUsComponent } from './home/contact-us/contact-us.component';
import { ConsultantDetailComponent } from './details/consultant-detail/consultant-detail.component';
import { DashboardComponent } from './Administrator/dashboard/dashboard.component';
import { LoginComponent } from './Administrator/login/login.component';
// import { GuardComponent } from './Administrator/guard/guard.component';
import { AdminRoutingModule } from './Administrator/admin-routing/admin-routing.module';
import { AdminPartnerComponent } from './Administrator/dashboard/admin-partner/admin-partner.component';
import { AdminUsersComponent } from './Administrator/dashboard/admin-users/admin-users.component';
import { AdminConsultComponent } from './Administrator/dashboard/admin-consult/admin-consult.component';
import { AdminResearchComponent } from './Administrator/dashboard/admin-research/admin-research.component';
import { AdminTrainingComponent } from './Administrator/dashboard/admin-training/admin-training.component';
import { AuthInterceptor } from './Administrator/shared/auth.interceptor';
import { AuthGuard } from './Administrator/shared/auth.guard';
import { AuthService } from './Administrator/services/auth.service';
import { AdminProfileComponent } from './Administrator/dashboard/admin-profile/admin-profile.component';
import { DetailComponent } from './Administrator/dashboard/admin-partner/detail/detail.component';
import { FinishedComponent } from './forms/finished/finished.component';
import { ConsultDetailComponent } from './Administrator/dashboard/admin-consult/consult-detail/consult-detail.component';
import { ResearchDetailComponent } from './Administrator/dashboard/admin-research/research-detail/research-detail.component';
import { TrainingDetailComponent } from './Administrator/dashboard/admin-training/training-detail/training-detail.component';
import { MessageComponent } from './Administrator/dashboard/message/message.component';
import { UserLoginComponent } from './home/user-login/user-login.component';
import { UserRegisterComponent } from './home/user-register/user-register.component';
import { ClientServiceService } from './home/service/client-service.service';
import { UserGuardGuard } from './home/service/user-guard.guard';
import { UserProfileComponent } from './home/user-profile/user-profile.component';
import { UserPassswordComponent } from './home/user-passsword/user-passsword.component';
import { UserLogoutComponent } from './home/user-login/user-logout.component';
import { ToastrModule} from 'ngx-toastr';
import { ToasterService } from './services/toaster.service';
import { UserDashComponent } from './home/user-dash/user-dash.component';
import { Form1Component } from './home/user-register/form1/form1.component';
import { Form2Component } from './home/user-register/form2/form2.component';
import { Form3Component } from './home/user-register/form3/form3.component';
// import { AddComponent } from './Administrator/dashboard/dialogs/user/add/add.component';
// import { DeleteComponent } from './Administrator/dashboard/dialogs/user/delete/delete.component';
// import { ViewPartnComponent } from './Administrator/dashboard/dialogs/partner/view-partn/view-partn.component';
// import { DelePartnComponent } from './Administrator/dashboard/dialogs/partner/dele-partn/dele-partn.component';
import { MessageDetailComponent } from './home/user-dash/message-detail/message-detail.component';
import { SidebarComponent } from './Administrator/sidebar/sidebar.component';
import { MainHeaderComponent } from './home/header/main-header/main-header.component';
import { RequestPartnerComponent } from './forms/request-partner/request-partner.component';
import { UpdateProfileComponent } from './home/user-profile/update-profile/update-profile.component';
import {ResearchRequestDetailComponent} from './details/research-request-detail/research-request-detail.component';
import {TrainingRequestDetailComponent} from './details/training--request-detail/training-request-detail.component';
import { MissionVisionComponent } from './details/mission-vision/mission-vision.component';
import { BlogComponent } from './home/blog/blog.component';
import { AdminBlogComponent } from './Administrator/dashboard/admin-blog/admin-blog.component';
import { ResetPasswordComponent } from './home/user-login/reset-password/reset-password.component';
import { ForgetPasswordComponent } from './home/user-login/forget-password/forget-password.component';
import { ViewUserComponent } from './Administrator/dashboard/admin-users/view-user/view-user.component';
import { AdminPasswordComponent } from './Administrator/dashboard/admin-password/admin-password.component';
import { EvaluationsComponent } from './home/evaluations/evaluations.component';
import { EvaluationConsultancyComponent } from './forms/evaluations/evaluation-consultancy/evaluation-consultancy.component';
import { EvaluationResearchComponent } from './forms/evaluations/evaluation-research/evaluation-research.component';
import { EvaluationTrainingComponent } from './forms/evaluations/evaluation-training/evaluation-training.component';
import { UploadFileComponent } from './forms/upload-file/upload-file.component';
import { DragDropDirective } from './forms/drag-drop.directive';
import { ViewUserProfileComponent } from './Administrator/dashboard/admin-users/view-user-profile/view-user-profile.component';
import { EvaluatedConsultantComponent } from './Administrator/dashboard/Evaluate/evaluated-consultant/evaluated-consultant.component';
import { EvaluatedResearchComponent } from './Administrator/dashboard/Evaluate/evaluated-research/evaluated-research.component';
import { EvaluatedConsultantViewComponent } from './Administrator/dashboard/Evaluate/evaluated-consultant/evaluated-consultant-view/evaluated-consultant-view.component';
import { EvaluatedResearchViewComponent } from './Administrator/dashboard/Evaluate/evaluated-research/evaluated-research-view/evaluated-research-view.component';
import { AggrementConsultComponent } from './forms/aggrements/aggrement-consult/aggrement-consult.component';
import { ReportprogressResearchComponent } from './Administrator/dashboard/admin-research/reportprogress-research/reportprogress-research.component';
import { DeliveryComponent } from './home/delivery/delivery.component';
// import {AdminLogoutComponent } from './administrator/shared/admin-logout.component';
import { AdminDashFlatModule} from './Administrator/dashboard/admin-dash--flat/admin-dash--flat.module';

@NgModule({
  declarations: [
    AppComponent,
    ConsultantComponent,
    TrainingComponent,
    ResearchComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    PartnersComponent,
    ContactUsComponent,
    ConsultantDetailComponent,
    ResearchRequestDetailComponent,
    TrainingRequestDetailComponent,
    DashboardComponent,
    LoginComponent,
    UserLogoutComponent,
    AdminPartnerComponent,
    AdminUsersComponent,
    AdminConsultComponent,
    AdminResearchComponent,
    AdminTrainingComponent,
    AdminProfileComponent,
    DetailComponent,
    FinishedComponent,
    ConsultDetailComponent,
    ResearchDetailComponent,
    TrainingDetailComponent,
    MessageComponent,
    UserLoginComponent,
    UserRegisterComponent,
    UserProfileComponent,
    UserPassswordComponent,
    UserDashComponent,
    Form1Component,
    Form2Component,
    Form3Component,
    // AddComponent,
    // DeleteComponent,
    // ViewPartnComponent,
    // DelePartnComponent,
    MessageDetailComponent,
    SidebarComponent,
    MainHeaderComponent,
    RequestPartnerComponent,
    UpdateProfileComponent,
    MissionVisionComponent,
    BlogComponent,
    AdminBlogComponent,
    ResetPasswordComponent,
    ForgetPasswordComponent,
    ViewUserComponent,
    AdminPasswordComponent,
    EvaluationsComponent,
    EvaluationConsultancyComponent,
    EvaluationResearchComponent,
    EvaluationTrainingComponent,
    UploadFileComponent,
    DragDropDirective,
    ViewUserProfileComponent,
    EvaluatedConsultantComponent,
    EvaluatedResearchComponent,
    EvaluatedConsultantViewComponent,
    EvaluatedResearchViewComponent,
    AggrementConsultComponent,
    ReportprogressResearchComponent,
    DeliveryComponent,
    // AdminLogoutComponent,
    // Consulting.DetailComponent,
    // Training.DetailComponent,
    // Research.DetailComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule, ReactiveFormsModule,
    MatButtonModule,
    MatCheckboxModule,
    AdminDashFlatModule,
    MatCardModule,
    MatSortModule,
    MatTableModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatStepperModule,
    MatSlideToggleModule,
    MatIconModule,
    MatSelectModule,
    MatTabsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    MatRippleModule,
    MatRadioModule,
    MatSnackBarModule,
    FileUploadModule,
    AdminRoutingModule,
    ToastrModule.forRoot(), // ToastrModule added
    AppRoutingModule
  ],
  exports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule ,
    MatRippleModule,
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  },AuthGuard,AuthService,ClientServiceService, UserGuardGuard,ToasterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
