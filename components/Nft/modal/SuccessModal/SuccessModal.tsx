import React from 'react';
import styles from 'components/UI/Modal/Modal.module.css';
import Modal, { IModalProps } from '@/components/UI/Modal/Modal';
import Button from '@/components/UI/Button';

interface ISuccessModalProps extends IModalProps {
  title: string
}

const SuccessModal:React.FC<ISuccessModalProps> = ({title, ...props}) => {
  return (
    <Modal {...props}>
      <img className={styles.image} src="/images/check.png" alt="Check" />
      <h3 className={styles.title}>{title}</h3>
      <Button className={styles.button} fullWidth onClick={() => props.onClose && props.onClose()}>Okay</Button>
    </Modal>
  );
}

export default SuccessModal;
