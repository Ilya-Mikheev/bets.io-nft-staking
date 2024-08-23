import React from 'react';
import styles from 'components/UI/Modal/Modal.module.css';
import Modal from '@/components/UI/Modal';
import Button from '@/components/UI/Button';
import { IModalProps } from '@/components/UI/Modal/Modal';

interface IStakeModalProps extends IModalProps {
  name: string,
  image: string,
  onStake?: () => void,
}

const StakeModal:React.FC<IStakeModalProps> = ({name, image, onStake, ...props}) => {
  return (
    <Modal {...props}>
      <img className={styles.image} src={image} alt="Check" />
      <h3 className={styles.title}>Do you want to stake {name}?</h3>
      <Button fullWidth className={styles.button} onClick={onStake}>Stake</Button>
    </Modal>
  );
}

export default StakeModal;
