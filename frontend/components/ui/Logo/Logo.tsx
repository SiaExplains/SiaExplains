import React from 'react';
import Image from 'next/image';
import styles from './Logo.module.scss';

const Logo: React.FC = () => {
    return (
        <div className={styles.logo}>
            <Image src="/logo-text.png" alt="Logo" className={styles.logoImage} width={200} height={50} />
        </div>
    );
};

export default Logo;