import { NgModule } from "@angular/core";
import { MyFilterPipe } from "./filter-pipe.pipe";

@NgModule({
    declarations: [
        MyFilterPipe
    ],
    exports: [
        MyFilterPipe
    ],
})
export class PipesModule { }