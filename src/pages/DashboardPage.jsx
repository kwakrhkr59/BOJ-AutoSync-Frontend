import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';

const Dashboard = () => {
  const [syncStatus, setSyncStatus] = useState({
    lastSync: null,
    newSubmissions: 0,
    isLoading: true,
    error: null
  });
  const [recentSubmissions, setRecentSubmissions] = useState([]);
  const [githubRepo, setGithubRepo] = useState(null);
  const [syncInProgress, setSyncInProgress] = useState(false);

  // Fetch dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Get sync status
        const statusResponse = await fetch('/api/sync/status');
        const statusData = await statusResponse.json();
        
        // Get recent submissions
        const submissionsResponse = await fetch('/api/submissions/recent');
        const submissionsData = await submissionsResponse.json();
        
        // Get connected repo info
        const repoResponse = await fetch('/api/github/repo');
        const repoData = await repoResponse.json();
        
        setSyncStatus({
          lastSync: statusData.lastSync,
          newSubmissions: statusData.newSubmissions,
          isLoading: false,
          error: null
        });
        
        setRecentSubmissions(submissionsData.submissions);
        setGithubRepo(repoData);
      } catch (err) {
        setSyncStatus({
          ...syncStatus,
          isLoading: false,
          error: '데이터를 불러오는데 실패했습니다.'
        });
      }
    };
    
    fetchDashboardData();
  }, []);
  
  const handleManualSync = async () => {
    setSyncInProgress(true);
    try {
      const response = await fetch('/api/sync/manual', { method: 'POST' });
      const data = await response.json();
      
      if (response.ok) {
        // Refresh data after successful sync
        setSyncStatus({
          lastSync: new Date().toISOString(),
          newSubmissions: 0,
          isLoading: false,
          error: null
        });
        // Show success notification or update UI accordingly
      } else {
        throw new Error(data.message || '동기화에 실패했습니다.');
      }
    } catch (err) {
      setSyncStatus({
        ...syncStatus,
        error: err.message
      });
    } finally {
      setSyncInProgress(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">백준 코드 싱크 대시보드</h1>
        <Link to="/settings" className="px-4 py-2 mt-4 md:mt-0 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500">
          설정
        </Link>
      </div>
      
      {syncStatus.error && (
        <div className="p-4 mb-6 text-red-700 bg-red-100 border border-red-400 rounded-md">
          {syncStatus.error}
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Sync Status Card */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">동기화 상태</h2>
          {syncStatus.isLoading ? (
            <p>로딩 중...</p>
          ) : (
            <>
              <div className="mb-4">
                <p className="text-gray-600">마지막 동기화</p>
                <p className="text-lg font-medium">
                  {syncStatus.lastSync 
                    ? formatDistanceToNow(new Date(syncStatus.lastSync), { addSuffix: true, locale: ko }) 
                    : '아직 동기화 기록이 없습니다.'}
                </p>
              </div>
              <div className="mb-4">
                <p className="text-gray-600">신규 제출 수</p>
                <p className="text-lg font-medium">{syncStatus.newSubmissions}개</p>
              </div>
              <button
                onClick={handleManualSync}
                disabled={syncInProgress}
                className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-blue-400"
              >
                {syncInProgress ? '동기화 중...' : '지금 동기화하기'}
              </button>
            </>
          )}
        </div>
        
        {/* GitHub Repo Card */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">연결된 GitHub 저장소</h2>
          {syncStatus.isLoading ? (
            <p>로딩 중...</p>
          ) : githubRepo ? (
            <>
              <div className="flex items-center mb-4">
                <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 0C4.477 0 0 4.477 0 10c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.341-3.369-1.341-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.272.098-2.65 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0110 2.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.378.203 2.397.1 2.65.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.933.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C17.137 18.163 20 14.417 20 10c0-5.523-4.477-10-10-10z" clipRule="evenodd" />
                </svg>
                <a 
                  href={githubRepo.htmlUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {githubRepo.owner}/{githubRepo.name}
                </a>
              </div>
              <div className="mb-4">
                <p className="text-gray-600">기본 브랜치</p>
                <p className="text-lg font-medium">{githubRepo.defaultBranch}</p>
              </div>
              <div className="mb-4">
                <p className="text-gray-600">저장소 경로</p>
                <p className="text-lg font-medium">{githubRepo.path || '/'}</p>
              </div>
              <Link 
                to="/settings" 
                className="inline-block w-full px-4 py-2 text-center text-gray-800 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                저장소 설정 변경
              </Link>
            </>
          ) : (
            <div className="text-center py-4">
              <p className="mb-4 text-gray-600">연결된 GitHub 저장소가 없습니다.</p>
              <Link 
                to="/settings" 
                className="inline-block px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                GitHub 저장소 연결하기
              </Link>
            </div>
          )}
        </div>
      </div>
      
      {/* Recent Submissions */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">최근 제출 목록</h2>
          <Link to="/history" className="text-blue-600 hover:underline">
            모든 기록 보기
          </Link>
        </div>
        
        {syncStatus.isLoading ? (
          <p>로딩 중...</p>
        ) : recentSubmissions.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-2 text-left text-gray-700 border-b">문제 번호</th>
                  <th className="px-4 py-2 text-left text-gray-700 border-b">문제 이름</th>
                  <th className="px-4 py-2 text-left text-gray-700 border-b">언어</th>
                  <th className="px-4 py-2 text-left text-gray-700 border-b">결과</th>
                  <th className="px-4 py-2 text-left text-gray-700 border-b">제출 시간</th>
                  <th className="px-4 py-2 text-left text-gray-700 border-b">동기화 상태</th>
                </tr>
              </thead>
              <tbody>
                {recentSubmissions.map((submission) => (
                  <tr key={submission.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 border-b">{submission.problemId}</td>
                    <td className="px-4 py-3 border-b">
                      <a 
                        href={`https://www.acmicpc.net/problem/${submission.problemId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {submission.problemName}
                      </a>
                    </td>
                    <td className="px-4 py-3 border-b">{submission.language}</td>
                    <td className="px-4 py-3 border-b">
                      <span className={`px-2 py-1 text-xs rounded ${
                        submission.result === 'AC' ? 'bg-green-100 text-green-800' :
                        submission.result === 'WA' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {submission.result}
                      </span>
                    </td>
                    <td className="px-4 py-3 border-b">
                      {new Date(submission.submittedAt).toLocaleString('ko-KR')}
                    </td>
                    <td className="px-4 py-3 border-b">
                      {submission.synced ? (
                        <span className="px-2 py-1 text-xs rounded bg-green-100 text-green-800">
                          동기화됨
                        </span>
                      ) : (
                        <span className="px-2 py-1 text-xs rounded bg-gray-100 text-gray-800">
                          대기 중
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center py-4 text-gray-600">최근 제출 기록이 없습니다.</p>
        )}
      </div>
      
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">총 제출 수</h3>
          <p className="text-3xl font-bold text-blue-600">
            {syncStatus.isLoading ? '...' : (recentSubmissions.length || 0)}
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">성공한 제출</h3>
          <p className="text-3xl font-bold text-green-600">
            {syncStatus.isLoading ? '...' : recentSubmissions.filter(s => s.result === 'AC').length}
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">동기화 완료</h3>
          <p className="text-3xl font-bold text-purple-600">
            {syncStatus.isLoading ? '...' : recentSubmissions.filter(s => s.synced).length}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;