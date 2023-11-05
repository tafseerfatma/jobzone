import { Injectable } from '@angular/core';
import { User} from '../app/model/user.model'
import { HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class JobportalService {
  apiUrl:string;
  constructor(private httpClient:HttpClient) { 
    this.apiUrl="";
  }

  public setUser(user:User):Observable<any>{
    return this.httpClient.post(this.apiUrl+"/api/Users",user);
  }

}
