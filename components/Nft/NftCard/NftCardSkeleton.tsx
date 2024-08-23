import React from 'react';
import styles from './NftCard.module.css';
import Button from '@/components/UI/Button';
import { Skeleton, SkeletonText } from '@chakra-ui/react';

const NftCardSkeleton:React.FC = () => {
  return (
    <div className={styles.card}>
      <Skeleton className={styles.image} />
      <SkeletonText className={styles.name} skeletonHeight={'18px'} noOfLines={2}/>
      <Skeleton className={styles.button} height={'40px'} borderRadius={'8px'} />
    </div>
  );
}

export default NftCardSkeleton;
