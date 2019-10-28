﻿import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//import { Product } from './product';

@Injectable()
export class DataService {
    private userUrl = "api/user";
    private linkUrl = "l"
    public readonly UserId: string;

    constructor(private http: HttpClient) {
        

    }

    SignUp(){
        return this.http.get(this.userUrl, { responseType: 'text' });
    }

    SignIn(guid: string) {
        return this.http.get(this.userUrl + "/" + guid, { responseType: 'text' });
    }

    ShortenUrl(guid: string, longUrl: string) {
        return this.http.post(this.linkUrl + "/shorten", { "guid":guid, "longUrl":longUrl }, { responseType:'text' })
    }

    
}