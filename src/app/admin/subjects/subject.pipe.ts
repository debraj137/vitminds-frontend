import { PipeTransform, Pipe } from "@angular/core";
import { Subject } from "src/app/shared/models/subject";

@Pipe({
  name: "subjectFilter"
})
export class SubjectFilterPipe implements PipeTransform {
  transform(items: Subject[], searchText: string): Subject[] {
    if (!items || !searchText) {
      return items;
    }
    return items.filter(
      sub => sub.name.toLowerCase().indexOf(searchText.toLowerCase()) !== -1
    );
  }
}
