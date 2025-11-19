// 마이 페이지
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header'
import { getUserById, updateUser } from "../api/user";
import * as styles from './MyPage.css'

const MyPage = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState<number | null>(null);
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");

  // 페이지 로드 시 유저 정보 가져오기
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storeUserId = localStorage.getItem("userId");

        if (!storeUserId) {
          console.log("로그인하지 않은 유저");
          navigate("/login");
        }

        const userIdNum = Number(storeUserId);
        setUserId(userIdNum);

        const response = await getUserById(userIdNum);

        // 데이터 설정
        const userData = response.data;
        setUsername(userData.username);
        setName(userData.name);
        setEmail(userData.email);
        setAge(String(userData.age));
      } catch (err) {
        console.error(err);
        alert("사용자 정보를 불러오는데 실패했습니다.");
        navigate("/login");
      }
    };
    fetchUserData();
  }, [navigate]);

    const handleSave = async () => {
      if (!userId) return;

      try {
        const response = await updateUser(userId, {
          name,
          email,
          age: Number(age),
        });

        console.log("정보 수정 성공:", response);
        alert("저장되었습니다!");
      } catch (error) {
        console.error("정보 수정 실패:", error);
        alert("저장에 실패했습니다. 다시 시도해주세요.");
      }
    };
  
  const isSaveDisabled = name.trim() === "" || email.trim() === "" || age.trim() === "";
  return (
    <div>
      <Header userName={name} />
      <div className={styles.container}>
        <h2 className={styles.title}>내 정보</h2>
        <div className={styles.infoGroupRow}>
          <label className={styles.label}>아이디</label>
          <div className={styles.value}>{username}</div>
        </div>
        <div className={styles.infoGroup}>
          <label className={styles.label}>이름</label>
          <input className={styles.input} type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className={styles.infoGroup}>
          <label className={styles.label}>이메일</label>
          <input className={styles.input} type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>

        <div className={styles.infoGroup}>
          <label className={styles.label}>나이</label>
          <input className={styles.input} type="number" value={age} onChange={(e) => setAge(e.target.value)} />
        </div>

        <button className={styles.button} onClick={handleSave} disabled={isSaveDisabled}>
          저장
        </button>
      </div>
    </div>
  );
}

export default MyPage
