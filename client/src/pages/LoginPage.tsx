import { useForm } from "react-hook-form";
import { useAuthStore } from "../store/authStore";
import api from "../api/api";
import { Container, TextField, Button, Typography, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();
  const login = useAuthStore((s) => s.login);
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data: any) => {
    try {
      const res = await api.post("/auth/login", data);
      login(res.data.token, res.data.user);
      navigate("/");
    } catch {
      alert("Invalid credentials");
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 10 }}>
      <Typography variant="h4" textAlign="center" mb={3}>
        🎬 Login
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField fullWidth label="Email" margin="normal" {...register("email")} />
        <TextField fullWidth label="Password" type="password" margin="normal" {...register("password")} />
        <Button variant="contained" fullWidth type="submit" sx={{ mt: 2 }}>
          Login
        </Button>
      </form>
      <Box textAlign="center" mt={2}>
        <Typography variant="body2">
          Don't have an account? <Link to="/register">Register</Link>
        </Typography>
      </Box>
    </Container>
  );
}
