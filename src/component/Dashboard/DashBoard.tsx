import BasicTable from "./BasicTable";
import { AiOutlineLogout } from "react-icons/ai";
import { useAppDispatch,useAppSelector } from "../../Redux/Store";
import { logOut } from "../../Redux/UserSlice";

const DashBoard = () => {
  const User = useAppSelector((state) => state.User);
  const dispatch = useAppDispatch();
  return (
    <div className="tableContainer">
      <div style={{display:"flex" ,justifyContent:"space-between"}}>
        <h1>User List</h1>
        <div>
          <AiOutlineLogout  size={25} style={{cursor:"pointer"}} onClick={()=>{
            dispatch(logOut())}}/>
        </div>
      </div>
      <BasicTable />
    </div>
  );
};

export default DashBoard;
