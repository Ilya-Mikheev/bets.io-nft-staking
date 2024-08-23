import React from 'react';
import styles from './Banner.module.css';

interface IBannerProps {
  children?: React.ReactNode;
}

const Banner:React.FC<IBannerProps> = (props) => {
  return (
    <div className={styles.banner}>
      <p className={styles.title}>Airdrop date will be announced later</p>
      <img className={styles.image} src="/images/banner-img.png" alt="" />
    </div>
  );
}

export default Banner;
