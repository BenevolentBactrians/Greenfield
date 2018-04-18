import React from "react";

const Login = props => (
  <div className="container">
    <form action="/login" method="post">
      <input
        className="form"
        type="email"
        name="email"
        id="email"
        placeholder="email"
      />
      <input
        type="password"
        name="password"
        id="password"
        placeholder="password"
      />
      <input type="submit" value="Login" />
    </form>
    <a href="/signup">Create account</a>
    <button>Login with Google</button>
  </div>
);

export default Login;