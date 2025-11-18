import { NavLink, useNavigate } from "react-router-dom";
import * as styles from "./Header.css";

interface HeaderProps {
  userName: string;
}

const Header = ({ userName }: HeaderProps) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userId");
    console.log('로그아웃');
    navigate('/login');
  }

  const handleDeleteAccount = () => {
    // TODO : 회원탈퇴 모달 열기
    console.log('회원탈퇴를 클릭하였습니다.');
  }

  return (
    <header className={styles.header}>
      <div className={styles.userInfo}>
        <h2>마이페이지</h2>
        <span>안녕하세요, {userName}님</span>
      </div>
      <nav className={styles.nav}>
        <NavLink to="/mypage" className={styles.navLink}>
          내 정보
        </NavLink>
        <NavLink to="/mypage/members" className={styles.navLink}>
          회원 조회
        </NavLink>
        <button onClick={handleLogout} className={styles.button}>
          로그아웃
        </button>
        <button onClick={handleDeleteAccount} className={styles.button}>
          회원탈퇴
        </button>
      </nav>
    </header>
  );
}

export default Header
