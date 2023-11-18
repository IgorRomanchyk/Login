import { IUser } from "../../types/user"

interface IResponse {
  user: IUser
}

const getComments = (imageId: number): Promise<IResponse> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {  
      const comments = JSON.parse(localStorage.getItem('comments') || '[]')
      const filterByImageId = comments.filter((item: any) => item.imageId === imageId)
      resolve(filterByImageId)
    }, 0);
  });
}

export default getComments