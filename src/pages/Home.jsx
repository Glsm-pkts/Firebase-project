import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout as firebaseLogout } from "../firebase";
import { logout as logoutHandle } from "../store/auth";
import UpdateProfile from "../components/UpdateProfile";
import { emailVerification } from "../firebase";


export default function Home() {
  const navigate = useNavigate();
  const { user } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await firebaseLogout();
    dispatch(logoutHandle());
    navigate('/login', {
      replace: true
    });
  };
const handleVerified = async () =>{
await emailVerification()
}
  if (user) {
    return (
      <div className="max-w-xl mx-auto py-5">
        <h1 className="flex gap-x-4 items-center">
          {user.photoURL && <img src={user.photoURL} className="w-7 h-7 rounded-full"></img>}
          Oturum Açık ({user.email})
        

        <button onClick={handleLogout} className="h-8 text-white bg-indigo-600 rounded px-4 mt-3 text-sm hover:bg-indigo-900">Çıkış Yap</button>
        {!user.emailVerified && <button onClick={handleVerified } className="h-8 text-white bg-indigo-600 rounded px-4 mt-3 text-sm hover:bg-indigo-900">E posta Onayla</button>}
        </h1>
        <UpdateProfile/>
      </div>
    );
  }

  return (
    <div>
      <Link to={"/register"}>Kayıt ol </Link>
      <Link to={"/login"}>Giriş Yap</Link>
      
    </div>
    
  );
}
