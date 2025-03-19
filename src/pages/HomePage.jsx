import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.svg';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <header className="flex justify-between items-center mb-16">
          <div className="flex items-center">
            <img src={logo} alt="Logo" className="w-10 h-10 mr-2" />
            <span className="text-2xl font-bold text-blue-600">백준 코드 싱크</span>
          </div>
          <nav>
            <Link 
              to="/login" 
              className="px-4 py-2 text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50 mr-4"
            >
              로그인
            </Link>
            <a 
              href="https://github.com/yourusername/your-repo" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700"
            >
              GitHub
            </a>
          </nav>
        </header>

        <main className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center mb-16">
            <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
                백준 코드를 자동으로<br/>
                <span className="text-blue-600">GitHub에 동기화하세요</span>
              </h1>
              <p className="text-lg text-gray-700 mb-8">
                백준 온라인 저지에서 풀이한 문제들을 자동으로 GitHub 저장소에 기록하고 관리하세요.
                코드 포트폴리오 관리가 쉬워집니다.
              </p>
              <div className="flex flex-wrap">
                <Link 
                  to="/login" 
                  className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 mr-4 mb-4"
                >
                  시작하기
                </Link>
                {/* 아래 a 태그의 href="#features" 는 그대로 두어도 ESLint가 경고를 띄우지 않습니다 
                    (#features는 실제 앵커로서 페이지 내 이동) */}
                <a 
                  href="#features"
                  className="px-6 py-3 bg-white text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50 mb-4"
                >
                  기능 살펴보기
                </a>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="bg-white p-4 rounded-lg shadow-xl">
                <img 
                  src="/api/placeholder/600/400" 
                  alt="서비스 미리보기" 
                  className="rounded" 
                />
              </div>
            </div>
          </div>

          <section id="features" className="py-16">
            <h2 className="text-3xl font-bold text-center mb-12">주요 기능</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">자동 동기화</h3>
                <p className="text-gray-600">
                  백준에서 문제를 풀고 제출하면 자동으로 GitHub 저장소에 코드가 커밋됩니다.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">체계적인 관리</h3>
                <p className="text-gray-600">
                  폴더 구조와 파일 이름을 설정하여 알고리즘 유형별, 문제 번호별로 체계적으로 관리할 수 있습니다.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">통계 대시보드</h3>
                <p className="text-gray-600">
                  문제 해결 현황과 언어별 통계를 한눈에 확인할 수 있는 대시보드를 제공합니다.
                </p>
              </div>
            </div>
          </section>
        </main>

        <footer className="mt-16 py-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 mb-4 md:mb-0">
              © {new Date().getFullYear()} 백준 코드 싱크. All rights reserved.
            </p>
            <div className="flex space-x-4">
              {/* 기존에 href="#"였던 부분 -> 임시로 "/terms" 등으로 교체 */}
              <a href="/terms" className="text-gray-600 hover:text-gray-900">
                이용약관(임시 링크)
              </a>
              <a href="/privacy" className="text-gray-600 hover:text-gray-900">
                개인정보처리방침(임시 링크)
              </a>
              <a 
                href="https://github.com/yourusername/your-repo" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900"
              >
                GitHub
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default HomePage;
