import SubmitButton from "../../components/button/button";
import Input from "../../components/input/input";
import useAuth from "../../hooks/useAuth";
import "./auth.css";

const Login = () => {
  const {
    handleSignInUser,
    handleNavigation,
    signInMutation,
    email,
    password,
    handleEmailChange,
    handlePasswordChange,
  } = useAuth();
  return (
    <div className="authContainer">
      <div className="authWrapper">
        <h1>Sign In</h1>
        <form onSubmit={handleSignInUser} className="formContainer">
          <Input
            label="Email"
            type="email"
            value={email}
            required={true}
            onChange={(e) => handleEmailChange(e)}
          />
          <Input
            label="Password"
            type="password"
            value={password}
            required={true}
            onChange={(e) => handlePasswordChange(e)}
          />
          <SubmitButton title="LOGIN" disabled={signInMutation.isPending} />
        </form>
        <div
          className="smallText"
          onClick={() => handleNavigation("/register")}
        >
          <small>
            Don't have an account?{" "}
            <span className="navigateAccount">Register here.</span>
          </small>
        </div>
      </div>
    </div>
  );
};

export default Login;
