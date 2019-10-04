import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
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
    }

    SignUpSync(): string {
        this.dataService.SignUp().subscribe(x => { this.guid = x; console.log(this.guid);})
        return this.guid;
    }

    SignInSync(guid: string): boolean {
        this.dataService.SignIn(guid).subscribe(x => { this.ret = JSON.parse(x); console.log(this.ret) });
        return this.ret;
    }

    ngOnInit() {
        this.name = this.dataService.UserId;
        
    }
    
    private guid: string;
    private ret: boolean;
    name = '';
    private userId: string;
}