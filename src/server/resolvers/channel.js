import formatErrors from '../utilities/formatErrors';
import requiresAuth from '../utilities/permissions';

export default {
  Mutation: {
    createChannel: requiresAuth.createResolver(async (parent, args, { models, user }) => {
      try {
        const team = await models.Team.findOne({ where: { id: args.teamId } });
        if (team.owner !== user.id) {
          return {
            ok: false,
            errors: [
              {
                path: 'name',
                message: 'You must be the owner of the team to create channels',
              },
            ],
          };
        }
        const channel = await models.Channel.create(args);
        return {
          channel,
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
  },
};
