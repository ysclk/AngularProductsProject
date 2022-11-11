import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ProductUpdateComponent } from './product-update/product-update.component';



const routes: Routes = [
  {path:'products',component:AppComponent},
  {path:'productForm', component:ProductUpdateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
