import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import Collapse from "@mui/material/Collapse";
import Divider from "@mui/material/Divider";
import HomeIcon from "@mui/icons-material/Home";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { updateUser, getUser } from "../../services/UserService";
import { User } from "../../models/User";

export default function UserEdit() {
  const { userId } = useParams<{ userId: string }>();
  const id = typeof userId === 'string' ? userId : '';
  let navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<User>({
    id: id,
    username: "",
    email: "",
    phoneNumber: "",
    skillsets: "",
    hobby: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [event.target.id]: event.target.value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    try {
      await updateUser(user);
      navigate("/");
    } catch (error: any) {
      console.error(error);
      setOpen(true);
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const fetchedUser = await getUser(user.id);
        setUser(fetchedUser);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUsers();
  }, []);

  return (
    <>
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/">
          <HomeIcon />
        </Link>
        <Link underline="hover" color="inherit" href="/">
          Users
        </Link>
        <Typography color="text.primary">Edit</Typography>
      </Breadcrumbs>
      <Divider />
      <Collapse in={open}>
        <Alert
          severity="error"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mt: 3 }}
        >
          {errorMessage}
        </Alert>
      </Collapse>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          my: 2,
          display: "flex",
          flexDirection: "column",
        }}
        autoComplete="off"
      >
        <TextField
          id="username"
          label="Username"
          variant="filled"
          margin="normal"
          fullWidth
          required
          onChange={handleChange}
          value={user.username}
        />
        <TextField
          id="email"
          label="Email"
          variant="filled"
          margin="normal"
          fullWidth
          required
          onChange={handleChange}
          value={user.email}
        />
        <TextField
          id="phoneNumber"
          label="Phone Number"
          variant="filled"
          margin="normal"
          fullWidth
          required
          onChange={handleChange}
          value={user.phoneNumber}
        />
        <TextField
          id="skillsets"
          label="Skills"
          variant="filled"
          margin="normal"
          fullWidth
          required
          onChange={handleChange}
          value={user.skillsets}
        />
        <TextField
          id="hobby"
          label="Hobby"
          variant="filled"
          margin="normal"
          fullWidth
          required
          onChange={handleChange}
          value={user.hobby}
        />
        <Button
          variant="contained"
          sx={{ mt: 2, alignSelf: "flex-end" }}
          type="submit"
          disabled={loading}
        >
          {loading ? "Loading..." : "Save"}
        </Button>
      </Box>
    </>
  );
}
