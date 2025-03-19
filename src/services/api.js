// src/services/api.js
import axios from 'axios';

/**
 * 백준 문제 목록(혹은 상세) 데이터를 가져오는 예시 함수입니다.
 * 실제로는 HTML 파싱 라이브러리(cheerio 등)나 비공식 API 등을
 * 사용해야 할 수 있습니다.
 */
export async function fetchBaekjoonProblems() {
  try {
    // 가상의 API 엔드포인트 예시 (백준 공식 API가 없으므로 실제론 다른 방식 필요)
    const response = await axios.get('/api/baekjoon/problems');
    return response.data;
  } catch (error) {
    console.error('백준 문제 목록을 가져오는 중 오류 발생:', error);
    return [];
  }
}

/**
 * 깃허브에 코드를 업로드하는 예시 함수입니다.
 * 실제로는 OAuth 인증 후 받은 토큰을 헤더에 넣어야 합니다.
 */
export async function uploadCodeToGithub({ repoName, filePath, content, token }) {
  try {
    const apiUrl = `https://api.github.com/repos/${repoName}/contents/${filePath}`;

    const response = await axios.put(
      apiUrl,
      {
        message: '백준 문제 풀이 업로드',
        content: btoa(content),  // Base64 인코딩
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('깃허브 업로드 중 오류 발생:', error);
    throw error;
  }
}
