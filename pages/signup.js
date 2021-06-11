import Link from "next/link";
import { useEffect, useState } from "react";
import baseurl from "../Helpers/baseurl";
import { useRouter } from "next/router";
const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const usersignup = async (e) => {
    e.preventDefault();
    const res = await fetch(`${baseurl}/api/signup`, {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });
    const res2 = await res.json();
    if (res2.error) {
      M.toast({ html: res2.error, classes: "red" });
    } else {
      M.toast({ html: res2.message, classes: "green" });
      router.push("/login");
    }
  };
  return (
    <div className="container card authcard center-align">
      <h3>Signup</h3>
      <form onSubmit={(e) => usersignup(e)}>
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
