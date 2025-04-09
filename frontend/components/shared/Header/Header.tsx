import Logo from "@/components/ui/Logo/Logo";
import MenuBar from "../MenuBar/MenuBar";
import styles from './Header.module.scss';

const Header = () => {
  return (
    <header className={styles.header}>
        <div className={styles.logo}><Logo /></div>
        <div className={styles.menuBar}>
        <MenuBar />
        </div>
    </header>
  );
}
export default Header;