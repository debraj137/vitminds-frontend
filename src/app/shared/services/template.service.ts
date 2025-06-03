import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class TemplateService {
  public code: string;

  constructor() {}

  initiliazeTemplate(language): any {
    if (language === "Java") {
      this.code =
        "public class Solution {\n" +
        'public static void main(String args[]){\n System.out.println("Hello world");' +
        "}\n" +
        "}";
    } else if (language === "C") {
      this.code =
        "#include <stdio.h>\n" +
        'int main() {\n  printf("Hello, World!");' +
        "return 0;\n" +
        "}";
    } else if (language === "C++") {
      this.code =
        "#include <iostream>\n" +
        "using namespace std;\n" +
        'int main() {\n printf("Hello, World!");' +
        "return 0;\n" +
        "}";
    } else if (language === "PHP") {
      this.code = '<?php\n print("Hello, World!");' + "?>";
    } else if (language === "C#") {
      this.code =
        "using System; \n" +
        "using System.Collections.Generic; \n" +
        "using System.Linq;\n " +
        "using System.Text; \n " +
        "using System.Threading.Tasks; \n " +
        "namespace ConsoleApp{ \n" +
        "class Program { \n " +
        "static void Main(string[] args) { \n" +
        'Console.WriteLine("Hello, world!");\n \n' +
        "} \n }\n }";
    } else {
      this.code = "";
    }

    return this.code;
  }
}
