import { createSlice } from "@reduxjs/toolkit"

interface IComment {
  id: number
  comment: string
  imageId: number
}

const ImagesSlice = createSlice({
  name: "images",
  initialState: {
    images: JSON.parse(localStorage.getItem('images') || '[]') || [],
    comments: JSON.parse(localStorage.getItem('comments') || '[]') || [],
    status: null,
    error: null
  },
  reducers: {
    setImages(state, action) {
      state.images = action.payload
      localStorage.setItem("images", JSON.stringify(action.payload));
    },
    setComment(state, action) {
      state.comments.push(action.payload)
    },
    removeComment(state, action) {
      console.log(action)
      state.comments = state.comments.filter((item: IComment) => item.id !== action.payload.commentId)

    }
  },
})

export const { setImages, setComment, removeComment } = ImagesSlice.actions

export default ImagesSlice.reducer