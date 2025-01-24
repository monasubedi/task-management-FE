import { useEffect } from "react";
import SubmitButton from "../../components/button/button";
import Input from "../../components/input/input";
import useUser from "../../hooks/useUser";
import "./settings.css";

const Settings = () => {
  const {
    username,
    email,
    getUserQuery,
    setUsername,
    setEmail,
    handleUserUpdate,
  } = useUser();

  useEffect(() => {
    if (getUserQuery.data) {
      const { data } = getUserQuery;
      setEmail(data?.email);
      setUsername(data?.username);
    }
  }, [getUserQuery.data]);

  return (
    <div className="settingsContainer">
      <h1>Edit your profile</h1>
      <form
        className="settingsForm"
        onSubmit={(e) => handleUserUpdate(e, getUserQuery?.data.userId)}
      >
        <Input
          label="Username"
          required={true}
          value={username}
          type="text"
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          label="Email"
          required={true}
          value={email}
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <SubmitButton title="UPDATE" />
      </form>
    </div>
  );
};

export default Settings;
