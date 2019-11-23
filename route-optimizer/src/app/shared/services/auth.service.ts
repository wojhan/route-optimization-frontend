import { Injectable } from "@angular/core";
import { UserService } from "./user.service";
import { CookieService } from "ngx-cookie-service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(
    private userService: UserService,
    public http: HttpClient,
    public cookieService: CookieService
  ) {}

  public getIsAuthenticated(): Observable<boolean> {
    const token = this.cookieService.get("access_token");
    return new Observable(subscriber => {
      if (!token) {
        subscriber.next(false);
      } else {
        this.http
          .post(
            "http://localhost:8000/api/token",
            { token },
            {
              headers: new HttpHeaders({
                "Content-Type": "application/json",
                Authorization: `Token ${token}`
              }),
              responseType: "json"
            }
          )
          .subscribe(
            (data: UserToken) => {
              console.log(data);
              this.userService.userHyperlink.next(data.user);
              this.userService.token = data.key;
              subscriber.next(true);
            },
            () => {
              subscriber.next(false);
            }
          );
      }
    });
  }
}

export interface UserToken {
  user?: string;
  key?: string;
}
