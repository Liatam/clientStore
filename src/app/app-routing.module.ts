import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './components/products/products.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { IsAuthGuard } from './services/auth.guard';
import { LogoutComponent } from './components/logout/logout.component';
import { UserSettingsComponent } from './components/user-settings/user-settings.component';
import { AdminAuthGuard } from './services/admin-auth.guard';
import { AdminComponent } from './components/admin/admin.component';

const routes: Routes = [
  // {
  //   path: '',
  //   component: ProductsComponent
  // },
  {
    path: 'products',
    component: ProductsComponent,
  },
  {
    path: 'products/add',
    component: AddProductComponent,
    canActivate: [AdminAuthGuard] 
  },
  {
    path: 'products/edit/:id',
    component: EditProductComponent,
    canActivate: [AdminAuthGuard] 
  },
  {
    path:'admin',
    component:AdminComponent,
    canActivate:[AdminAuthGuard]
  },
  {
    path: '',
    component: ProductsComponent
  },
  {
    path: 'home/login',
    component: LoginComponent
  },
  {
    path: 'home/signup',
    component: SignupComponent
  },
  {
    path: 'home/logout',
    component: LogoutComponent
  },
  {
    path: 'home/settings',
    component: UserSettingsComponent,
    canActivate: [IsAuthGuard] 
  },
  
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
