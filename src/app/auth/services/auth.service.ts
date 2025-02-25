import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { catchError, mapTo, tap } from 'rxjs/operators';
import { config } from './../../config';
import { Tokens } from '../models/tokens';
import {environment} from "../../../environments/environment";
import {Router} from "@angular/router";

@Injectable({
    providedIn: 'root',
})
export class AuthService {

    private readonly JWT_TOKEN = 'JWT_TOKEN';
    private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';
    private readonly USER_CURRENT = 'USER_CURRENT';
    private readonly PERMISSION = 'PERMISSION';
    private readonly COMPANY = 'COMPANY';
    private loggedUser: string;

    constructor(
        private http: HttpClient,
        private router: Router,
        ) {}

    login(user: { email: string, password: string }): Observable<boolean> {
        return this.http.post<any>(`${environment.api.utcvApis}/login`, user);
    }

    logout() {
        return this.http.post<any>(`${environment.api.utcvApis}/logout`, {
            'refreshToken': this.getRefreshToken(),
        }).pipe(
            tap(() => this.doLogoutUser()),
            mapTo(true),
            catchError(error => {
                //console.log(error);
                this.doLogoutUser();
                setTimeout(() => {
                    this.router.navigate(['/login']);
                },800);
                // alert(error.error.error);
                return of(false);
            }));
    }

    register(data): Observable<boolean> {
        let url = `${environment.api.utcvApis}/register`;
        return this.http.post<any>(url, data);
    }

    isLoggedIn() {
        return !!this.getJwtToken();
    }

    refreshToken() {
        return this.http.post<any>(`${environment.api.utcvApis}/refresh`, {
            'refreshToken': this.getRefreshToken(),
        }).pipe(tap((tokens: Tokens) => {
            this.storeJwtToken(tokens.jwt);
        }));
    }

    getJwtToken() {
        return localStorage.getItem(this.JWT_TOKEN);
    }

    doLoginUser(username: string, tokens: any) {
        this.loggedUser = username;
        this.storeTokens(tokens);
    }

    private doLogoutUser() {
        this.loggedUser = null;
        this.removeTokens();
    }

    private getRefreshToken() {
        return localStorage.getItem(this.REFRESH_TOKEN);
    }

    private storeJwtToken(jwt: string) {
        localStorage.setItem(this.JWT_TOKEN, jwt);
    }

    private storeTokens(tokens: Tokens) {
        localStorage.setItem(this.JWT_TOKEN, tokens.jwt);
        localStorage.setItem(this.REFRESH_TOKEN, tokens.refreshToken);
        localStorage.setItem(this.USER_CURRENT, JSON.stringify(tokens.user));
        localStorage.setItem(this.PERMISSION, JSON.stringify(tokens.assignedPermission));
        localStorage.setItem(this.COMPANY, tokens.user.uuidCompany);
    }

    private removeTokens() {
        localStorage.removeItem(this.JWT_TOKEN);
        localStorage.removeItem(this.REFRESH_TOKEN);
        localStorage.removeItem(this.USER_CURRENT);
        localStorage.removeItem(this.PERMISSION);
    }
}
