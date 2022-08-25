import generateToken from '../../utils/generateToken';
import jwt from 'jsonwebtoken';

const { JWT_SECRET } = process.env;

describe('Test generateToken utility function', () => {
  let token: string;

  it('test generate token', () => {
    const fakeUserId = 1;
    token = generateToken(fakeUserId);

    expect(token).toBeDefined();

    let tokenParts = token.split('.');

    expect(tokenParts).toHaveSize(3);
  });

  it('test verify token', () => {
    const fakeUserId = jwt.verify(token, JWT_SECRET as string);

    expect(fakeUserId).toBe("1");
  })
});
