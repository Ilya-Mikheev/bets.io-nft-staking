import React from 'react';
import styles from './Button.module.scss';
import clsx from 'clsx';

interface IButtonProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, React.AriaAttributes {
  children?: React.ReactNode;
  className?: string;
  fullWidth?: boolean;
  buttonStyle?: 'fill' | 'border';
}

const Button:React.FC<IButtonProps> = ({children, className, fullWidth, buttonStyle, ...props}) => {
  return (
    <button
      className={clsx(
        styles.button,
        fullWidth && styles.button_fullWidth,
        buttonStyle && styles[`button_style_${buttonStyle}`],
        className
      )}
      type="button"
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
