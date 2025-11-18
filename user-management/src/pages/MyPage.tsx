// 마이 페이지
import { useState } from 'react'
import Header from '../components/Header'
import * as styles from './MyPage.css'

const MyPage = () => {
  // 더미 데이터 
  const [username] = useState("eju3945");
  const [name, setName] = useState("이훈진");
  const [email, setEmail] = useState("test33@test.com");
  const [age, setAge] = useState("25");

    const handleSave = () => {
      console.log("정보 수정 시도", { name, email, age });
      // TODO: API 연결 예정
      alert("저장되었습니다!");
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
