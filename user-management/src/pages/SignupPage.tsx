// 회원가입 페이지
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const SignupPage = () => {
  const navigate = useNavigate();

  // 현재 단계
  const [step, setStep] = useState(1);

  // 입력값 관리
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");

  const handleBackLogin = () => {
    navigate('/login');
  }
  return (
    <div>
      <h1>회원가입</h1>
      {/* TODO :  step에 따라 다른 폼 내용 보여줄 예정 */}
      <button onClick={handleBackLogin}>로그인으로 돌아가기</button>
    </div>
  )
}

export default SignupPage
