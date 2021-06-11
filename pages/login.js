import Link from "next/link";
import { useEffect, useState } from "react";
import baseurl from "../Helpers/baseurl";
import cookie from "js-cookie";
import { useRouter } from "next/router";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const userlogin = async (e) => {
    e.preventDefault();
    const res = await fetch(`${baseurl}/api/login`, {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const res2 = await res.json();
    if (res2.error) {
      M.toast({ html: res2.error, classes: "red" });
    } else {
      console.log("yash");
      cookie.set("token", res2.token);

      router.push("/account");
    }
  };
  return (
    <div className="container card authcard center-align">
      <h3>Login</h3>
      <form onSubmit={(e) => userlogin(e)}>
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
