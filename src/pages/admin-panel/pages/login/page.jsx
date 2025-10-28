import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginLeftPanel } from "./components/LoginLeftPanel";
import { LoginRightPanel } from "./components/LoginRightPanel";
import { LoginForm } from "./components/LoginForm";

export default function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginSuccess = () => {
    navigate("/admin");
  };

  return (
    <div className="min-h-screen flex">
      <LoginLeftPanel />
      <LoginRightPanel>
        <LoginForm
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
          onLoginSuccess={handleLoginSuccess}
        />
      </LoginRightPanel>
    </div>
  );
}
