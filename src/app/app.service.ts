import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import * as moment from 'moment';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {environment} from "../environments/environment";

@Injectable()
export class AppService {
    httpOptions = {
        headers: new HttpHeaders({
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Request-Method': 'POST,GET,PUT,DELETE,OPTIONS',
            'Access-Control-Request-Headers': 'Content-Type, Authorization'
        })
    };
    public showAlert = new Subject();
    formatDate: string = 'DD-MM-YYYY';
    hourFormat: string = 'HH:mm';

    public reloadMenu = new Subject();

    constructor(private http: HttpClient) {
    }

    _clone(data) {
        return JSON.parse(JSON.stringify(data));
    }

    changeFormatDate(date, format?: string, notTime?: boolean, seconds?: boolean) {
        if (format)
            this.formatDate = format;
        if (date && date != '')
            if (date.length == 10) {
                const partes = date.toString().split('-');
                if (partes[2].length == 4) {
                    date = partes[2] + '-' + partes[1] + '-' + partes[0];
                }
            }
        let dateResult = null;
        if (date != undefined && date != null && date != '') {
            let formatDate: string;
            let dateMoment = null;
            if (notTime == true) {
                dateMoment = moment(this._clone(date)).format('YYYY-MM-DD');
                formatDate = this.formatDate;
            }
            if (notTime == undefined || notTime == false) {
                let secondsFormat = seconds == true ? ':ss' : '';
                dateMoment = moment(date).format(`YYYY-MM-DD HH:mm${secondsFormat}`);
                formatDate = this.formatDate + ' ' + this.hourFormat + secondsFormat;
            }
            dateResult = moment(dateMoment).format(formatDate);
        }
        if (dateResult === 'Invalid date') {
            let formatDate = this.formatDate + ' ' + this.hourFormat;
            dateResult = moment(date, 'x').format(formatDate);
        }
        return dateResult;
    }

    /**
     * Allows to use http get sending only params as a unique option or
     * custom RequestOptions.0
     *
     * @param endpoint
     * @param params: It should be [{param: string, val: string|number}, ...]
     * @param options
     * @returns {Observable<Response>}
     */
    get(domain: string, endpoint: string, params?: any, options?: any) {
        if (params) {
            let p = new URLSearchParams();
            params.forEach(param => {
                p.set(param['param'], param['val']);
            });
        }
        return this.http.get(
            domain + '/' + endpoint,
            options
        );
    }

    /**
     * Allows to use http post.
     *
     * @param endpoint
     * @param body
     * @param options
     * @returns {Observable<Response>}
     */
    post(domain: string, endpoint: string, body: any, options?: any) {
        let params = new HttpParams();

        const options2 = {
            params: params,
            reportProgress: true,
        };
        //this.headers.append('Accept', 'application/json');
        //this.headers.append('Content-Type', 'application/json');
        return this.http.post(domain + '/' + endpoint, body, options2);
    }

    /**
     * Allows to use http patch as goal to edit an specific field of
     * the endpoint.
     *
     * @param endpoint
     * @param body
     * @param options
     * @returns {Observable<Response>}
     */
    patch(domain: string, endpoint: string, body: any, options?: any) {
        return this.http.patch(domain + '/' + endpoint, body, options);
    }

    /**
     * Allows to use http put as goal to edit all data of the endpoint.
     *
     * @param endpoint
     * @param body
     * @param options
     * @returns {Observable<Response>}
     */
    put(domain: string, endpoint: string, body?: any, options?: any) {
        return this.http.put(domain + '/' + endpoint, body, options);
    }

    /**
     * Allows to use http delete as goal to edit all data of the endpoint.
     *
     * @param endpoint
     * @param options
     * @returns {Observable<Response>}
     */
    remove(domain: string, endpoint: string, options?: any) {
        return this.http.delete(domain + '/' + endpoint, options);
    }

    saveTxt(data: any, uuid: any): Observable<any> {
        //console.log('server', data);
        let formData = new FormData();
        formData.append("file", data);
        //console.log('antes de ir', formData);
        let url = `${environment.api.dataApis}/shared/txt`;
        return this.http.post(url, formData, this.httpOptions);
    }

    saveImg(data: any, uuid: any): Observable<any> {
        //console.log('server', data);
        let formData = new FormData();
        formData.append("file", data);
        //console.log('antes de ir', formData);
        let url = `${environment.api.dataApis}/shared/img`;
        return this.http.post(url, formData, this.httpOptions);
    }

    getTxt(): Observable<any> {
        let url = `${environment.api.dataApis}/shared/txt-read`;
        return this.http.get(url);
    }

    getImg(): Observable<any> {
        let url = `${environment.api.dataApis}/shared/img-read`;
        return this.http.get(url);
    }
}
