import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewportComponent } from './viewport/viewport.component';
import { StatsComponent } from './stats/stats.component';
import { YourColorsComponent } from './your-colors/your-colors.component';
import { SettingsComponent } from './settings/settings.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { TagComponent } from './tag/tag.component';

export const routes: Routes = [
  {path: '', redirectTo: 'Login', pathMatch: 'full'},
  {path: 'Home', component: ViewportComponent},
  {path: 'Stats', component: StatsComponent},
  {path: 'Your Colors', component: YourColorsComponent},
  {path: 'Settings', component: SettingsComponent},
  {path: 'About', component: AboutComponent},
  {path: 'Login', component: LoginComponent},
  {path: 'Tags', component: TagComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
