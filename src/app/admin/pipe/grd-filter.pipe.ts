import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "grdFilter"
})
export class GrdFilterPipe implements PipeTransform {
  // transform(value: any, args?: any): any {
  //   return null;
  // }

  transform(items: any[], filter: any): any {
    if (!items) return [];
    if (!filter) {
      // console.log("first if condition !filter");
      return items;
    }

    if (!Array.isArray(items)) {
      //console.log("second if condition !Array.isArray(items)");
      return items;
    }

    if (filter && Array.isArray(items)) {
      let filterKeys = Object.keys(filter);
      // console.log("filter key ", filterKeys);

      // if (defaultFilter) {
      //   // console.log("default filter ", defaultFilter);

      //   return items.filter(item =>
      //     filterKeys.reduce(
      //       (x, keyName) =>
      //         (x && new RegExp(filter[keyName], "gi").test(item[keyName])) ||
      //         filter[keyName] == "",
      //       true
      //     )
      //   );
      // }
      if (filter != null) {
        return items.filter(item => {
          return filterKeys.some(keyName => {
            if (item.category == undefined) {
              //console.log("type of item ", typeof item, typeof this.category);
              return (
                new RegExp(filter[keyName], "gi").test(item[keyName]) ||
                filter[keyName] == ""
              );
            } else {
              return (
                new RegExp(filter[keyName], "gi").test(item[keyName]) ||
                new RegExp(filter[keyName], "gi").test(
                  item.category[keyName]
                ) ||
                filter[keyName] == ""
              );
            }
          });
        });
      }
    }
  }
}
