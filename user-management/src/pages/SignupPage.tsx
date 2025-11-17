// 회원가입 페이지
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const SignupPage = () => {
  const navigate = useNavigate();

  // 현재 단계
  const [step, setStep] = useState(1);

  // 입력값 관리
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");

  const handleBackLogin = () => {
    navigate("/login");
  };

  // 회원가입
  const handleSignup = () => {
    console.log('회원가입 시도', {
      username, 
      password, 
      name, 
      email,
      age,
    })
  }

  // 1단계 다음 버튼
  const handleStep1Next = () => {
    setStep(2);
  };

  // 1단계 폼 렌더링
  const renderStep1 = () => {
    const idDisabled = username.trim() === "";

    return (
      <div>
        <div>
          <label>아이디</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="아이디를 입력해주세요"
          />
        </div>
        <button onClick={handleStep1Next} disabled={idDisabled}>
          다음
        </button>
      </div>
    );
  };
  // 2단계 다음 버튼
  const handleStep2Next = () => {
    setStep(3);
  };

  // 2단계 폼 렌더링
  const renderStep2 = () => {
    const pwDisabled = password.trim() === '' || passwordConfirm.trim() === '' || password != passwordConfirm;
      return (
        <div>
          <div>
            <label>비밀번호</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호를 입력해주세요"
            />
          </div>

          <div>
            <label>비밀번호 확인</label>
            <input
              type="password"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              placeholder="비밀번호를 다시 입력해주세요"
            />
          </div>

          <button onClick={handleStep2Next} disabled={pwDisabled}>
            다음
          </button>
        </div>
      );
  };

  // 3단계 폼 렌더링
  const renderStep3 = () => {
    const isDisabled = name.trim() === '' || email.trim() === '' || age.trim() === '';

    return (
      <div>
        <div>
          <label>이름</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder='이름을 입력해주세요' />
        </div>
        <div>
          <label>이메일</label>
          <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='이메일을 입력해주세요' />
        </div>
        <div>
          <label>나이</label>
          <input type="number" value={age} onChange={(e) => setAge(e.target.value)} placeholder='나이를 입력해주세요' />
        </div>

        <button onClick={handleSignup} disabled={isDisabled}>
          회원가입
        </button>
      </div>
    )
  };

  return (
    <div>
      <h1>회원가입</h1>
      {/* TODO :  step에 따라 다른 폼 내용 보여줄 예정 */}
      {step === 1 && renderStep1()}
      {step === 2 && renderStep2()}
      {step === 3 && renderStep3()}
      <button onClick={handleBackLogin}>로그인으로 돌아가기</button>
    </div>
  );
}

export default SignupPage
