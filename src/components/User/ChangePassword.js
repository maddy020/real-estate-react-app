import { useState } from "react";
import FormSubmitButton from "../../common/FormSubmitButton";
import { hostUrl } from "../../common/urls";

export default function ChangePassword() {
  const userId = localStorage.getItem("userId");
  const [password, setPassword] = useState("");

  const updatePassword = () => {
    fetch(`${hostUrl}/user/password`, {
      method: "PATCH",
      body: JSON.stringify({
        user_id: userId,
        password: password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => {
        if (!resp.ok) {
          alert("Password is not changed!");
        }
        resp.json();
      })
      .then((json) => {
        console.log(json);
        setPassword("");
      });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    updatePassword();
  };

  return (
    <div className="center">
      <h2>Change your password</h2>
      <form onSubmit={handleOnSubmit}>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <FormSubmitButton />
      </form>
    </div>
  );
}
