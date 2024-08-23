import React, { useState } from 'react';
import styles from './Nft.module.css';
import { CandyMachineItem } from '@metaplex-foundation/mpl-candy-machine';
import SectionTitle from '../UI/SectionTitle';
import Container from '../UI/Container';
import Tabs from '../UI/Tabs';
import { Tab } from '../UI/Tabs/Tabs';
import Button from '../UI/Button';
import { NftCard, NftCardSkeleton } from './NftCard';
import Modal from '../UI/Modal';
import StakeAllModal from './modal/StakeAllModal';
import SuccessModal from './modal/SuccessModal';

const tabs: Tab[] = [{
  id: 0,
  name: 'All',
},{
  id: 1,
  name: 'Unstaked',
},{
  id: 2,
  name: 'Staked',
}]

interface INftProps {
  children?: React.ReactNode;
  items?: CandyMachineItem[];
  isLoading?: boolean;
}

const Nft:React.FC<INftProps> = ({items, isLoading}) => {
  const [currentTab, setCurrentTab] = useState<Tab>(tabs[0]);
  const [staked] = useState<number[]>([3, 5, 6, 9]);
  const [stakedAllModalOpen, setStakedAllModalOpen] = useState<boolean>(false);
  const [successModalOpen, setSuccessModalOpen] = useState<boolean>(false);

  const isShowItem = (index: number) => {
    if ((currentTab.name == 'Staked' && staked.indexOf(index) !== -1)
    || (currentTab.name == 'Unstaked' && staked.indexOf(index) === -1)) {
      return false;
    }
    return true;
  }

  return (
    <>
    <div className={styles.nfts}>
      <Container>
        <div className={styles.header}>
          <SectionTitle>MY NFT's</SectionTitle>
          <Button className={styles.stakeAllButtonMobile} onClick={() => setStakedAllModalOpen(true)}>Stake all</Button>
        </div>
        <div className={styles.tabsContainer}>
          <Tabs items={tabs} current={currentTab} onChange={setCurrentTab} />
          <Button className={styles.stakeAllButton} onClick={() => setStakedAllModalOpen(true)}>Stake all</Button>
        </div>
        <div className={styles.items}>
          {isLoading ? Array.from(Array(4).keys()).map((item) => (
            <NftCardSkeleton key={item} />
          )) : items?.map((item) => (
            <NftCard
              key={item.index}
              data={item}
              staked={Boolean(staked.find((i) => i == item.index))}
              isShow={isShowItem(item.index)} />
          ))}
          
        </div>
      </Container>
    </div>
    <StakeAllModal
      items={items}
      isOpen={stakedAllModalOpen}
      onClose={() => setStakedAllModalOpen(false)}
      onStake={() => {
        setStakedAllModalOpen(false);
        setSuccessModalOpen(true);
      }}
      size="medium"
    />
    <SuccessModal isOpen={successModalOpen} title="All the cards have become stacked" onClose={() => setSuccessModalOpen(false)} />
    </>
  );
}

export default Nft;
