import SubmitButton from "../../components/button/button";
import Input from "../../components/input/input";
import useAuth from "../../hooks/useAuth";
import "./auth.css";

const Register = () => {
  const {
    signUpMutation,
    username,
    email,
    password,
    handleCreateUser,
    handleNavigation,
    handleUsernameChange,
    handleEmailChange,
    handlePasswordChange,
  } = useAuth();

  return (
    <div className="authContainer">
      <div className="authWrapper">
        <h1>Sign Up</h1>
        <form onSubmit={handleCreateUser} className="formContainer">
          <Input
            label="Username"
            type="text"
            value={username}
            required={true}
            onChange={handleUsernameChange}
          />
          <Input
            label="Email"
            type="email"
            value={email}
            required={true}
            onChange={handleEmailChange}
          />
          <Input
            label="Password"
            type="password"
            required={true}
            value={password}
            onChange={handlePasswordChange}
          />
          <SubmitButton title="REGISTER" disabled={signUpMutation.isPending} />
        </form>
        <div className="smallText" onClick={() => handleNavigation("/login")}>
          <small>
            Already have an account?{" "}
            <span className="navigateAccount">Login here.</span>
          </small>
        </div>
      </div>
    </div>
  );
};

export default Register;
