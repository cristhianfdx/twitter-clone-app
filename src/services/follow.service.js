import followRepository from '../repository/follow.repository';

const followService = {
  addFollow: async function (user, followed) {
    if (user !== followed) {
      return await followRepository.addFollow(user, followed);
    }
    throw new Error('You can not follow yourself.');
  },

  removeFollow: async function (user, unFollowed) {
    return await followRepository.removeFollow(user, unFollowed);
  },

  getFollowing: async function (user, params) {
    return await followRepository.getFollowing(user, params);
  },

  getFollowers: async function (user, params) {
    return await followRepository.getFollowers(user, params);
  },
};

export default followService;
