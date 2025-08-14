import styles from './Header.module.scss'
import Button from '../Button/Button'
import logo from '../../assets/img/Logo.svg'
import { smoothScrollTo } from '@/utils/scroll'

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.wrapper}>
        <div className={styles.logoBlock}>
          <a href="/" aria-label="Go to homepage">
            <img src={logo} alt="TESTTASK logo" className={styles.logo} />
          </a>
        </div>

        <nav className={styles.nav}>
          <Button onClick={() => smoothScrollTo('users')}>Users</Button>
          <Button onClick={() => smoothScrollTo('signup')}>Sign up</Button>
        </nav>
      </div>
    </header>
  )
}
