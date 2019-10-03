import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
//import { Product } from './product';

@Injectable()
export class DataService {
    private userUrl = "/api/user";
    public readonly UserId: string;

    constructor(private http: HttpClient, private cookieService: CookieService) {
        if (cookieService.check("UserId") && this.SignIn(cookieService.get("UserId"))) {
            this.UserId = cookieService.get("UserId");
        } else {
            let guid: string = this.SignUp();
            console.log(this.SignUp());
            cookieService.set("UserID", guid);
            this.UserId = guid;
        }
        console.log("kek");
        console.log(this.UserId)
    }

    SignUp(): string {
        return this.http.get(this.userUrl, { responseType: 'text' })[0];
    }

    SignIn(guid: string): boolean {
        return this.http.get(this.userUrl + "/" + guid, { responseType: 'text' })[0] == "true";
    }
}