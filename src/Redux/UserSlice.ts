import { PayloadAction, createSlice} from "@reduxjs/toolkit";
interface user {
  _id: string;
  name: string;
  email: string;
}

const initialState: user = {
  _id: "",
  name: "",
  email: "",
};
const UserSlice = createSlice({
  name: "Person",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<user>) => {
      return action.payload;
    },
    logOut:()=>{
            return initialState
    }
  },
});
export default UserSlice.reducer;
export const { addUser,logOut } = UserSlice.actions;
