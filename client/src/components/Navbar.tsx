import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useAuthStore } from "../store/authStore";

interface NavbarProps {
  onAdd: () => void;
}

export default function Navbar({ onAdd }: NavbarProps) {
  const { user, logout } = useAuthStore();

  return (
    <AppBar position="static" color="primary">
      <Toolbar className="flex justify-between">
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          🎬 Favorite Movies & Shows
        </Typography>
        <Box>
          <Button color="inherit" onClick={onAdd}>
            + Add Entry
          </Button>
          <Button color="inherit" onClick={logout}>
            Logout ({user?.name})
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
