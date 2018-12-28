import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { reject } from 'q';

@Injectable({
  providedIn: 'root'
})
export class RestService {
  url: string;
  token: string;

  constructor(private http: HttpClient,
    // private transfer: FileTransfer
    ) {
    this.url = environment.wsUrl;
    this.token = localStorage.getItem('token');
    // console.log(this.url, this.token);
   }
/*
  // full example
  upload(img, id) {
    const headers = new HttpHeaders({
      'token': this.token,
      'Content-Type': 'application/form-data'
    });
    let options: FileUploadOptions = {
      fileKey: 'archivo',
      chunkedMode: false,
      httpMethod: 'PUT',
      headers: {
        headers
      }

      //mimeType: 'multipart/form-data',
    }
    const fileTransfer: FileTransferObject = this.transfer.create();


    return fileTransfer.upload(img, `${this.url}/upload/usuarios/${id}`, options)

  }*/

  login(email, password) {
    // tslint:disable-next-line:no-shadowed-variable
    return new Promise((resolve, reject) => {
      this.http.post(`${this.url}/login`, {
        email,
        password
      }).subscribe((data: any) => {
        console.log(data);
        localStorage.setItem('token', data.token);
        localStorage.setItem('usuario', JSON.stringify(data.usuario));
         resolve(true);
      }, (err) => {
          reject(err);
      });

    });
  }
  register(data) {
    return this.http.post(`${this.url}/usuario/crear`, data);
  }
  register_pasajero(data) {
    return this.http.post(`${this.url}/pasajero`, data);
  }
  post(url, data) {
    const headers = new HttpHeaders({ token: this.token });
    return this.http.post(`${this.url}/${url}`, data, { headers });
  }
  get(url) {
    const headers = new HttpHeaders({ token: this.token });

    return this.http.get(`${this.url}/${url}`, { headers });
  }
  put(url, data) {
    const headers = new HttpHeaders({ token: this.token });

    return this.http.put(`${this.url}/${url}`, data, { headers });
  }
  put_img(url, data) {
    const headers = new HttpHeaders({
      'token': this.token,
      'Content-Type': 'application/form-data'
    });

    return this.http.put(`${this.url}/upload/usuarios/${url}`, data, {
      headers
    });
  }
  delete(url) {
    const headers = new HttpHeaders({ token: this.token });

    return this.http.delete(`${this.url}/${url}`, { headers });
  }
}
