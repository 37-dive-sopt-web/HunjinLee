import { getMembersData, generateNewId, LOCAL_STORAGE_KEY } from "../service/data-control.js";

const addModalOverlay = document.querySelector("#add-member-modal"); // 모달 배경 전체
const addForm = document.getElementById("add-member-form"); // 모달 폼 요소

export function openModal() {
  addModalOverlay.showModal();
}

export function closeModal() {
  addModalOverlay.close();
  addForm.reset();
}

  // === 모달 폼 제출 핸들러 ===
export function handleAddMemberSubmit(e) {
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
  // renderTable(currentMembers);
  closeModal();
}