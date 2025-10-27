// script.js
document.addEventListener("DOMContentLoaded", () => {
  // tbody 요소 선택
  const memberTable = document.querySelector(".member-table tbody");
  // data.js localStorage 키 세팅
  const LOCAL_STORAGE_KEY = "membersData";
  // 폼 요소 선택
  const filterForm = document.querySelector(".filter-form");

  // 1 데이터 가져오기 함수
  function getMembersData() {
    const storedData = localStorage.getItem(LOCAL_STORAGE_KEY);
    // 데이터 없으면 console.error 반환
    if (!storedData) {
      console.error("ERROR: DATA 없음");
      return [];
    }
    return JSON.parse(storedData);
  }

  // 2. 테이블 렌더링 함수 
  function renderTable(members) {
    memberTable.innerHTML = "";
    const keys = ["name", "englishName", "github", "gender", "role", "codeReviewGroup", "age"];

    members.forEach((member) => {
      const row = document.createElement("tr");

      // 체크박스
      const checkboxCell = document.createElement("td");
      checkboxCell.innerHTML = `<input type="checkbox">`;
      row.appendChild(checkboxCell);

      // 컬럼 데이터 렌더링
      keys.forEach((key) => {
        const cell = document.createElement("td");
        const value = member[key];

        if (key === "github") {
          cell.innerHTML = `<a href="https://github.com/${value}" target="_blank">${value}</a>`;
        } else if (key === "gender") {
          cell.textContent = value === "male" ? "남자" : "여자";
        } else {
          cell.textContent = value;
        }
        row.appendChild(cell);
      });

      memberTable.appendChild(row);
    });
  }

  // === 필터링 관련 함수 정의 ===
  // 4. 필터 값 가져오기
  function getFilterValues(form) {
    const formData = new FormData(form);
    const filters = {};

    for (let [name, value] of formData.entries()) {
      if (value && value !== "all") {
        filters[name] = value.trim().toLowerCase();
      }
    }
    return filters;
  }

  // 데이터 필터링 함수
  function filterMembers(members, filters) {
    let result = [...members]; // 복사본 생성

    Object.entries(filters).forEach(([key, value]) => {
      if (!value || value === "all") return;

      const isPartialMatch = ["name", "englishName", "github"].includes(key);

      result = result.filter((member) => {
        const memberVal = String(member[key]).toLowerCase();
        const filterVal = value.toLowerCase();
        return isPartialMatch ? memberVal.includes(filterVal) : memberVal === filterVal;
      });
    });

    return result;
  }

  // 버튼 초기화 함수
  function resetFilters() {
    filterForm.reset();
    const membersData = getMembersData();
    renderTable(membersData);
  }

  // 폼 제출 처리
  function handleSubmit(e) {
    e.preventDefault(); // 페이지 새로 고침 방지
    const filters = getFilterValues(filterForm);
    const membersData = getMembersData();
    const filtereMembers = filterMembers(membersData, filters);
    renderTable(filtereMembers);
  }

  // === 초기 실행 및 이벤트 리스너 설정 ===
  const membersDataForRendering = getMembersData();
  renderTable(membersDataForRendering);

  // 폼 제출 이벤트 리스너
  filterForm.addEventListener("submit", handleSubmit);
});
