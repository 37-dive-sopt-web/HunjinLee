import { getMembersData, deleteSelectedMembers } from "../service/data-control.js";
import { getFilterValues, filterMembers } from "../service/filter.js";
import { openModal, closeModal, handleAddMemberSubmit } from "./modal.js";

document.addEventListener("DOMContentLoaded", () => {
  const memberTable = document.querySelector(".member-table tbody");
  const filterForm = document.querySelector(".filter-form");
  const deleteButton = document.querySelector(".delete-btn");
  const selectAllCheckbox = document.querySelector("#select-all");

  const addModalOverlay = document.querySelector("#add-member-modal");
  const addMemberBtn = document.querySelector(".add-btn");
  const closeModalBtn = document.querySelector(".close-modal-btn");
  const addForm = document.getElementById("add-member-form");

  // 2. 테이블 렌더링 함수
  function renderTable(members) {
    memberTable.innerHTML = ""; // 기존 명단 초기화
    const keys = ["name", "englishName", "github", "gender", "role", "codeReviewGroup", "age"];

    members.forEach((member) => {
      const row = document.createElement("tr");

      // 체크박스
      const checkboxCell = document.createElement("td");
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.dataset.memberId = member.id;
      checkboxCell.appendChild(checkbox);
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

  // 버튼 초기화 함수
  function resetFilters() {
    filterForm.reset();
    const membersData = getMembersData();
    renderTable(membersData);
  }

  // 선택된 멤버 ID 가져오기
  function getSelectedMemberIds() {
    const checkboxes = memberTable.querySelectorAll("input[type='checkbox']:checked");
    return Array.from(checkboxes).map((checkbox) => parseInt(checkbox.dataset.memberId));
  }

  // 전체 선택 / 해제 기능
  function toggleSelectAll() {
    const checkboxes = memberTable.querySelectorAll("input[type='checkbox']");
    checkboxes.forEach((checkbox) => {
      checkbox.checked = selectAllCheckbox.checked;
    });
  }

  // 폼 제출 처리
  function handleSubmit(e) {
    e.preventDefault();
    const filters = getFilterValues(filterForm);
    const membersData = getMembersData();
    const filtereMembers = filterMembers(membersData, filters);
    renderTable(filtereMembers);
  }

  // === 초기 실행 및 이벤트 리스너 설정 ===
  const membersDataForRendering = getMembersData();
  renderTable(membersDataForRendering);

  deleteButton.addEventListener("click", () => {
    const selectedsIds = getSelectedMemberIds();
    const updatedMembers = deleteSelectedMembers(selectedsIds);
    renderTable(updatedMembers);
  });

  // 체크박스 
  selectAllCheckbox.addEventListener("change", toggleSelectAll);

  // 모달 열기
  addMemberBtn.addEventListener("click", openModal);

  // 모달 닫기 
  closeModalBtn.addEventListener("click", closeModal);

  // 배경 클릭 시 모달 닫기 
  addModalOverlay.addEventListener("click", (e) => {
    if (e.target === addModalOverlay) {
      closeModal();
    }
  });

  // 폼 제출 이벤트 리스너 (필터링)
  filterForm.addEventListener("submit", handleSubmit);

  // 모달 폼 제출 이벤트 리스너
  addForm.addEventListener('submit', (e) => {
    handleAddMemberSubmit(e);
    const updatedMembers = getMembersData();
    renderTable(updatedMembers)
  })

  // 초기화 버튼 이벤트 리스너
  filterForm.addEventListener("reset", () => {
    setTimeout(() => {
      const membersData = getMembersData();
      renderTable(membersData);
    }, 0);
  });
});
