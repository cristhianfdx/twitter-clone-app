import { userService } from './users.manager';
import FollowService from '../services/follow.service';

export const followService = new FollowService(userService);
