import requiresAuth from '../utilities/permissions';
import formatErrors from '../utilities/formatErrors';

export default {
  DirectMessage: {
    sender: ({ sender, senderId }, args, { models }) => {
      if (sender) {
        return sender;
      }

      return models.User.findOne({ where: { id: senderId } }, { raw: true });
    },
  },
  Query: {
    directMessages: requiresAuth.createResolver(async (parent, { teamId, otherUserId }, { models, user }) =>
      models.DirectMessage.findAll(
        {
          order: [['created_at', 'ASC']],
          where: {
            teamId,
            [models.sequelize.Op.or]: [
              {
                [models.sequelize.Op.and]: [{ receiverId: otherUserId }, { senderId: user.id }],
              },
              {
                [models.sequelize.Op.and]: [{ receiverId: user.id }, { senderId: otherUserId }],
              },
            ],
          },
        },
        { raw: true },
      )),
  },
  Mutation: {
    createDirectMessage: requiresAuth.createResolver(async (parent, { email }, { models }) => {
      try {
        const newDirectMessageUser = await models.User.findOne({ where: { email } }, { raw: true });
        if (!newDirectMessageUser) {
          return {
            ok: false,
            errors: [{ path: 'email', message: 'Could not find user with this email' }],
          };
        }
        return {
          user: newDirectMessageUser,
          ok: true,
        };
      } catch (err) {
        console.log(err);
        return {
          ok: false,
          errors: formatErrors(err, models),
        };
      }
    }),
    sendDirectMessage: requiresAuth.createResolver(async (parent, args, { models, user }) => {
      try {
        const directMessage = await models.DirectMessage.create({
          ...args,
          senderId: user.id,
        });
        if (!directMessage) return false; // Silence eslint

        // const asyncFunc = async () => {
        //   const currentUser = await models.User.findOne({
        //     where: {
        //       id: user.id,
        //     },
        //   });

        //   pubsub.publish(NEW_CHANNEL_MESSAGE, {
        //     channelId: args.channelId,
        //     newChannelMessage: {
        //       ...message.dataValues,
        //       user: currentUser.dataValues,
        //     },
        //   });
        // };

        // asyncFunc();

        return true;
      } catch (err) {
        console.log(err);
        return false;
      }
    }),
  },
};
