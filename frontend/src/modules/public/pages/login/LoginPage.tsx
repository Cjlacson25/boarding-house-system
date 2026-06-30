import { useState, type SyntheticEvent } from "react";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Login submitted", { username, password });
    // TODO: replace with real authentication logic
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "background.default",
        p: 2,
      }}
    >
      <Paper
        elevation={4}
        sx={{
          width: "100%",
          maxWidth: 420,
          p: 4,
          borderRadius: 3,
        }}
      >
        <Typography variant="h5" component="h1" gutterBottom>
          Login
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <TextField
            label="Username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            fullWidth
            margin="normal"
            autoComplete="username"
            required
            variant="outlined"
            sx={{
              "& .MuiOutlinedInput-root": {
                backgroundColor: "#ffffff",
                color: "#0f172a",
                "& fieldset": {
                  borderColor: "#cbd5e1",
                },
                "&:hover fieldset": {
                  borderColor: "#94a3b8",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#2563eb",
                  borderWidth: "1.5px",
                },
              },
              "& .MuiInputLabel-root": {
                color: "#475569",
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#2563eb",
              },
              "& .MuiInputBase-input": {
                color: "#0f172a",
              },
            }}
          />

          <TextField
            label="Password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            fullWidth
            margin="normal"
            autoComplete="current-password"
            required
            variant="outlined"
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                      onClick={() => setShowPassword((prev) => !prev)}
                      onMouseDown={(event) => event.preventDefault()}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                backgroundColor: "#ffffff",
                color: "#0f172a",
                "& fieldset": {
                  borderColor: "#cbd5e1",
                },
                "&:hover fieldset": {
                  borderColor: "#94a3b8",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#2563eb",
                  borderWidth: "1.5px",
                },
              },
              "& .MuiInputLabel-root": {
                color: "#475569",
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#2563eb",
              },
              "& .MuiInputBase-input": {
                color: "#0f172a",
              },
            }}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              mt: 3,
              bgcolor: "#1d4ed8",
              color: "#ffffff",
              fontWeight: 600,
              textTransform: "none",
              "&:hover": {
                bgcolor: "#ffffff",
                color: "#1d4ed8",
                border: "1px solid #1d4ed8",
              },
            }}
          >
            Sign In
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default LoginPage;
