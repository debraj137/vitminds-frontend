import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { GrdFilterPipe } from "./grd-filter.pipe";

@NgModule({
  imports: [CommonModule],
  declarations: [GrdFilterPipe],
  exports: [GrdFilterPipe]
})
export class PipeModule {}
