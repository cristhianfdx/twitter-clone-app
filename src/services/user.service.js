class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }
  async create(user) {
    return this.userRepository.create(user);
  }

  async getUser(userId) {
    return await this.userRepository.findById(userId);
  }

  async getByUsername(username) {
    return await this.userRepository.findByUsername(username);
  }

  async getByUsernameOrEmail(username, email) {
    return await this.userRepository.findByUsernameOrEmail(username, email);
  }
}

export default UserService;
