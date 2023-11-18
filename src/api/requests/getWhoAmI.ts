import { IUser } from "../../types/user"

interface IResponse {
  user: IUser
}

// Имитация запросов с сервера

const getWhoAmI = (): Promise<IResponse> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const token = localStorage.getItem("jwt") || sessionStorage.getItem('jwt')

      if (token === "token-qwerty") {
        resolve({
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

export default getWhoAmI