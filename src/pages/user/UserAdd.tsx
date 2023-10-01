import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Button from "@mui/material/Button";
import CloseIcon from '@mui/icons-material/Close';
import Collapse from '@mui/material/Collapse';
import Divider from "@mui/material/Divider";
import HomeIcon from "@mui/icons-material/Home";
import IconButton from '@mui/material/IconButton';
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { createUser } from "../../services/UserService";
import { User } from "../../models/User";

export default function UserAdd() {
  let navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<User>({
    id: "",
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
      await createUser(user);
      navigate("/");
    } catch (error: any) {
      console.error(error);
      setOpen(true);
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/">
          <HomeIcon />
        </Link>
        <Link underline="hover" color="inherit" href="/">
          Users
        </Link>
        <Typography color="text.primary">Add</Typography>
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
        />
        <TextField
          id="email"
          label="Email"
          variant="filled"
          margin="normal"
          fullWidth
          required
          onChange={handleChange}
        />
        <TextField
          id="phoneNumber"
          label="Phone Number"
          variant="filled"
          margin="normal"
          fullWidth
          required
          onChange={handleChange}
        />
        <TextField
          id="skillsets"
          label="Skills"
          variant="filled"
          margin="normal"
          fullWidth
          required
          onChange={handleChange}
        />
        <TextField
          id="hobby"
          label="Hobby"
          variant="filled"
          margin="normal"
          fullWidth
          required
          onChange={handleChange}
        />
        <Button
          variant="contained"
          sx={{ mt: 2, alignSelf: "flex-end" }}
          type="submit"
          disabled={loading}
        >
          {loading ? "Loading..." : "Submit"}
        </Button>
      </Box>
    </>
  );
}
