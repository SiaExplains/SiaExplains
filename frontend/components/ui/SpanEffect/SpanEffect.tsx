import React from 'react';
import styles from './SpanEffect.module.scss';

type SpanEffectProps = {
  children?: React.ReactNode;
}
const SpanEffect = ({children}: SpanEffectProps) => {
  return (
    <span className={styles.hasDoubleUnderline}>{children}</span>
  );
}

export default SpanEffect;