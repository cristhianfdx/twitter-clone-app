import TweetRepository from '../repository/tweet.repository';
import TweetService from '../services/tweet.service';
import { userService } from './users.manager';

const tweetRepository = new TweetRepository();
export const tweetService = new TweetService(tweetRepository, userService);
