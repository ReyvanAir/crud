import React from "react";
import { TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();
  return (
    <main className="h-screen w-screen flex justify-center items-center">
      <div className="bg-primary border-2 border-secondary p-16">
        <div className="text-3xl text-center">Simulation Data</div>

        <form className="mt-16 flex flex-col gap-4">
          <Button
            variant="contained"
            color="primary"
            size="small"
            className="w-full"
            type="submit"
            onClick={() => navigate("/login")}
            //disabled={isFormSubmitting}
          >
            Admin
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="small"
            className="w-full"
            type="submit"
            onClick={() => navigate("/loginUser")}
            //disabled={isFormSubmitting}
          >
            User
          </Button>
          {/* <div className="text-center text-red-500">{errorMessage}</div> */}

          <div>
            <Button
              variant="text"
              size="small"
              className="w-full"
              //onClick={() => navigate("/sign-up")}
              // disabled={isFormSubmitting}
            >
              Don't have account? Sign up
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
}
