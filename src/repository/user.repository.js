import User from '../models/User';

class UserRepository {
  async create(user) {
    const newUser = new User(user);
    return await newUser.save();
  }

  async findById(id) {
    return await User.findById(id);
  }

  async findByUsername(username) {
    return await User.findOne({ username });
  }

  async findByUsernameOrEmail(username = '', email = '') {
    return await User.findOne({ $or: [{ username }, { email }] });
  }
}

export default UserRepository;
