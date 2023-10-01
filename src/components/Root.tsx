import { Outlet } from "react-router-dom";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import TopBar from "./TopBar";

export default function Root() {
  return (
    <>
      <TopBar />
      <Container maxWidth="md">
        <Box sx={{ my: 6 }}>
          <Outlet />
        </Box>
      </Container>
    </>
  );
}
