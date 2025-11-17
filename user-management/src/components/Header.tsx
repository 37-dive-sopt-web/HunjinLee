import { NavLink, useNavigate } from "react-router-dom";

interface HeaderProps {
  userName: string;
}

const Header = ({ userName }: HeaderProps) => {
  const navigate = useNavigate();

  const handleMyInfo = () => {
    navigate('/mypage');
  }

  const handleMembers = () => {
    navigate('/mypage/members');
  }

  const handleLogout = () => {
    console.log('로그아웃');
    navigate('/login');
  }

  const handleDeleteAccount = () => {
    // TODO : 회원탈퇴 모달 열기
    console.log('회원탈퇴를 클릭하였습니다.');
  }

  return (
    <header>
      <div>
        <span>안녕하세요, {userName}</span>
      </div>
      <nav>
        <NavLink to="/mypage">내 정보</NavLink>
        <NavLink to="/mypage/members">회원 조회</NavLink>
        <button onClick={handleLogout}>로그아웃</button>
        <button onClick={handleDeleteAccount}>회원탈퇴</button>
      </nav>
    </header>
  );
}

export default Header
