import s from './Preloader.module.scss'
import PreloaderSVG from '@/assets/img/Preloader.svg'

type Props = {
  size?: number 
  alt?: string
}

export default function Preloader({ size = 20, alt = 'Loading…' }: Props) {
  return (
    <img
      src={PreloaderSVG}
      alt={alt}
      className={s.loader}
      style={{ width: size, height: size }}
    />
  )
}
