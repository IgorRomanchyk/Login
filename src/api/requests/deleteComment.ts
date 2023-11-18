import { IUser } from "../../types/user"

interface ILogin {
  username: string
  password: string
}

interface IResponse {
  successful: boolean
}

interface IBody {
  commentId: number
}

const deleteComment = ({commentId}: IBody): Promise<IResponse> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const commentsArr = JSON.parse(localStorage.getItem('comments') || '[]')
      const newCommentsArr = commentsArr.filter((item: any) => item.id !== commentId)
      localStorage.setItem('comments', JSON.stringify(newCommentsArr))
      resolve({
        successful: true
      })
    }, 0);
  });
}

export default deleteComment