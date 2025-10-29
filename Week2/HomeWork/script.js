// script.js
document.addEventListener("DOMContentLoaded", () => {
  const memberTable = document.querySelector(".member-table tbody"); // tbody 요소 선택
  const LOCAL_STORAGE_KEY = "membersData"; // data.js localStorage 키 세팅
  const filterForm = document.querySelector(".filter-form"); // 폼 요소 선택
  const deleteButton = document.querySelector(".delete-btn"); // 삭제 버튼
  const selectAllCheckbox = document.querySelector("#select-all"); // 전체 선택 체크박스

  const addModalOverlay = document.querySelector("#add-member-modal"); // 모달 배경 전체
  const addMemberBtn = document.querySelector(".add-btn"); // 목록 섹션의 '추가' 버튼
  const closeModalBtn = document.querySelector(".close-modal-btn"); // 모달 닫기 버튼
  const addForm = document.getElementById('add-member-form')  // 모달 폼 요소

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

  // === 필터링 관련 함수 정의 ===
  /*
   * 3. 필터값 가져오기 함수
   * form : 필터 폼 요소
   * return : {필터이름: 필터값, ...} 형태의 객체 반환
   *
   */
  function getFilterValues(form) {
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
  function filterMembers(members, filters) {
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

  // 버튼 초기화 함수
  function resetFilters() {
    filterForm.reset();
    const membersData = getMembersData();
    renderTable(membersData);
  }

  // === 삭제 관련 함수 정의 ===

  // 선택된 멤버 ID 가져오기
  function getSelectedMemberIds() {
    const checkboxes = memberTable.querySelectorAll("input[type='checkbox']:checked");
    return Array.from(checkboxes).map((checkbox) => parseInt(checkbox.dataset.memberId));
  }

  // 선택 멤버 삭제
  function deleteSelectedMembers() {
    const selectedsIds = getSelectedMemberIds();

    let memberData = getMembersData();
    memberData = memberData.filter((member) => !selectedsIds.includes(member.id));

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(memberData));
    renderTable(memberData);
  }

  // 전체 선택 / 해제 기능
  function toggleSelectAll() {
    const checkboxes = memberTable.querySelectorAll("input[type='checkbox']");
    checkboxes.forEach((checkbox) => {
      checkbox.checked = selectAllCheckbox.checked;
    });
  }


  function openModal() {
    addModalOverlay.classList.add("active");
  }

  function closeModal() {
    addModalOverlay.classList.remove("active");
  }

  // 삭제 버튼 이벤트 리스너
  deleteButton.addEventListener("click", deleteSelectedMembers);

  // 전체 선택 체크박스
  selectAllCheckbox.addEventListener("change", toggleSelectAll);

  // 추가 버튼 클릭 시 모달 열기
  addMemberBtn.addEventListener("click", openModal);

  // 닫기 버튼 클릭 시 모달 닫기
  closeModalBtn.addEventListener("click", closeModal);

  // 모달 오버레이 배경 클릭 시 모달 닫기
  addModalOverlay.addEventListener("click", (e) => {
    // 이벤트 타겟이 오버레이 자체일 때만 닫기 
    if (e.target === addModalOverlay) {
      closeModal();
    }
  });

  function generateNewId(members) {
    if (members.length === 0) return 1;
    return Math.max(...members.map((m) => m.id)) + 1;
  }

  // === 모달 폼 제출 핸들러 ===
  function handleAddMemberSubmit(e) {
    e.preventDefault();

    const formData = new FormData(addForm);
    const newMember = {};
    let isFormValid = true;

    for (let [name, value] of formData.entries()) {
      if (!value || value.trim() === "" || value === "선택") {
        isFormValid = false;
        break;
      }
      newMember[name] = value.trim();
    }
    if (!isFormValid) {
      alert("모든 항목을 입력해야 합니다.");
      return;
    }

    const currentMembers = getMembersData();
    newMember.id = generateNewId(currentMembers);

    newMember.codeReviewGroup = parseInt(newMember.codeReviewGroup);
    newMember.age = parseInt(newMember.age);

    currentMembers.push(newMember);

    // 로컬 스토리지 업데이트
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(currentMembers));

    alert(`${newMember.name}님의 데이터가 추가되었습니다.`);
    renderTable(currentMembers);
    closeModal();
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
  addForm.addEventListener('submit', handleAddMemberSubmit);

  // 초기화 버튼 이벤트 리스너
  filterForm.addEventListener("reset", () => {
    setTimeout(() => {
      const membersData = getMembersData();
      renderTable(membersData);
    }, 0);
  });

});
