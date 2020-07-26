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

  async getByEmail(email) {
    return await this.userRepository.findByEmail(email);
  }

  async getByUsername(username) {
    return await this.userRepository.findByUsername(username);
  }

  async getByUsernameOrEmail(username, email) {
    return await this.userRepository.findByUsernameOrEmail(username, email);
  }

  async update(id, user) {
    const isExists = await this.getUser(id);
    const alreadyExists = await this.getByUsernameOrEmail(
      user.username,
      user.email
    );

    if (alreadyExists) {
      throw new Error('Username or email already exists.');
    }
    if (isExists) {
      return await this.userRepository.update(id, user);
    }
    throw new Error('User does not exists.');
  }
}

export default UserService;
