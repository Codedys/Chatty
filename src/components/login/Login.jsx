import { useState } from "react";
import "./login.css";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../lib/firebase";
import upload from "../upload";





const Login = () => {
  const[loading,setLoading] = useState(false);
  const [avatar, setAvatar] = useState({
    file: null,
    url: "",
  });

  const handleAvatar = (e) => {
    if (e.target.files[0]) {
      setAvatar({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  // function  that creates users and stores them in the database
  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading (true)

    const formData = new FormData(e.target);
    const { username, email, password } = Object.fromEntries(formData);

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      const imgUrl = await upload(avatar.file);

      await setDoc(doc(db, "users", res.user.uid), {
        username: username,
        email: email,
        avatar: imgUrl,
        id: res.user.uid,
        blocked: [],
      });

     

      await setDoc(doc(db, "userchats", res.user.uid), {
        chats: [],
      });

      toast.success("Account Created Successfully!");
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }finally{
      setLoading(false);
      window.location.reload();
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true)


    const formData = new FormData(e.target);
    const { email, password } = Object.fromEntries(formData);

    try {
      await signInWithEmailAndPassword (auth,email,password);
      
      
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      
    }finally{
      setLoading(false);
      window.location.reload();

    }
  };

  return (
    <div className="login">
      <div className="item">
        <h2>Welcome JJ</h2>
        <form onSubmit={handleLogin}>
          <input type="text" name="email" placeholder="Email" />
          <input type="password" name="password" placeholder="password" />
          <button disabled={loading}>{ loading ? "Loading.." : "Sign in"}</button>
        </form>
      </div>
      <div className="separator"></div>
      <div className="item">
        <h2>Create an Account</h2>
        <form onSubmit={handleRegister}>
          <label htmlFor="file">
            <img src={avatar.url || "./avatar.png"} alt="" />
            upload an image
          </label>
          <input
            type="file"
            id="file"
            style={{ display: "none" }}
            onChange={handleAvatar}
          />
          <input type="text" name="username" placeholder="Username" />
          <input type="text" name="email" placeholder="Email" />
          <input type="password" name="password" placeholder="password" />
          <button disabled={loading}>{ loading ? "Loading..." :"Sign up"}</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
