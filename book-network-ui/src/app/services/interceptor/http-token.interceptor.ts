import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from "rxjs";
import {TokenService} from "../token/token.service";
import {Injectable} from "@angular/core";

@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {
  constructor(
    private tokenService: TokenService,
  ) {

  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.tokenService.token
    if(token){
      const authReq = req.clone({
        headers: new HttpHeaders({
          'Authorization': 'Bearer ' + token
        })
      });
      return next.handle(authReq);
    }
    return next.handle(req);
  }

}
