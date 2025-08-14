import { useEffect, useMemo, useState } from 'react'
import s from './SignupForm.module.scss'
import Button from '@/components/Button/Button'
import { getPositions, postUser, type Position } from '@/api/users'
import UploadField from '@/components/Fields/UploadField/UploadField'
import RadioGroup from '@/components/RadioGroup/RadioGroup'
import NameInput from '@/components/Fields/inputs/NameInput'
import EmailInput from '@/components/Fields/inputs/EmailInput'
import PhoneInput from '@/components/Fields/inputs/PhoneInput'

import photoCoverUrl from '@/assets/img/photo-cover.jpg'

type Props = { onSuccess?: () => void }

export default function SignupForm({ onSuccess }: Props) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [positionId, setPositionId] = useState<number | null>(null)
  const [photo, setPhoto] = useState<File | null>(null)

  const [positions, setPositions] = useState<Position[]>([])
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const [nameOk, setNameOk] = useState(false)
  const [emailOk, setEmailOk] = useState(false)
  const [phoneOk, setPhoneOk] = useState(false)

  useEffect(() => {
    getPositions().then(r => setPositions(r.positions)).catch(console.error)
  }, [])

  const photoError = useMemo(() => {
    if (!photo) return null
    const allowed = ['image/jpeg', 'image/jpg']
    if (!allowed.includes(photo.type)) return 'Only .jpeg/.jpg'
    if (photo.size > 5 * 1024 * 1024) return 'Max 5 MB'
    return null
  }, [photo])

  const positionError = positionId ? null : 'Select position'

  const formValid = nameOk && emailOk && phoneOk && !positionError && !photoError

  async function getFallbackPhoto(): Promise<File> {
    const blob = await fetch(photoCoverUrl).then(r => r.blob())
    return new File([blob], 'photo-cover.jpg', { type: 'image/jpeg' })
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitted(true)
    if (!formValid || !positionId) return

    try {
      setLoading(true)

      const fileToSend = photo ?? (await getFallbackPhoto())

      await postUser({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        position_id: positionId,
        photo: fileToSend,
      })

      setDone(true)
      onSuccess?.()
    } catch (err: any) {
      alert(err?.message ?? 'Failed to register')
    } finally {
      setLoading(false)
    }
  }

  if (done) return null

  return (
    <section className={s.signup} id="signup" aria-labelledby="signup-title">
      <h2 className={s.title} id="signup-title">Working with POST request</h2>

      <form className={s.form} onSubmit={onSubmit} noValidate>
        <NameInput
          value={name}
          onChange={setName}
          submitted={submitted}
          onValidityChange={setNameOk}
        />

        <EmailInput
          value={email}
          onChange={setEmail}
          submitted={submitted}
          onValidityChange={setEmailOk}
        />

        <PhoneInput
          value={phone}
          onChange={setPhone}
          submitted={submitted}
          onValidityChange={setPhoneOk}
        />

        <RadioGroup
          title="Select your position"
          options={positions.map(p => ({ id: p.id, label: p.name }))}
          value={positionId}
          onChange={(id) => setPositionId(Number(id))}
          error={positionError}
          showError={submitted}
        />

        {}
        <UploadField
          filename={photo?.name}
          onChange={(file) => setPhoto(file)}
          error={submitted ? photoError : null}
          showError={submitted && !!photoError}
        />

        <div className={s.actions}>
          <Button type="submit" disabled={!formValid || loading}>
            Sign up
          </Button>
        </div>
      </form>
    </section>
  )
}
