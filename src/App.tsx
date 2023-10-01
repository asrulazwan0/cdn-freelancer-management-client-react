import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import TopBar from "./components/TopBar";
import UserList from "./pages/user/UserList";
import UserAdd from "./pages/user/UserAdd";
import NoMatch from "./components/NoMatch";

let router = createBrowserRouter([
  {
    path: "/",
    element: <UserList />,
    errorElement: <NoMatch />,
  },
  {
    path: "/users/add",
    element: <UserAdd />,
  },
]);

export default function App() {
  return (
    <React.StrictMode>
      <TopBar />
      <Container maxWidth="md">
        <Box sx={{ my: 6 }}>
          <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />
        </Box>
      </Container>
    </React.StrictMode>
  );
}
