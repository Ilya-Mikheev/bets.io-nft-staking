import React, { useEffect, useRef } from 'react';
import styles from './Modal.module.css';
import clsx from 'clsx';

export interface IModalProps {
  children?: React.ReactNode;
  size?: 'small' | 'medium';
  isOpen?: boolean;
  onClose?: () => void;
}

const Modal:React.FC<IModalProps> = ({children, size = 'small', isOpen, onClose}) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className={clsx(styles.modal, styles[`modal_size_${size}`])}>
      <div className={styles.bg} onClick={onClose} />
      <div className={styles.modalInner}>
        {children}
        <button type="button" className={styles.close} onClick={onClose}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17 7L7 17M7 7L17 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default Modal;
