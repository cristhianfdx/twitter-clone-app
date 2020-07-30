import Follow from '../models/Follow';

const followRepository = {
  addFollow: function (user, followed) {
    return new Promise(function (resolve, reject) {
      Follow.findOne({ user }, function (err, result) {
        if (err) return reject({ message: err });

        if (result) {
          result.followed.push(followed);
          return resolve(result.save());
        }

        const follow = new Follow();
        follow.user = user;
        follow.followed.push(followed);
        return resolve(follow.save());
      });
    });
  },

  removeFollow: function (user, unFollowed) {
    return new Promise((resolve, reject) => {
      Follow.findOne({ user }, (err, follow) => {
        if (err) return reject({ message: err });
        if (follow) {
          if (follow.followed.length > 1) {
            const index = follow.followed.indexOf(unFollowed);
            follow.followed.splice(index, 1);
            return resolve(follow.save());
          }
          return resolve(Follow.deleteOne({ _id: follow._id }));
        }
        return reject('Follower not exists.');
      });
    });
  },

  getFollowing: async function (user, params) {
    const { page, userId } = params;
    const criteria = userId ? userId : user;

    return await Follow.paginate(
      { user: criteria },
      {
        sort: { createdAt: -1 },
        page,
        populate: {
          path: 'followed',
          select: ['-password', '-updatedAt', '-createdAt'],
        },
      }
    );
  },

  getFollowers: async function (user, params) {
    const { page, userId } = params;
    const criteria = userId ? userId : user;

    return await Follow.paginate(
      { followed: criteria },
      {
        sort: { createdAt: -1 },
        page,
        populate: {
          path: 'user',
          select: ['-password', '-updatedAt', '-createdAt'],
        },
      }
    );
  },
};

export default followRepository;
