import React, { useEffect, useState } from 'react';
import styles from './NftCard.module.css';
import { CandyMachineItem } from '@metaplex-foundation/mpl-candy-machine';
import Button from '@/components/UI/Button';
import StakeModal from '../modal/StakeModal';
import SuccessModal from '../modal/SuccessModal';

interface INftCardProps {
  data: CandyMachineItem,
  staked?: boolean,
  isShow?: boolean
}

const NftCard:React.FC<INftCardProps> = ({data, staked = false, isShow = true}) => {
  const [image, setImage] = useState<string>('')
  const [stakeModalOpen, setStakeModalOpen] = useState<boolean>(false);
  const [successModalOpen, setSuccessModalOpen] = useState<boolean>(false);

  useEffect(() => {
    fetch(data.uri).then((response) => response.json()).then((response) => setImage(response.image))
  }, [])

  if (!isShow) {
    return null;
  }
  
  return (
    <>
    <div className={styles.card}>
      <img className={styles.image} src={image} alt={data.name} />
      <h3 className={styles.name}>{data.name}</h3>
      {staked ? (
        <Button className={styles.button} fullWidth buttonStyle="border">Unstake</Button>
      ) : (
        <Button className={styles.button} fullWidth onClick={() => setStakeModalOpen(true)}>Stake</Button>
      )}
      
    </div>
    <StakeModal
      isOpen={stakeModalOpen}
      onClose={() => setStakeModalOpen(false)}
      onStake={() => {
        setStakeModalOpen(false);
        setSuccessModalOpen(true);
      }}
      name={data.name}
      image={image}
    />
    <SuccessModal isOpen={successModalOpen} title={`${data.name} is staked`} onClose={() => setSuccessModalOpen(false)} />
    </>
  );
}

export default NftCard;
