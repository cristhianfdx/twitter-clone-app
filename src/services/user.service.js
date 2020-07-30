import userRepository from '../repository/user.repository';

const userService = {
  create: async function (user) {
    await this.checkUsernameOrEmail(user.username, user.email);
    return userRepository.create(user);
  },

  getAll: async function (page) {
    return await userRepository.findAll(page);
  },

  getUser: async function (id) {
    const user = await userRepository.findById(id);
    if (!user) throw new Error('User does not exists.');
    return user;
  },

  getByUsername: async function (username) {
    const user = await userRepository.findByUsername(username);
    if (!user) {
      throw new Error('User does not exists');
    }
    return user;
  },

  getByEmail: async function (email) {
    return await userRepository.findByEmail(email);
  },

  checkUsernameOrEmail: async function (username, email) {
    const alreadyExists = await userRepository.findByUsernameOrEmail(
      username,
      email
    );

    if (alreadyExists) {
      throw new Error('Username or email already exists.');
    }
  },

  async update(id, request) {
    const { username, email } = request;
    await this.checkUsernameOrEmail(username, email);
    return await userRepository.update(id, request);
  },

  delete: async function (id) {
    return await userRepository.delete(id);
  },
};

export default userService;
