import Link from "next/link";
import { useEffect, useState } from "react";
const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="container card authcard center-align">
      <h3>Signup</h3>
      <form>
        <input
          type="text"
          placeholder="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
          Signup<i className="material-icons right">forward</i>
        </button>

        <Link href="/login">
          <a>
            <h6>Already have a account?</h6>
          </a>
        </Link>
      </form>
    </div>
  );
};

export default Signup;
