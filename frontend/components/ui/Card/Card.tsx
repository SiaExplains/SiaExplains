import React from 'react';
import classNames from 'classnames';
import styles from './Card.module.scss';

interface CardProps {
    hasHover?: boolean; // Enable or disable hover effect
    hoverBackgroundColor?: string; // Custom hover background color
    children: React.ReactNode; // Content inside the card
    optionalClassName?: string; // Optional additional class name
    topLessRadius?: boolean; // Optional prop to remove top border radius
    bottomLessRadius?: boolean; // Optional prop to remove bottom border radius
}

const Card: React.FC<CardProps> = ({
    hoverBackgroundColor = ' var(--rainbow-gold, #ffcd6b)',
    hasHover = false,
    topLessRadius = false,
    bottomLessRadius = false,
    children,
    optionalClassName

}) => {
    return (
        <div
            className={classNames(styles.card, {
                [styles.hasHover]: hasHover,
                [styles.topLessRadius]: topLessRadius,
                [styles.bottomLessRadius]: bottomLessRadius,
            },
            optionalClassName ?? '')}
            style={hasHover ? { '--hover-bg-color': hoverBackgroundColor } as React.CSSProperties : undefined}

        >
            {children}
        </div>
    );
};

export default Card;