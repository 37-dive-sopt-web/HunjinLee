// === 필터링 관련 함수 정의 ===
/*
 * 3. 필터값 가져오기 함수
 * form : 필터 폼 요소
 * return : {필터이름: 필터값, ...} 형태의 객체 반환
 *
 */
export function getFilterValues(form) {
  const formData = new FormData(form); // 폼 데이터 내용 가져오기
  const filters = {};

  for (let [name, value] of formData.entries()) {
    // value가 비어있지 않고, "all"이 아닐 때
    if (value && value !== "all") {
      // 공백 제거, 소문자 변환 후 저장
      filters[name] = value.trim().toLowerCase();
    }
  }
  return filters;
}

  /*
   * 4. 데이터 필터링 함수
   * @param {Array<Object>} members - 현재 명단
   * @param {Object} filters - 사용자가 입력한 모든 검색 조건
   * @returns {Array<Object>} - 모든 조건에 통과한 사람들로 이루어진 새로운 명단
  */

// 명단과 검색 조건을 받아서 함수 시작
export function filterMembers(members, filters) {
  if (Object.keys(filters).length === 0) {
    return members;
  }
  return members.filter((member) => {
    return Object.entries(filters).every(([key, filterValue]) => {
      // entry 메소드 : 객체의 키-값 쌍을 배열로 반환
      // every 메소드 : 모든 조건이 참이어야 true 반환
      const memberValue = String(member[key]).toLowerCase();
      return memberValue === filterValue;
    });
  });
}