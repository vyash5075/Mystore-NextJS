import Link from "next/link";
import { useEffect, useState } from "react";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="container card authcard center-align">
      <h3>Login</h3>
      <form>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="btn waves-effect waves-light" type="submit">
          Login<i className="material-icons right">forward</i>
        </button>

        <Link href="/signup">
          <a>
            <h6>Create account?</h6>
          </a>
        </Link>
      </form>
    </div>
  );
};

export default Login;
