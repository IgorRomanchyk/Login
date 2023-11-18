import { IUser } from "../../types/user"

interface ILogin {
  username: string
  password: string
}

interface IResponse {
  token: string
  user: IUser
}

const postLogin = (body: ILogin): Promise<IResponse> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (body.username === 'testuser' && body.password === '123') {
        resolve({
          token: 'token-qwerty',
          user: {
            id: 1,
            name: "testuser"
          }
        });
      } else {
        reject(new Error('Something is wrong'))
      }
    }, 1000);
  });
}

export default postLogin