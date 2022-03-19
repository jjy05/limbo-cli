import React from 'react'
import styles from './index.less';

import limbo from '@/assets/limbo.png';

const Home = () => {
  return <div className={styles.home}>
    <div className={styles.logoContainer}>
      <img src={limbo} className={styles.logo} />
    </div>
  </div>;
}

export default Home;