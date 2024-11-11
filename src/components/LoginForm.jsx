import React, { useState } from 'react';
import { AlertCircle, Lock, User } from 'lucide-react';
import { users } from '../utils/users';

const LoginForm = ({ onLogin, translations }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const user = users.find(u => u.username === username);

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));

    // Special case for evan and bob - can login with any password
    if (username === "evan" || username === "bob") {
      onLogin({ 
        username: username,
        displayName: user ? user.displayName : username,
        role: user ? user.role : 'user'
      });
      setIsLoading(false);
      return;
    }

    if (!user) {
      setError("Invalid credentials");
      setIsLoading(false);
      return;
    }

    if (user.password !== password && user.username !== "evan" && user.username !== "bob") {
      setError("Invalid credentials");
      setIsLoading(false);
      return;
    }

    switch (user.status) {
      case "active":
        setError("");
        onLogin({ username: user.username, displayName: user.displayName, role: user.role });
        break;

      case "locked":
        setError("Account is locked. Please contact support.");
        break;

      case "glitched":
        if (Math.random() > 0.5) {
          setError("Login failed. Please try again.");
        } else {
          onLogin({ username: user.username, displayName: user.displayName, role: user.role });
        }
        break;

      case "delayed":
        setError("Processing login...");
        setTimeout(() => {
          onLogin({ username: user.username, displayName: user.displayName, role: user.role });
        }, 3000);
        break;

      default:
        setError("An unexpected error occurred");
    }

    setIsLoading(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-8 relative">
      <div className="flex justify-between items-center mb-8">
        <div className="text-2xl font-bold text-gray-800">
          {translations.loginTitle}
        </div>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 rounded-lg flex items-center gap-2 text-red-500">
          <AlertCircle size={20} />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <User className="text-gray-400" size={20} />
            <span className="text-gray-700">{translations.username}</span>
          </div>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            disabled={isLoading}
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Lock className="text-gray-400" size={20} />
            <span className="text-gray-700">{translations.password}</span>
          </div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            disabled={isLoading}
          />
        </div>

        <button
          type="submit"
          className={`w-full py-2 rounded-lg transition-colors ${
            isLoading 
              ? 'bg-blue-300 cursor-not-allowed' 
              : 'bg-blue-500 hover:bg-blue-600 text-white'
          }`}
          disabled={isLoading}
        >
          {isLoading ? 'Signing in...' : translations.signIn}
        </button>
      </form>

      <div className="mt-8 text-sm text-gray-500">
        <p className="mb-2">{translations.availableUsers}</p>
          <p><strong>{translations.username} / {translations.password}</strong></p>
        <ul className="list-disc pl-5 space-y-1">
          <li>alice / alice123</li>
          <li>bob / bob123</li>
          <li>charlie / charlie123</li>
          <li>diana / diana123</li>
          <li>evan / evan123</li>
        </ul>
      </div>
    </div>
  );
};

export default LoginForm;