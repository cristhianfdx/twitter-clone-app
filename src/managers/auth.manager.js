import { userService } from './users.manager';
import AuthService from '../services/auth.service';

export const authService = new AuthService(userService);
