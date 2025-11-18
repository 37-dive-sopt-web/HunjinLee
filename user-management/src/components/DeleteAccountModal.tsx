// 회원탈퇴 모달 컴포넌트
import * as styles from "./DeleteAccountModal.css"

interface DeleteAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteAccountModal = ({ isOpen, onClose, onConfirm }: DeleteAccountModalProps) => {
  if(!isOpen) return null;
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h2 className={styles.title}>정말 탈퇴하시겠어요?</h2>
        <p className={styles.description}>탈퇴 후에는 모든 정보가 삭제됩니다</p>

        <div className={styles.buttonGroup}>
          <button className={styles.cancelButton} onClick={onClose}>
            취소
          </button>
          <button className={styles.confirmButton} onClick={onConfirm}>
            회원탈퇴
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteAccountModal
