import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "@nativescript/angular";

import { ItemsComponent } from "./item/items.component";
import { FirstPageComponent } from "./first-page/first-page.component";

const routes: Routes = [
  { path: "", redirectTo: "/main", pathMatch: "full" },
  { path: "main", component: FirstPageComponent },
  { path: "items", component: ItemsComponent },
];

@NgModule({
  imports: [NativeScriptRouterModule.forRoot(routes)],
  exports: [NativeScriptRouterModule],
})
export class AppRoutingModule {}
