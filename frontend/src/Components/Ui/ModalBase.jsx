import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";

export default function ModalBase({
  open,
  onClose,
  children,
  center = true,
  className = {},
}) {
  return (
    <Modal open={open} onClose={onClose} center={center} classNames={className}>
      {children}
    </Modal>
  );
}
