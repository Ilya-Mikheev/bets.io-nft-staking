import React, { useState } from 'react';
import styles from './AirdropCard.module.css';
import { Tooltip } from '@chakra-ui/react';

interface IAirdropCardProps {
  bg: string;
  title: string;
  value: string;
  tooltip?: string;
}

const AirdropCard:React.FC<IAirdropCardProps> = ({
  bg,
  title,
  value,
  tooltip,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <section className={styles.card} style={{backgroundImage: `url(${bg})`}}>
      <div className={styles.header}>
        <h3 className={styles.title}>{title}</h3>
        {tooltip && (
          <Tooltip label={tooltip} placement="auto-start" className={styles.tooltip} isOpen={isOpen}>
            <svg
              onMouseEnter={() => setIsOpen(true)}
              onMouseLeave={() => setIsOpen(false)}
              width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.9935 1.23047C6.16916 1.23047 1.4502 6.09304 1.4502 11.9976C1.4502 17.9455 6.16916 22.7647 11.9935 22.7647C17.7753 22.7647 22.5367 17.9455 22.5367 11.9976C22.5367 6.09304 17.7753 1.23047 11.9935 1.23047ZM11.9935 6.00621C12.9713 6.00621 13.779 6.83111 13.779 7.82967C13.779 8.87165 12.9713 9.65313 11.9935 9.65313C10.9731 9.65313 10.2079 8.87165 10.2079 7.82967C10.2079 6.83111 10.9731 6.00621 11.9935 6.00621ZM14.3742 17.0338C14.3742 17.3377 14.1191 17.5548 13.864 17.5548H10.1229C9.82529 17.5548 9.61273 17.3377 9.61273 17.0338V15.9918C9.61273 15.7313 9.82529 15.4708 10.1229 15.4708H10.633V12.6922H10.1229C9.82529 12.6922 9.61273 12.4752 9.61273 12.1712V11.1293C9.61273 10.8688 9.82529 10.6083 10.1229 10.6083H12.8437C13.0988 10.6083 13.3539 10.8688 13.3539 11.1293V15.4708H13.864C14.1191 15.4708 14.3742 15.7313 14.3742 15.9918V17.0338Z" fill="#35C31E" />
            </svg>
          </Tooltip>
        )}
      </div>
      <p className={styles.value}>{value}</p>
    </section>
  );
}

export default AirdropCard;
