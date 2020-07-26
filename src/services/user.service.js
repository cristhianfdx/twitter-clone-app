class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }
  async create(user) {
    await this.checkUsernameOrEmail(user.username, user.email);
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

  async update(id, user) {
    await this.checkUser(id);
    await this.checkUsernameOrEmail(user.username, user.email);
    return await this.userRepository.update(id, user);
  }

  async delete(id) {
    await this.checkUser(id);
    return await this.userRepository.delete(id);
  }

  async checkUsernameOrEmail(username, email) {
    const alreadyExists = await this.userRepository.findByUsernameOrEmail(
      username,
      email
    );

    if (alreadyExists) {
      throw new Error('Username or email already exists.');
    }
  }
  async checkUser(id) {
    const isExists = await this.getUser(id);
    if (!isExists) throw new Error('User does not exists.');
    return isExists;
  }
}

export default UserService;
