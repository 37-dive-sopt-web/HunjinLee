import { useState } from "react";
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

  // 더미 데이터
  const dummyMembers:{[key: number] : Member} = { 
    24: {
      id: 24,
      username: "gnswls",
      name: "훈진",
      email: "202344016@itc.ac.kr",
      age: 25,
    },
    25: {
      id: 25,
      username: "zus",
      name: "주정현",
      email: "zus0816@naver.com",
      age: 25,
    },
  };

  const handleSearch = () => {
    console.log("회원 조회:", memberId);

    // 더미 데이터에서 찾기
    const found = dummyMembers[Number(memberId)];

    if (found) {
      setMemberData(found);
    } else {
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
