import type { ModalProps } from 'antd';
import { Modal as AntModal } from 'antd';

import './style.css';

function Modal({ ...rest }: ModalProps) {
  return <AntModal {...rest} />;
}

export default Modal;
