import React from 'react';
import styles from './CenteredContainer.module.scss';

interface CenteredContainerProps {
    children: React.ReactNode;
}

const CenteredContainer: React.FC<CenteredContainerProps> = ({ children }) => {
    return <div className={styles.centeredContainer}>{children}</div>;
};

export default CenteredContainer;