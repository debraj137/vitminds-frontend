import { PipeTransform, Pipe } from "@angular/core";
import { College } from "src/app/shared/models/college";

@Pipe({
  name: "collegeFilter"
})
export class CollegeFilterPipe implements PipeTransform {
  transform(collegelist: College[], searchText: string): College[] {
    if (!collegelist || !searchText) {
      return collegelist;
    }
    return collegelist.filter(
      college =>
        college.collegeName.toLowerCase().indexOf(searchText.toLowerCase()) !==
        -1
    );
  }
}
