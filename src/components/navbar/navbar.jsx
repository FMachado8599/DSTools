import LogoPlaceholder from '@/assets/component-svg/LogoPlaceholder'
import styles from './navbar.module.scss';
import UserSettings from '@/components/navbar/user-settings/UserSettings';

import SunIcon from '@/assets/component-svg/SunIcon';
import NotificationsIcon from '@/assets/component-svg/NotificationsIcon';

const Navbar = () => {
  return (
    <nav className={`${styles.nav} default-format`}>
      <LogoPlaceholder className={styles.logo} />
      <div className={styles.user_actions}>
        <button>
          <SunIcon className={`${styles.theme_icon} ${styles.button_icon}`} />
        </button>
        <button>
          <NotificationsIcon className={`${styles.notifications_icon} ${styles.button_icon}`} />
        </button>
        <UserSettings />
      </div>
    </nav>
  );
};

export default Navbar