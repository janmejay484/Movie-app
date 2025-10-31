import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useAuthStore } from "../store/authStore";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
interface NavbarProps {
  onAdd: () => void;
}

export default function Navbar({ onAdd }: NavbarProps) {
  const { user, logout } = useAuthStore();
  const theme = useTheme();
 const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <AppBar position="static" color="primary">
             <Toolbar
         sx={{
           display: "flex",
           justifyContent: "space-between",
           flexWrap: "wrap",
           gap: 1,
           p: isMobile ? 1 : 2,
         }}
       >
         <Typography
           variant={isMobile ? "subtitle1" : "h6"}
           sx={{ fontWeight: 600, textAlign: isMobile ? "center" : "left", width: isMobile ? "100%" : "auto" }}
         >
           🎬 Favorite Movies & Shows
         </Typography>
 
         <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 1 }}>
           <Button color="inherit" onClick={onAdd} size={isMobile ? "small" : "medium"}>
               Add Entry
           </Button>
           <Button color="inherit" onClick={logout} size={isMobile ? "small" : "medium"}>
             Logout ({user?.name})
           </Button>
         </Box>
       </Toolbar>
    </AppBar>
  );
}
