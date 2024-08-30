// src/app/models/login-response.model.ts
import { UserDTO } from './User-dto.model';  // Adjust the import path as necessary

export interface LoginResponse {
    token: string;
    user:UserDTO;
  }
  