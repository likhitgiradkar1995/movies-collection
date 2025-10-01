// components/ThemeToggleButton.jsx
import { IconButton, Tooltip } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useThemeContext } from "../context/ThemeContext";

export default function ThemeToggleButton() {
  const { mode, toggleTheme } = useThemeContext();

  return (
    <Tooltip title="Toggle light/dark theme">
      <IconButton onClick={toggleTheme} color="inherit">
        {mode === "light" ? <Brightness4Icon /> : <Brightness7Icon />}
      </IconButton>
    </Tooltip>
  );
}
