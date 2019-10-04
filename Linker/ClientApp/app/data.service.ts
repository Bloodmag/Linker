import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//import { Product } from './product';

@Injectable()
export class DataService {
    private userUrl = "api/user";
    public readonly UserId: string;

    constructor(private http: HttpClient) {
        

    }

    SignUp(){
        return this.http.get(this.userUrl, { responseType: 'text' });
    }

    SignIn(guid: string) {
        return this.http.get(this.userUrl + "/" + guid, { responseType: 'text' });
    }
}