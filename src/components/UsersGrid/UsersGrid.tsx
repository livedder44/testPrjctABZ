import { useEffect, useState } from 'react'
import UserCard from '@/components/UserCard/UserCard'
import { getUsers } from '@/api/users'
import type { User } from '@/types/user'
import Button from '@/components/Button/Button'
import Preloader from '@/components/Preloader/Preloader'
import s from './UsersGrid.module.scss'

export default function UsersGrid() {
  const [users, setUsers] = useState<User[]>([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    (async () => {
      setLoading(true)
      try {
        const data = await getUsers(page, 6)
        setUsers(prev => (page === 1 ? data.users : [...prev, ...data.users]))
        setTotalPages(data.total_pages)
      } finally {
        setLoading(false)
      }
    })()
  }, [page])

  const loadMore = () => setPage(p => p + 1)

  return (
    <section id="users" className={s.users}>
      <h2 className={s.title} id="signup-title">Working with GET request</h2>
      <div className={s.grid}>
        {users.map(u => <UserCard key={u.id} user={u} />)}
      </div>

      {page < totalPages && (
        <div className={s.actions}>
          {loading ? (
            <Preloader size={48}/> 
          ) : (
            <Button onClick={loadMore} className={s.moreBtn}>
              Show more
            </Button>
          )}
        </div>
      )}
    </section>
  )
}
