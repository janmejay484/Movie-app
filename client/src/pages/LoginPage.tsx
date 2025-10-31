import { useForm } from "react-hook-form";
import { useAuthStore } from "../store/authStore";
import api from "../api/api";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  CircularProgress,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function LoginPage() {
  const navigate = useNavigate();
  const login = useAuthStore((s) => s.login);
  const { register, handleSubmit } = useForm();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: any) => {
    try {
      setLoading(true);
      const res = await api.post("/auth/login", data);
      login(res.data.token, res.data.user);
      navigate("/");
    } catch {
      alert("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #A78BFA 0%, #E0E7FF 100%)",
        p: 2,
      }}
    >
      <Container maxWidth="xs">
        <Paper
          elevation={6}
          sx={{
            p: { xs: 3, sm: 5 },
            borderRadius: 3,
            textAlign: "center",
            position: "relative",
            backdropFilter: "blur(10px)",
            backgroundColor: "rgba(255,255,255,0.9)",
          }}
        >
          {loading && (
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "rgba(255,255,255,0.6)",
                borderRadius: 3,
                zIndex: 2,
              }}
            >
              <CircularProgress color="primary" />
            </Box>
          )}

          <Typography
            variant={isMobile ? "h5" : "h4"}
            fontWeight="bold"
            color="primary"
            mb={3}
          >
            🎬 Welcome Back
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={3}>
            Sign in to continue to your favorite movies & shows tracker
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              fullWidth
              label="Email"
              margin="normal"
              variant="outlined"
              {...register("email")}
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              margin="normal"
              variant="outlined"
              {...register("password")}
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              type="submit"
              disabled={loading}
              sx={{
                mt: 2,
                py: 1.2,
                borderRadius: 2,
                fontWeight: 600,
                fontSize: { xs: "0.9rem", sm: "1rem" },
              }}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>

          <Box mt={3}>
            <Typography variant="body2" color="text.secondary">
              Don’t have an account?{" "}
              <Link
                to="/register"
                style={{
                  color: theme.palette.primary.main,
                  textDecoration: "none",
                  fontWeight: 600,
                }}
              >
                Register
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
