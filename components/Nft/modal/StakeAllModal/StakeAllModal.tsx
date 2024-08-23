import React, { useEffect, useState } from 'react';
import styles from 'components/UI/Modal/Modal.module.css';
import Modal, { IModalProps } from '@/components/UI/Modal/Modal';
import { CandyMachineItem } from '@metaplex-foundation/mpl-candy-machine';
import Button from '@/components/UI/Button';

interface IStakeAllModalProps extends IModalProps {
  items?: CandyMachineItem[],
  onStake?: () => void,
}

const StakeAllModal:React.FC<IStakeAllModalProps> = ({items, onStake, ...props}) => {
  const [image1, setImage1] = useState<string>('');
  const [image2, setImage2] = useState<string>('');
  const [image3, setImage3] = useState<string>('');

  useEffect(() => {
    if (items?.[0]) {
      fetch(items[0].uri).then((response) => response.json()).then((response) => setImage1(response.image))
    }
    if (items?.[1]) {
      fetch(items[1].uri).then((response) => response.json()).then((response) => setImage2(response.image))
    }
    if (items?.[2]) {
      fetch(items[2].uri).then((response) => response.json()).then((response) => setImage3(response.image))
    }
  }, [items])
  return (
    <Modal size="medium" {...props}>
      <div className={styles.images}>
        <img className={styles.image1} src={image1} alt={items?.[0].name} />
        <img className={styles.image2} src={image2} alt={items?.[0].name} />
        <img className={styles.image3} src={image3} alt={items?.[0].name} />
      </div>
      <h3 className={styles.title}>Do you want to stake all cards?</h3>
      <Button fullWidth className={styles.button} onClick={onStake}>Stake</Button>
    </Modal>
  );
}

export default StakeAllModal;
