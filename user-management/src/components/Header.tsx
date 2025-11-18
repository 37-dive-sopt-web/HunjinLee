import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import DeleteAccountModal from './DeleteAccountModal';
import * as styles from "./Header.css";


interface HeaderProps {
  userName: string;
}

const Header = ({ userName }: HeaderProps) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("userId");
    console.log('로그아웃');
    navigate('/login');
  }

  const handleDeleteAccount = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleDeleteConfirm = () => {
    // TODO: API 연결 예정
    console.log("회원탈퇴 진행");

    // localStorage 삭제
    localStorage.removeItem("userId");

    alert("회원탈퇴가 완료되었습니다.");

    // 로그인 페이지로 이동
    navigate("/login");
  };

  return (
    <>    
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
      <DeleteAccountModal 
          isOpen={isModalOpen}
          onClose={handleModalClose}
          onConfirm={handleDeleteConfirm}
      />
    </>
  );
}

export default Header
