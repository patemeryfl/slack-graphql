import axios from 'axios';

describe('Testing User Resolvers', () => {
  test('allUsers', async () => {
    const response = await axios.post('http://localhost:3000/graphql', {
      query: `
        query {
          allUsers {
            id
            username
            email
          }
        }
      `,
    });
    const { data } = response;
    expect(data).toMatchObject({
      data: {
        allUsers: [
          {
            id: 1,
            username: 'patemery',
            email: 'patemery@bu.edu',
          },
          {
            id: 2,
            username: 'zUser',
            email: 'zemail@gmail.com',
          },
        ],
      },
    });
  });
});
