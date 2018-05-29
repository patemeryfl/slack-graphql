import formatErrors from '../utilities';

export default {
  Mutation: {
    createChannel: async (parent, args, { models }) => {
      try {
        const channel = await models.Channel.create(args);
        return {
          channel,
          ok: true,
        };
      } catch (err) {
        console.log(err);
        return {
          ok: false,
          errors: formatErrors(err),
        };
      }
    },
  },
};
