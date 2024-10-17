import { Directive, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";

@Directive({
  selector: "[appSubsManager]",
  standalone: true,
})
export class SubsManagerDirective implements OnDestroy {
  protected subs = new Subscription();

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
