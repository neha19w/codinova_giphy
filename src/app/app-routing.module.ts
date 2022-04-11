import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GifComponent } from './gif/gif.component';

const routes: Routes = [
  { path: '', redirectTo: 'gif.component', pathMatch: 'full', },
  { path: 'gif.component', component: GifComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
