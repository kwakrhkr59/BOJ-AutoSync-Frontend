import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.svg';

const Login = () => {
  const [baekjoonId, setBaekjoonId] = useState('');
  const [baekjoonPw, setBaekjoonPw] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleBaekjoonLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // API call to your backend for Baekjoon login
      const response = await fetch('/api/auth/baekjoon', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: baekjoonId, password: baekjoonPw }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || '백준 로그인에 실패했습니다');

      // On successful login, navigate to GitHub connect page
      navigate('/connect-github');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGithubConnect = () => {
    // Redirect to GitHub OAuth flow
    window.location.href = '/api/auth/github';
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen
                    bg-gradient-to-br from-blue-400 via-indigo-500 to-purple-600
                    px-4 sm:px-6 lg:px-8">
      <div
        className="w-full max-w-md p-8 space-y-8
                   bg-white/90 backdrop-blur-md rounded-2xl shadow-xl
                   transition-transform transform hover:scale-[1.02]"
      >
        {/* 로고 및 안내문 */}
        <div className="text-center">
          <img src={logo} alt="Logo" className="w-20 h-20 mx-auto animate-bounce-slow" />
          <h1 className="mt-4 text-3xl font-extrabold text-gray-900">백준 코드 싱크</h1>
          <p className="mt-2 text-sm text-gray-600">
            백준 코드를 깃허브에 자동으로 커밋하세요
          </p>
        </div>

        {/* 에러 메시지 */}
        {error && (
          <div className="p-4 text-red-700 bg-red-100 border border-red-400 rounded-md">
            {error}
          </div>
        )}

        {/* 로그인 폼 */}
        <form onSubmit={handleBaekjoonLogin} className="mt-6 space-y-6">
          <div className="space-y-5">
            <div>
              <label
                htmlFor="baekjoonId"
                className="block text-sm font-medium text-gray-700"
              >
                백준 아이디
              </label>
              <input
                id="baekjoonId"
                name="baekjoonId"
                type="text"
                required
                value={baekjoonId}
                onChange={(e) => setBaekjoonId(e.target.value)}
                className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md
                           focus:outline-none focus:ring-blue-500 focus:border-blue-500
                           transition-shadow shadow-sm"
                placeholder="Baekjoon ID"
              />
            </div>
            <div>
              <label
                htmlFor="baekjoonPw"
                className="block text-sm font-medium text-gray-700"
              >
                백준 비밀번호
              </label>
              <input
                id="baekjoonPw"
                name="baekjoonPw"
                type="password"
                required
                value={baekjoonPw}
                onChange={(e) => setBaekjoonPw(e.target.value)}
                className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md
                           focus:outline-none focus:ring-blue-500 focus:border-blue-500
                           transition-shadow shadow-sm"
                placeholder="Password"
              />
            </div>
          </div>

          {/* 버튼 영역 */}
          <div className="space-y-4">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-4 py-2 text-white bg-blue-600 rounded-md
                         hover:bg-blue-700 focus:outline-none focus:ring-2
                         focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-400
                         transition-colors"
            >
              {isLoading ? '로그인 중...' : '백준 로그인'}
            </button>

            <div className="relative flex items-center justify-center">
              <span className="px-2 text-sm text-gray-500 bg-white">또는</span>
              <div className="absolute w-full h-[1px] bg-gray-300"></div>
            </div>

            <button
              type="button"
              onClick={handleGithubConnect}
              className="w-full px-4 py-2 text-white bg-gray-800 rounded-md
                         hover:bg-gray-900 focus:outline-none focus:ring-2
                         focus:ring-offset-2 focus:ring-gray-500
                         flex items-center justify-center space-x-2 transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 0C4.477 0 0 4.477 0 10c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.341-3.369-1.341-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608
                  1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943
                  0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.272.098-2.65
                  0 0 .84-.269 2.75 1.025A9.564 9.564 0 0110 2.836c.85.004
                  1.705.115 2.504.337 1.909-1.294 2.747-1.025
                  2.747-1.025.546 1.378.203 2.397.1 2.65.64.699 1.028
                  1.592 1.028 2.683 0 3.842-2.339 4.687-4.566
                  4.933.359.309.678.919.678 1.852 0 1.336-.012
                  2.415-.012 2.743 0 .267.18.578.688.48C17.137
                  18.163 20 14.417 20 10c0-5.523-4.477-10-10-10z"
                  clipRule="evenodd"
                />
              </svg>
              <span>깃허브 계정 연결하기</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
