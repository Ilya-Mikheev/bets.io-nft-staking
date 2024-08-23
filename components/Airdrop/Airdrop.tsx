import React from 'react';
import styles from './Airdrop.module.css';
import SectionTitle from '../UI/SectionTitle';
import Container from '../UI/Container';
import AirdropCard from './AirdropCard';
import Banner from './Banner';

interface IAirdropProps {
  children?: React.ReactNode;
}

const Airdrop:React.FC<IAirdropProps> = (props) => {
  return (
    <div className={styles.airdrop}>
      <Container>
        <SectionTitle>AIRDROP</SectionTitle>
        <div className={styles.cards}>
          <AirdropCard
            title="Multiplier"
            value="X1"
            bg="/images/multiplier-bg.png"
            tooltip="Чем больше карточек находится в стейкинге, тем больше твой мультипликатор"
          />
          <AirdropCard
            title="Airdrop point"
            value="10"
            bg="/images/point-bg.png"
            tooltip="Чем больше карточек находится в стейкинге, тем больше твой мультипликатор"
          />
        </div>
        <Banner />
      </Container>
    </div>
  );
}

export default Airdrop;
