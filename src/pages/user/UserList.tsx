import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";  
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { getUsers } from "../../services/UserService";
import { User } from "../../models/User";

export default function UserList() {
  let navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const fetchedUsers = await getUsers();
        setUsers(fetchedUsers);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUsers();
  }, []);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Users
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/users/add")}
        >
          Add User
        </Button>
      </Box>
      <Divider />
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Username</TableCell>
              <TableCell align="left">Email</TableCell>
              <TableCell align="left">Phone Number</TableCell>
              <TableCell align="right">Skillsets</TableCell>
              <TableCell align="right">Hobby</TableCell>
              <TableCell align="center">Edit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow
                key={user.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="left">{user.username}</TableCell>
                <TableCell align="left">{user.email}</TableCell>
                <TableCell align="left">{user.phoneNumber}</TableCell>
                <TableCell align="right">{user.skillsets}</TableCell>
                <TableCell align="right">{user.hobby}</TableCell>
                <TableCell align="center">
                  <IconButton component={Link} to={`/users/${user.id}`}>
                    <EditIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
