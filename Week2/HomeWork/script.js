// script.js
document.addEventListener("DOMContentLoaded", () => {
  // tbody 요소 선택
  const $memberTable = document.querySelector(".member-table tbody");
  // data.js localStorage 키 세팅
  const LOCAL_STORAGE_KEY = "membersData";

  // 1. localStorage에서 데이터를 불러오는 함수
  function getMembersData() {
    const storedData = localStorage.getItem(LOCAL_STORAGE_KEY);
    // 데이터 없으면 console.error 반환
    if (!storedData) {
      console.error("ERROR: DATA 없음");
      return [];
    }

    return JSON.parse(storedData);
  }

  // 2. 테이블 본문(<tbody>) 렌더링
  function renderTable(members) {
    $memberTable.innerHTML = "";
    const keys = [
      "name",
      "englishName",
      "github",
      "gender",
      "role",
      "codeReviewGroup", 
      "age",
    ];

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

      $memberTable.appendChild(row);
    });
  }

  const membersDataForRendering = getMembersData();
  renderTable(membersDataForRendering);
});
