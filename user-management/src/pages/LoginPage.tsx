// 로그인 페이지
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as styles from './LoginPage.css'

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    console.log('로그인 시도', {username, password});
    // TOOD : API 연결 예정
  }

  const handleSignupPage = () => {
    navigate("/signup");
  }
  return (
    <div className={styles.contaier}>
      <div className={styles.formWrapper}>
        <h1 className={styles.title}>로그인</h1>
        <div className={styles.inputGroup}>
          <label className={styles.label}>아이디</label>
          <input
            type="text"
            className={styles.input}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="아이디를 입력해주세요"
          />
        </div>
        <div className={styles.inputGroup}>
          <label className={styles.label}>비밀번호</label>
          <input
            type="password"
            className={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호를 입력해주세요"
          />
        </div>
        <button className={styles.button} onClick={handleLogin}>
          로그인
        </button>
        <div>
          <span className={styles.signupPage} onClick={handleSignupPage}>회원가입</span>
        </div>
      </div>
    </div>
  );
}

export default LoginPage
