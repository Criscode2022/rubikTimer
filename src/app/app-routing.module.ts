import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CubeComponent } from "./cube/cube.component";
import { HeaderComponent } from "./layout/header/header.component";
import { TimesComponent } from "./times/times.component";

const routes: Routes = [
  {
    path: "",
    component: HeaderComponent,
    children: [
      { path: "", redirectTo: "3", pathMatch: "full" },
      { path: "times", component: TimesComponent },
      { path: ":cube", component: CubeComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
