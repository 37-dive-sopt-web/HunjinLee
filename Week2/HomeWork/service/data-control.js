export const LOCAL_STORAGE_KEY = "membersData";

// 1 데이터 가져오기 함수
export function getMembersData() {
  const storedData = localStorage.getItem(LOCAL_STORAGE_KEY);
  // 데이터 없으면 console.error 반환
  if (!storedData) {
    console.error("ERROR: DATA 없음");
    return [];
  }
  return JSON.parse(storedData);
}

// 새로운 ID 생성 함수
export function generateNewId(members) {
  if (members.length === 0) return 1;
  return Math.max(...members.map((m) => m.id)) + 1;
}

// 선택 멤버 삭제
export function deleteSelectedMembers(selectedsIds) {
  let memberData = getMembersData();
  memberData = memberData.filter((member) => !selectedsIds.includes(member.id));

  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(memberData));
  // renderTable(memberData);
  return memberData;
}