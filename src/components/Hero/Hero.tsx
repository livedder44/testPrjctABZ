import s from './Hero.module.scss'
import Button from '../Button/Button'
import bg from '../../assets/img/backgroundImage.jpeg'
import { smoothScrollTo } from '@/utils/scroll'

export default function Hero() {
  const handleScroll = () => {
    smoothScrollTo('signup')
  }

  return (
    <section className={s.hero} aria-labelledby="hero-title">
      <div className={s.bg} style={{ backgroundImage: `url(${bg})` }} />
      <div className={s.overlay} />
      <div className={s.inner}>
        <h2 id="hero-title" className={s.title}>
          Test assignment for front-end developer
        </h2>
        <p className={s.text}>
            What defines a good front-end developer is one that has skilled knowledge of HTML, CSS, JS with a vast understanding of User design thinking as they'll be building web interfaces with accessibility in mind. They should also be excited to learn, as the world of Front-End Development keeps evolving.
        </p>
        <span>
          <Button onClick={handleScroll}>Sign up</Button>
        </span>
      </div>
    </section>
  )
}
