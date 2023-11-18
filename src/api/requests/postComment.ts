interface IResponse {
  comment: string
  id: number
  imageId: number
}

interface IBody {
  imageId: number
  comment: string
}

const postComment = ({imageId, comment}: IBody): Promise<IResponse> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const obj = {
        id: new Date().getTime(),
        comment,
        imageId,
      }
      const commentsArr = JSON.parse(localStorage.getItem('comments') || '[]')
      commentsArr.push(obj)
      localStorage.setItem('comments', JSON.stringify(commentsArr))
      resolve({
        id: new Date().getTime(),
        comment,
        imageId,

      });
      
    }, 0);
  });
}

export default postComment