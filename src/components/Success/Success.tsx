import s from './Success.module.scss'
import successImg from '@/assets/img/success-image.svg'

export default function Success() {
  return (
    <section className={s.wrap} aria-labelledby="success-title">
      <h1 id="success-title" className={s.title}>User successfully registered</h1>
      <img src={successImg} alt="" className={s.img} />
    </section>
  )
}
