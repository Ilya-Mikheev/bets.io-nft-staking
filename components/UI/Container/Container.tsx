import React from 'react';
import styles from './Container.module.css';
import clsx from 'clsx';

interface IContainerProps {
  children?: React.ReactNode;
  className?: string;
}

const Container:React.FC<IContainerProps> = ({children, className}) => {
  return (
    <div className={clsx(styles.container, className)}>
      {children}
    </div>
  );
}

export default Container;
