import { useForm } from "react-hook-form";
import api from "../api/api";
import { Container, TextField, Button, Typography, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data: any) => {
    try {
      await api.post("/auth/register", data);
      alert("Registration successful!");
      navigate("/login");
    } catch {
      alert("Registration failed");
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 10 }}>
      <Typography variant="h4" textAlign="center" mb={3}>
        🆕 Register
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField fullWidth label="Name" margin="normal" {...register("name")} />
        <TextField fullWidth label="Email" margin="normal" {...register("email")} />
        <TextField fullWidth label="Password" type="password" margin="normal" {...register("password")} />
        <Button variant="contained" fullWidth type="submit" sx={{ mt: 2 }}>
          Register
        </Button>
      </form>
      <Box textAlign="center" mt={2}>
        <Typography variant="body2">
          Already have an account? <Link to="/login">Login</Link>
        </Typography>
      </Box>
    </Container>
  );
}
