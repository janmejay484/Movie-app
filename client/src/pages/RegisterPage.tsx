import { useForm } from "react-hook-form";
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

export default function RegisterPage() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: any) => {
    try {
      setLoading(true);
      await api.post("/auth/register", data);
      alert("Registration successful!");
      navigate("/login");
    } catch {
      alert("Registration failed");
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
            🆕 Create Account
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={3}>
            Join us to manage your favorite movies & shows collection!
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              fullWidth
              label="Full Name"
              margin="normal"
              variant="outlined"
              {...register("name")}
            />
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
              {loading ? "Registering..." : "Register"}
            </Button>
          </form>

          <Box mt={3}>
            <Typography variant="body2" color="text.secondary">
              Already have an account?{" "}
              <Link
                to="/login"
                style={{
                  color: theme.palette.primary.main,
                  textDecoration: "none",
                  fontWeight: 600,
                }}
              >
                Login
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
