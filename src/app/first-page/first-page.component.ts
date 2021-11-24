import { Component } from "@angular/core";
import { RouterExtensions } from "@nativescript/angular";
import { EventData } from "@nativescript/core";

@Component({
  selector: "ns-first-page",
  templateUrl: "./first-page.component.html",
})
export class FirstPageComponent {
  //////////////////////////////////////////////////////////////////////
  constructor(private router: RouterExtensions) {}
  //////////////////////////////////////////////////////////////////////
  public onTap(args: EventData) {
    this.router.navigate(["/items"]);
  }
}
