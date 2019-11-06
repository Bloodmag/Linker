import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';
import { CookieService } from 'ngx-cookie-service';
import { PlatformLocation } from '@angular/common';

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    //styleUrls: ['./app.component.css'],
    providers: [DataService]
})
export class AppComponent implements OnInit {


    constructor(private dataService: DataService, private cookieService: CookieService, platformLocation: PlatformLocation) {
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

        this.pageUrl = platformLocation.href + "l/";
        this.isCopyBtnVisible = false;
        this.isLongUrlValid = false;
        this.regex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\) \*\+,;=.]+$/;
        this.hasShortened = false;
        this.switchText = 'История';
        this.tableView = false;
    }
    Shorten() : void{
        console.log("ОБРЕЗАНО");
        document.querySelectorAll(".dick_head").forEach(p => p.classList.add("dick_head_animate"));
        document.querySelector(".saber").classList.add("saber_anim");
        this.dataService.ShortenUrl(this.userId, this.longUrl).subscribe(x => {
            this.shortUrl = this.pageUrl + JSON.parse(x)["value"];
            
        });
        this.isCopyBtnVisible = true;
        this.hasShortened = true;
        this.Shorten = () => {  };
    }
    OnUrlUpdated(): void {

        this.isLongUrlValid = this.regex.test(this.longUrl);
    }

    switchView(): void {
        if (this.tableView)
            this.switchText = 'История';
        else
            this.switchText = 'Обрезатель';
        this.tableView = !this.tableView;
    }

    ngOnInit() {
        this.name = this.dataService.UserId;
        
    }

    copyToClipBoard():void {
        const selBox = document.createElement('textarea');
        selBox.style.position = 'fixed';
        selBox.style.left = '0';
        selBox.style.top = '0';
        selBox.style.opacity = '0';
        selBox.value = this.shortUrl;
        document.body.appendChild(selBox);
        selBox.focus();
        selBox.select();
        document.execCommand('copy');
        document.body.removeChild(selBox);
    }
   
    name = '';
    private regex: RegExp;
    private shortUrl: string;
    private longUrl: string;
    private userId: string;
    private isLongUrlValid: boolean;
    private isCopyBtnVisible: boolean;
    private hasShortened: boolean;
    private pageUrl: string;
    private switchText: string;
    private tableView: boolean;
}