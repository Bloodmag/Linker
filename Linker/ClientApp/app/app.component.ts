import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    //styleUrls: ['./app.component.css'],
    providers: [DataService]
})
export class AppComponent implements OnInit {


    constructor(private dataService: DataService, private cookieService: CookieService) {
        if (cookieService.check("UserId")) {
            dataService.SignIn((cookieService.get("UserId"))).subscribe(x => {
                if (x == "true") {
                    this.userId = cookieService.get("UserId");
                    console.log("Successfully logged as " + this.userId)
                }
                else {
                    dataService.SignUp().subscribe(x => {
                        this.userId = JSON.parse(x);
                        cookieService.set("UserId", this.userId);
                        console.log("Unsuccessful login attempt. Registering as " + this.userId);
                    })
                }
            });
        } else {
            dataService.SignUp().subscribe(x => {
                this.userId = JSON.parse(x);
                cookieService.set("UserId", this.userId);
                console.log("Registered as " + this.userId);
            })
        }



        
    }
    Shorten() : void{
        console.log("ОБРЕЗАНО");
        document.querySelectorAll(".dick_head").forEach(p => p.classList.add("dick_head_animate"));
        document.querySelector(".gil_razor").classList.add("gil_razor_animate");
    }

    

    ngOnInit() {
        this.name = this.dataService.UserId;
        
    }
    
   
    name = '';
    private longUrl: string;
    private userId: string;
}