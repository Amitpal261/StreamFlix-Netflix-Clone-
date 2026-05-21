import { useState } from "react";
import { updateProfile, updateEmail, updatePassword } from "firebase/auth";
import { auth } from "../../utils/firebase";

export default function Update() {
  const user = auth.currentUser;

  const [username, setUsername] = useState(user?.displayName || "");
  const [email, setEmail] = useState(user?.email || "");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    if (!user) return;

    setLoading(true);
    try {
      // Update Username
      if (username) {
        await updateProfile(user, {
          displayName: username,
        });
      }

      // Update Email
      if (email && email !== user.email) {
        await updateEmail(user, email);
      }

      // Update Password
      if (password.length >= 6) {
        await updatePassword(user, password);
      }

      alert("Profile updated successfully 🚀");
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center p-4">
      <div className="w-full max-w-md p-6 rounded-2xl backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl">
        <h2 className="text-white text-2xl font-semibold mb-6">
          Update Profile
        </h2>

        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="p-3 rounded-lg bg-white/10 text-white outline-none border border-white/20"
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 rounded-lg bg-white/10 text-white outline-none border border-white/20"
          />

          <input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-3 rounded-lg bg-white/10 text-white outline-none border border-white/20"
          />

          <button
            onClick={handleUpdate}
            disabled={loading}
            className="bg-red-600 hover:bg-red-700 text-white p-3 rounded-lg transition"
          >
            {loading ? "Updating..." : "Update Profile"}
          </button>
        </div>
      </div>
    </div>
  );
}
