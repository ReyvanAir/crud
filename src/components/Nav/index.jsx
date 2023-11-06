import { Menu } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { ProfilePicturePlaceholder } from "../../assets/images";

export default function Nav() {
  const navigate = useNavigate();
  const location = useLocation();

  const user = JSON.parse(sessionStorage.getItem("user"));
  console.log(user);

  const [isExpand, setIsExpand] = useState(true);

  function handleLogout() {
    sessionStorage.removeItem("user");
    window.location.reload();
  }

  return (
    <nav
      className={`overflow-y-auto bg-secondary flex flex-col ${
        isExpand ? "static" : "absolute rounded"
      }`}
    >
      <Button
        variant="outlined"
        size="small"
        onClick={() => setIsExpand(!isExpand)}
      >
        <Menu />
      </Button>

      {isExpand && (
        <div className="h-full w-[20vw] py-8 px-4 flex flex-col justify-between">
          <div className="flex flex-col items-center">
            <img
              src={ProfilePicturePlaceholder}
              alt="profile"
              className="rounded-full h-32 w-32"
            />
            <div className={{ textAlign: "center" }}>
              <h1
                style={{
                  fontWeight: "normal",
                  fontSize: "1.5rem",
                  gap: "1.5rem",
                }}
              >
                {user.user.displayName}
              </h1>
            </div>
            <div className="font-bold">{user.role}</div>
          </div>

          <div className="flex flex-col gap-4">
            <Button
              variant="contained"
              onClick={() => navigate("/user")}
              disabled={location.pathname.includes("/user")}
              style={{ display: user.role !== "ADMIN" ? "none" : "inline" }}
            >
              User
            </Button>
            <Button
              variant="contained"
              onClick={() => navigate("/leaderboard")}
              disabled={location.pathname.includes("/leaderboard")}
            >
              Leaderboard
            </Button>
            <Button
              variant="contained"
              onClick={() => navigate("/history")}
              disabled={location.pathname.includes("/history")}
            >
              History
            </Button>
          </div>

          <Button variant="contained" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      )}
    </nav>
  );
}
