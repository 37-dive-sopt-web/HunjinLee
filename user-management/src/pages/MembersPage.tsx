import { useEffect, useState } from "react";
import { getUserById } from "../api/user";
import Header from "../components/Header";
import * as styles from "./MembersPage.css";

interface Member {
  id: number;
  username: string;
  name: string;
  email: string;
  age: number;
}

const MembersPage = () => {
  const [memberId, setMemberId] = useState("");
  const [memberData, setMemberData] = useState<Member | null>(null);
  const [currentUserName, setCurrentUserName] = useState("");

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const storeUserId = localStorage.getItem('userId');

        const response = await getUserById(Number(storeUserId));
        setCurrentUserName(response.data.name);
      } catch(err) {
        console.error("사용자 정보 조회 실패", err);
      }
    }
    fetchCurrentUser();
  }, [])

  const handleSearch = async () => {
    try {
      const response = await getUserById(Number(memberId));

      setMemberData(response.data);
    } catch(err) {
      console.error("회원 정보 조회 실패", err);
      alert("사용자를 찾을 수 없습니다.");
      setMemberData(null);
    }
  };

  const isSearchDisabled = memberId.trim() === "";

  return (
    <div>
      <Header userName="염경호" />

      <div className={styles.container}>
        <h2 className={styles.title}>회원 조회</h2>

        <div className={styles.searchSection}>
          <div className={styles.inputGroup}>
            <label className={styles.label}>회원 ID</label>
            <input
              className={styles.input}
              type="number"
              value={memberId}
              onChange={(e) => setMemberId(e.target.value)}
              placeholder="숫자만 입력하세요"
            />
          </div>

          <button className={styles.button} onClick={handleSearch} disabled={isSearchDisabled}>
            확인
          </button>
        </div>

        {/* 조회 결과 표시 */}
        {memberData && (
          <div className={styles.resultSection}>

            <div className={styles.resultRow}>
              <span className={styles.resultLabel}>이름</span>
              <span className={styles.resultValue}>{memberData.name}</span>
            </div>

            <div className={styles.resultRow}>
              <span className={styles.resultLabel}>아이디</span>
              <span className={styles.resultValue}>{memberData.username}</span>
            </div>

            <div className={styles.resultRow}>
              <span className={styles.resultLabel}>이메일</span>
              <span className={styles.resultValue}>{memberData.email}</span>
            </div>

            <div className={styles.resultRow}>
              <span className={styles.resultLabel}>나이</span>
              <span className={styles.resultValue}>{memberData.age}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );

};

export default MembersPage;
