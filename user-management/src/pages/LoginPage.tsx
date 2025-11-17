// 로그인 페이지
import { useState } from 'react';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log('로그인 시도', {username, password});
    // TOOD : API 연결 예정
  }
  return (
    <div>
      <h1>로그인</h1>
      <div>
        <label>아이디</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="아이디를 입력해주세요"
        />
      </div>
      <div>
        <label>비밀번호</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호를 입력해주세요"
        />
      </div>
      <button onClick={handleLogin}>로그인</button>
      <div>
        <span>회원가입</span>
      </div>
    </div>
  );
}

export default LoginPage
