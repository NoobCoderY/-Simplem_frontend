import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router";
import { useMutation } from "@apollo/client";
import { Del_user } from "../../Graphql/Mutation";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Watch } from "react-loader-spinner";
import { logOut } from "../../Redux/UserSlice";
import { useAppDispatch, useAppSelector } from "../../Redux/Store";

export default function BasicTable() {
  const [userData, setuserData] = useState([]);
  const [deleteUser, { error }] = useMutation(Del_user);
  const [recall, setRecall] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const User = useAppSelector((state) => state.User);
  const dispatch = useAppDispatch();

  const notify = (err: string) => {
    toast(err);
  };

  async function deleUser(id: string) {
    setIsLoading(true);
    await deleteUser({
      variables: {
        _id: id,
      },
    }).then(() => {
      //loader logic
      // setTimeout(() => {
      //   setIsLoading(false);
      // }, 1500);
      // if (id === User._id) {
      //   dispatch(logOut);
      // }
      setRecall(!recall);
    });
  }
  useEffect(() => {
    axios
      .post(
        "",
        {
          query: ` 
        query{
         AllUserDetails{
             _id,
             email,
             name
          }
        }
        `,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((result: any) => {
        if (Object.keys(result.data).includes("errors")) {
          notify(result.data.errors[0].message);
        } else {
          setuserData(result.data.data.AllUserDetails);
        }
      });
  }, [recall]);

  const navigate = useNavigate();

  function NavigatePage(id: string): void {
    navigate(`/editprofile/${id}`);
  }
  console.log(isLoading);

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Edit</TableCell>
              <TableCell align="center">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userData?.map((arr_data: any, index: number) => (
              <TableRow
                key={arr_data._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {arr_data._id}
                </TableCell>
                <TableCell component="th" scope="row">
                  {arr_data.name}
                </TableCell>
                <TableCell>{arr_data.email}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    onClick={(e) => {
                      NavigatePage(arr_data._id);
                    }}
                  >
                    Edit
                  </Button>
                </TableCell>
                <TableCell align="center">
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => {
                      deleUser(arr_data._id);
                    }}
                  >
                    Delete
                  </Button>
                </TableCell>
                <TableCell align="center">
                  {isLoading && (
                    <div className="loader">
                      <Watch
                        height="40"
                        width="40"
                        radius="38"
                        color="#4fa94d"
                        ariaLabel="watch-loading"
                        wrapperStyle={{}}
                        visible={true}
                      />
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ToastContainer
        position="top-center"
        autoClose={3001}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}
