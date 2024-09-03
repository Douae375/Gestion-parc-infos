import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserDTO } from './models/User-dto.model';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends GenericService<UserDTO> {
  constructor(http: HttpClient) {
    super(http, 'http://localhost:1010/api/users');
  }
}
