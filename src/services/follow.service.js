class FollowService {
  constructor(userService) {
    this.userService = userService;
  }

  async addFollow(currentUser, userId) {
    return await this.userService.addFollow(currentUser, userId);
  }
}

export default FollowService;
