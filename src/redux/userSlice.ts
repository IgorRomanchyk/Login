import { createSlice } from "@reduxjs/toolkit"

const UserSlice = createSlice({
  name: "user",
  initialState: {
    user: {
      id: '',
      name: ''
    }
  },
  reducers: {
    setUser(state, action) {
      state.user.id = action.payload.user.id
      state.user.name = action.payload.user.name
    },
  }
})

export const {setUser} = UserSlice.actions

export default UserSlice.reducer