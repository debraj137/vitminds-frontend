import { Component, OnInit } from "@angular/core";
import { QuestionsService } from "../shared/services/end-user-services/questions.service";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthenticationService } from '../shared/services/common-services/authentication.service';

@Component({
  selector: "app-language-domain",
  templateUrl: "./language-domain.component.html",
  styleUrls: ["./language-domain.component.scss"]
})
export class LanguageDomainComponent implements OnInit {

  public user;
  public loginMessage: string;

  constructor(
    private questionservice: QuestionsService,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  practiceQList = [];
  ngOnInit() {
    
    this.authenticationService.currentUser.subscribe(u=>{
      if(u != null){
        this.user = u;
      }
    });

    let id = this.route.params["value"].id;
    this.questionservice.getPracticeQuestions(id).subscribe(r => {
      // console.log("response after getting practice question list ", r);
      if (r["message"] == "practice questions get succesfully") {
        this.practiceQList = r["practice_questions"];
      }
    });
  }
  filterQuestion(deff_level) {
    console.log("deff_level====" + deff_level);
    this.practiceQList = this.practiceQList.filter(
      ele => ele.difficulty == deff_level
    );
  }

  // validateLogin(){
  //   if(this.user != null){
      
  //   }
  // }

  gotolanguageTask(id) {
    // console.log("q id ", id);
    if(this.user != null){
      this.router.navigate(["/auth/language_task/" + `${id}`]);
    }
    else{
      this.router.navigate(["/auth/login"]);
    }
   
  }

}
