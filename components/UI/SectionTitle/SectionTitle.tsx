import React from 'react';
import styles from './SectionTitle.module.css';
import clsx from 'clsx';

interface ISectionTitleProps {
  children?: React.ReactNode;
  className?: string
}

const SectionTitle:React.FC<ISectionTitleProps> = ({children, className}) => {
  return (
    <h2 className={clsx(styles.title, className)}>
      {children}
    </h2>
  );
}

export default SectionTitle;
