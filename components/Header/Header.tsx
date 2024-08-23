import React from 'react';
import styles from './Header.module.css';
import dynamic from 'next/dynamic';
import Container from '../UI/Container';

interface IHeaderProps {
  children?: React.ReactNode;
}

const WalletMultiButtonDynamic = dynamic(
  async () =>
    (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
  { ssr: false }
);

const Header:React.FC<IHeaderProps> = (props) => {
  return (
    <Container>
      <header className={styles.header}>
        <img className={styles.logo} src="/images/logo.png" alt="bets.io Fun 3.0" />
        <WalletMultiButtonDynamic />
      </header>
    </Container>
  );
}

export default Header;
