import * as React from "react";
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
import { del_user } from "../../Graphql/Mutation";
import axios from "axios";

export default function BasicTable() {
  const [userData, setuserData] = useState([]);
  const [deleteUser, { error }] = useMutation(del_user);
  const [recall, setRecall] = useState(true);
  async function deleUser(id: string) {
    await deleteUser({
      variables: {
        _id: id,
      },
    }).then(() => {
      setRecall(!recall);
    });
  }

  useEffect(() => {
  // axios({
  //     url: "http://localhost:8000/graphql",
  //     method: "POST",
  //     data: {
  //       query: `
  //       query{
  //         AllUserDetails{
  //             _id,
  //             email,
  //             name
  //         }
  //       }
  //         `,
  //     },
      
  //   })
  axios.post("http://localhost:8000/graphql",{
    query:` 
        query{
         AllUserDetails{
             _id,
             email,
             name
          }
        }
      
        `
      }
        ,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
  ).then((result: any) => {
      setuserData(result.data.data.AllUserDetails);
    });
  }, [recall]);
  

  const navigate = useNavigate();

  function NavigatePage(id: string): void {
    navigate(`/editprofile/${id}`);
  }
  return (
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
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
