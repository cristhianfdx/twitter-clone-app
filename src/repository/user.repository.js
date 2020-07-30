import User from '../models/User';

const userRepository = {
  create: async function (user) {
    const newUser = new User(user);
    return await newUser.save();
  },

  findAll: async function (page) {
    return await User.paginate(
      {},
      {
        sort: { createdAt: -1 },
        page,
        select: ['-password'],
      }
    );
  },

  findById: async function (id) {
    return await User.findById(id);
  },

  findByUsernameOrEmail: async function (username = '', email = '') {
    return await User.findOne({ $or: [{ username }, { email }] });
  },

  findByUsername: async function (username) {
    return await User.findOne({ username }).select('-password');
  },

  findByEmail: async function (email) {
    return await User.findOne({ email });
  },

  update: async function (id, user) {
    return await User.findOneAndUpdate(id, user);
  },

  delete: async function (id) {
    return await User.deleteOne({ _id: id });
  },
};

export default userRepository;
