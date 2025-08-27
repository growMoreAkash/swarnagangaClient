import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL ?? "https://swarnaganga-back.vercel.app/api",
});

const TTL_DAYS = 5;

const setAuthCookies = ({ token, userId }) => {
  Cookies.set("token", String(token), { expires: TTL_DAYS });
  Cookies.set("userId", String(userId), { expires: TTL_DAYS });
};

const clearAuthCookies = () => { Cookies.remove("token"); Cookies.remove("userId"); };
const getTokenCookie = () => Cookies.get("token");

/* ========================== FORM COMPONENTS ================================== */
// These components have been moved outside the main Login function.
// This ensures they are not recreated on every render, which fixes the focus issue.

const LoginForm = ({ liId, setLiId, liPwd, setLiPwd, liMsg, handleLogin, setView }) => (
  <form onSubmit={handleLogin} className="space-y-4">
    <h2 className="text-3xl font-bold text-center mb-6">Login</h2>
    <div>
      <label className="block text-sm font-medium mb-1">Phone / Email</label>
      <input className="w-full border rounded px-3 py-2"
        value={liId} onChange={(e) => setLiId(e.target.value)} required />
    </div>
    <div>
      <label className="block text-sm font-medium mb-1">Password</label>
      <input type="password" className="w-full border rounded px-3 py-2"
        value={liPwd} onChange={(e) => setLiPwd(e.target.value)} required />
    </div>
    <button className="w-full bg-[#bfae7a] text-white py-2 rounded">Login</button>
    {liMsg && <p className="text-center text-sm mt-2">{liMsg}</p>}
    <p className="text-center text-sm mt-4">
      <button type="button" onClick={() => setView("forgotPassword")} className="text-[#bb2929]">Forgot Password?</button>
    </p>
  </form>
);

const SignupForm1 = ({ suName, setSuName, suPhone, setSuPhone, suEmail, setSuEmail, suPwd, setSuPwd, suPwd2, setSuPwd2, suMsg, handleSignup1 }) => (
  <form onSubmit={handleSignup1} className="space-y-4">
    <h2 className="text-3xl font-bold text-center mb-6">Sign Up</h2>
    <input placeholder="Full name" className="w-full border rounded px-3 py-2"
      value={suName} onChange={(e) => setSuName(e.target.value)} required />
    <input placeholder="Phone" className="w-full border rounded px-3 py-2"
      value={suPhone} onChange={(e) => setSuPhone(e.target.value)} required />
    <input type="email" placeholder="Email"
      className="w-full border rounded px-3 py-2"
      value={suEmail} onChange={(e) => setSuEmail(e.target.value)} required />
    <input type="password" placeholder="Password"
      className="w-full border rounded px-3 py-2"
      value={suPwd} onChange={(e) => setSuPwd(e.target.value)} required />
    <input type="password" placeholder="Confirm password"
      className="w-full border rounded px-3 py-2"
      value={suPwd2} onChange={(e) => setSuPwd2(e.target.value)} required />
    <button className="w-full bg-[#bfae7a] text-white py-2 rounded">Sign Up</button>
    {suMsg && <p className="text-center text-sm mt-2">{suMsg}</p>}
  </form>
);

const SignupForm2 = ({ suEmailOtp, setSuEmailOtp, suPhoneOtp, setSuPhoneOtp, suMsg, handleSignup2, setSUstep, setSuMsg }) => (
  <form onSubmit={handleSignup2} className="space-y-4">
    <h2 className="text-3xl font-bold text-center mb-6">Verify OTP</h2>
    <input placeholder="Email OTP" className="w-full border rounded px-3 py-2"
      value={suEmailOtp} onChange={(e) => setSuEmailOtp(e.target.value)} required />
    <input placeholder="Phone OTP" className="w-full border rounded px-3 py-2"
      value={suPhoneOtp} onChange={(e) => setSuPhoneOtp(e.target.value)} required />
    <button className="w-full bg-yellow-600 text-white py-2 rounded">Verify</button>
    {suMsg && <p className="text-center text-sm mt-2">{suMsg}</p>}
    <p className="text-center text-sm mt-4">
      <button type="button" onClick={() => { setSUstep(1); setSuMsg(""); }} className="text-[#bb2929]">Back</button>
    </p>
  </form>
);

const FpForm1 = ({ fpId, setFpId, fpMsg, handleFPsend, setFPstep }) => (
  <form onSubmit={handleFPsend} className="space-y-4">
    <h2 className="text-3xl font-bold text-center mb-6">Forgot Password</h2>
    <input placeholder="Phone / Email" className="w-full border rounded px-3 py-2"
      value={fpId} onChange={(e) => setFpId(e.target.value)} required />
    <button className="w-full bg-[#bfae7a] text-white py-2 rounded">Send OTP</button>
    {fpMsg && <p className="text-center text-sm mt-2">{fpMsg}</p>}
  </form>
);

const FpForm2 = ({ fpOtp, setFpOtp, fpNew, setFpNew, fpMsg, handleFPreset, setView, setFPstep }) => (
  <form onSubmit={handleFPreset} className="space-y-4">
    <h2 className="text-3xl font-bold text-center mb-6">Reset Password</h2>
    <input placeholder="OTP" className="w-full border rounded px-3 py-2"
      value={fpOtp} onChange={(e) => setFpOtp(e.target.value)} required />
    <input type="password" placeholder="New password"
      className="w-full border rounded px-3 py-2"
      value={fpNew} onChange={(e) => setFpNew(e.target.value)} required />
    <button className="w-full bg-[#bfae7a] text-white py-2 rounded">Reset</button>
    {fpMsg && <p className="text-center text-sm mt-2">{fpMsg}</p>}
    <p className="text-center text-sm mt-4">
      <button type="button" onClick={() => { setView("login"); setFPstep(1); }} className="text-[#bb2929]">Back to Login</button>
    </p>
  </form>
);


/* ========================== MAIN COMPONENT ================================== */
const Login = () => {
  const navigate = useNavigate();
  /* navigation */
  const [view, setView] = useState("login"); // login | signup | forgotPassword
  const [signupStep, setSUstep] = useState(1);
  const [fpStep, setFPstep] = useState(1);

  /* login form */
  const [liId, setLiId] = useState("");
  const [liPwd, setLiPwd] = useState("");
  const [liMsg, setLiMsg] = useState("");

  /* signup form */
  const [suName, setSuName] = useState("");
  const [suPhone, setSuPhone] = useState("");
  const [suEmail, setSuEmail] = useState("");
  const [suPwd, setSuPwd] = useState("");
  const [suPwd2, setSuPwd2] = useState("");
  const [suMsg, setSuMsg] = useState("");
  const [suEmailOtp, setSuEmailOtp] = useState("");
  const [suPhoneOtp, setSuPhoneOtp] = useState("");
  const [suUserId, setSuUserId] = useState(null);

  /* forgot-pwd form */
  const [fpId, setFpId] = useState("");
  const [fpOtp, setFpOtp] = useState("");
  const [fpNew, setFpNew] = useState("");
  const [fpMsg, setFpMsg] = useState("");

  useEffect(() => {
    (async () => {
      const token = getTokenCookie();
      if (!token) return;
      try {
        await api.post("/loginUser", { token });
      } catch {
        clearAuthCookies();
      }
    })();
  }, []);

  const notifyAndGoHome = (token, userId) => {
    setAuthCookies({ token, userId });
    window.dispatchEvent(new Event("authchange"));
    navigate("/");
  };

  /* -------------------- login submit ---------------------------------- */
  const handleLogin = async (e) => {
    e.preventDefault();
    setLiMsg("");
    if (!liId || !liPwd) return setLiMsg("Please enter both fields.");
    try {
      setLiMsg("Logging in…");
      const { data } = await api.post("/loginUser", { phoneEmail: liId, password: liPwd });
      notifyAndGoHome(data.token, data.user.id);
    } catch (err) {
      setLiMsg(err.response?.data ?? "Invalid credentials.");
    }
  };

  /* -------------------- signup step-1 --------------------------------- */
  const handleSignup1 = async (e) => {
    e.preventDefault();
    setSuMsg("");
    if (!suName || !suPhone || !suEmail || !suPwd || !suPwd2)
      return setSuMsg("Please fill in all fields.");
    if (suPwd !== suPwd2) return setSuMsg("Passwords do not match.");
    try {
      setSuMsg("Sending OTPs…");
      const { data } = await api.post("/signup",
        { fullname: suName, phone: suPhone, email: suEmail, password: suPwd });
      setSuUserId(data.userId);

 


      setSuMsg("OTPs sent!");
      setSUstep(2);

    } catch (err) {
      setSuMsg(err.response?.data ?? "Registration failed.");
    }
  };

  /* -------------------- signup step-2 (OTP) --------------------------- */
  const handleSignup2 = async (e) => {
    e.preventDefault();
    setSuMsg("");
    if (!suEmailOtp || !suPhoneOtp) return setSuMsg("Enter both OTPs.");
    try {
      const { data } = await api.post(`/verifyUser/${suUserId}`, {
        emailOtp: suEmailOtp, phoneOtp: suPhoneOtp,
      });
      notifyAndGoHome(data.token, data.userId);
    } catch (err) {
      setSuMsg(err.response?.data ?? "OTP verification failed.");
    }
  };

  /* -------------------- forgot-pwd step-1 (send) ---------------------- */
  const handleFPsend = async (e) => {
    e.preventDefault();
    setFpMsg("");
    if (!fpId) return setFpMsg("Enter your phone or email.");
    try {
      await api.post("/sendOtp", { phoneEmail: fpId });
      setFpMsg("OTP sent!");

      setFPstep(2);
    } catch (err) {
      setFpMsg(err.response?.data ?? "Failed to send OTP.");
    }
  };

  /* -------------------- forgot-pwd step-2 (reset) --------------------- */
  const handleFPreset = async (e) => {
    e.preventDefault();
    setFpMsg("");
    if (!fpOtp || !fpNew) return setFpMsg("Enter OTP and new password.");
    try {
      const { data } = await api.post("/forgetPassword",
        { phoneEmail: fpId, otp: fpOtp, password: fpNew });
      notifyAndGoHome(data.token, data.userId);
    } catch (err) {
      setFpMsg(err.response?.data ?? "Reset failed.");
    }
  };

  /* ========================== RENDER ================================== */
  return (
    <div className="min-h-screen pt-40 flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        {/* tab buttons */}
        <div className="flex justify-around mb-6 border-b pb-4">
          {["login", "signup"].map((tab) => (
            <button key={tab}
              className={`px-4 py-2 text-lg font-semibold rounded-md
                              ${view === tab ? "bg-[#bfae7a] text-white" : "hover:bg-gray-100"}`}
              onClick={() => { setView(tab); setLiMsg(""); setSuMsg(""); }}>
              {tab === "login" ? "Login" : "Sign Up"}
            </button>
          ))}
        </div>

        {/* dynamic form */}
        {view === "login" && <LoginForm liId={liId} setLiId={setLiId} liPwd={liPwd} setLiPwd={setLiPwd} liMsg={liMsg} handleLogin={handleLogin} setView={setView} />}
        {view === "signup" && signupStep === 1 && <SignupForm1 suName={suName} setSuName={setSuName} suPhone={suPhone} setSuPhone={setSuPhone} suEmail={suEmail} setSuEmail={setSuEmail} suPwd={suPwd} setSuPwd={setSuPwd} suPwd2={suPwd2} setSuPwd2={setSuPwd2} suMsg={suMsg} handleSignup1={handleSignup1} />}
        {view === "signup" && signupStep === 2 && <SignupForm2 suEmailOtp={suEmailOtp} setSuEmailOtp={setSuEmailOtp} suPhoneOtp={suPhoneOtp} setSuPhoneOtp={setSuPhoneOtp} suMsg={suMsg} handleSignup2={handleSignup2} setSUstep={setSUstep} setSuMsg={setSuMsg} />}
        {view === "forgotPassword" && fpStep === 1 && <FpForm1 fpId={fpId} setFpId={setFpId} fpMsg={fpMsg} handleFPsend={handleFPsend} setFPstep={setFPstep} />}
        {view === "forgotPassword" && fpStep === 2 && <FpForm2 fpOtp={fpOtp} setFpOtp={setFpOtp} fpNew={fpNew} setFpNew={setFpNew} fpMsg={fpMsg} handleFPreset={handleFPreset} setView={setView} setFPstep={setFPstep} />}
      </div>
    </div>
  );
};

export default Login;