import s from './UserCard.module.scss';
import type { User } from '@/types/user';
import photoCover from '@/assets/img/photo-cover.jpg';

type Props = { user: User };

export default function UserCard({ user }: Props) {
  return (
    <div className={s.card}>
      <img
        className={s.photo}
        src={user.photo || photoCover}
        onError={(e) => { (e.currentTarget as HTMLImageElement).src = photoCover; }}
        alt={user.name}
        width={70}
        height={70}
        loading="lazy"
      />
      {}

      <div className={s.info}>
            <div className={s.info}>
            <div className={s.tooltipWrapper}>
                <p className={s.name} tabIndex={0}>{user.name}</p>
                <p className={s.tooltip}>{user.name}</p>
            </div>

            <div className={s.tooltipWrapper}>
                <p className={s.position} tabIndex={0}>{user.position}</p>
                <p className={s.tooltip}>{user.position}</p>
            </div>

            <div className={s.tooltipWrapper}>
                <p className={s.email} tabIndex={0}>{user.email}</p>
                <p className={s.tooltip}>{user.email}</p>
            </div>

            <div className={s.tooltipWrapper}>
                <p className={s.phone} tabIndex={0}>{user.phone}</p>
                <p className={s.tooltip}>{user.phone}</p>
            </div>
            </div>

      </div>
    </div>
  );
}
