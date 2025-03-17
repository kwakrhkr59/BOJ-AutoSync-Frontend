// src/components/ProblemList.js
import React, { useEffect, useState } from 'react';
import { fetchBaekjoonProblems, uploadCodeToGithub } from '../services/api';

function ProblemList() {
  const [problems, setProblems] = useState([]);
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [code, setCode] = useState('');

  // 깃허브 업로드 예시용 (실제로는 OAuth로 받은 토큰을 저장/갱신해야 함)
  const dummyGithubToken = 'YOUR_GITHUB_TOKEN';
  const dummyRepoName = 'YOUR_GITHUB_USERNAME/YOUR_REPO_NAME';

  useEffect(() => {
    // 컴포넌트 마운트 시 백준 문제 목록을 가져와서 상태에 저장
    (async function loadProblems() {
      const data = await fetchBaekjoonProblems();
      setProblems(data);
    })();
  }, []);

  const handleSelectProblem = (problem) => {
    setSelectedProblem(problem);
    setCode(''); // 문제 선택 시 코드 초기화
  };

  const handleUploadCode = async () => {
    if (!selectedProblem) return;

    try {
      // 예: 문제 번호를 파일 경로로 삼음
      const filePath = `baekjoon/${selectedProblem.id}.js`;

      await uploadCodeToGithub({
        repoName: dummyRepoName,
        filePath: filePath,
        content: code,
        token: dummyGithubToken,
      });

      alert('깃허브 업로드 성공!');
    } catch (error) {
      alert('깃허브 업로드 실패! 콘솔을 확인하세요.');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>백준 문제 목록</h2>
      <ul>
        {problems.map((problem) => (
          <li
            key={problem.id}
            onClick={() => handleSelectProblem(problem)}
            style={{
              cursor: 'pointer',
              textDecoration: selectedProblem?.id === problem.id ? 'underline' : 'none',
            }}
          >
            {problem.id} - {problem.title}
          </li>
        ))}
      </ul>

      {selectedProblem && (
        <div style={{ marginTop: '20px' }}>
          <h3>선택 문제: {selectedProblem.title}</h3>
          <textarea
            rows={10}
            cols={50}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="여기에 코드를 작성하세요"
          />
          <br />
          <button onClick={handleUploadCode}>깃허브에 업로드</button>
        </div>
      )}
    </div>
  );
}

export default ProblemList;
