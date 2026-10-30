/**
 * Staff photo helpers for the backend media API (see docs/FRONTEND_IMAGES.md).
 *
 * staffPhoto stores an image ID served by GET /backend/media/images/{id}.
 * Placeholders (default.png, notice.png, ...) and names the media API cannot
 * serve are still resolved against params.fileURL.
 */

// Empty because /backend is proxied on the frontend origin (nginx / devServer).
const backendOrigin = ''

export const MEDIA_IMAGES_PATH = '/backend/media/images'
export const MAX_STAFF_PHOTO_BYTES = 2 * 1024 * 1024
export const STAFF_PHOTO_ACCEPT = 'image/jpeg,image/png'

const UUID_BASE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/
const LEGACY_BASE = /^[0-9a-f]{13}$/
const UUID_EXTS = ['jpg', 'jpeg', 'png']
const LEGACY_EXTS = ['jpg', 'jpeg', 'png', 'gif']

function backendUrl(path) {
  return `${backendOrigin.replace(/\/$/, '')}${path}`
}

/** True when the media API can serve this ID (new UUID uploads or legacy PHP names). */
export function isMediaImageId(id) {
  if (!id) return false
  const name = String(id)
  const dot = name.lastIndexOf('.')
  if (dot <= 0) return false
  const base = name.slice(0, dot)
  const ext = name.slice(dot + 1).toLowerCase()
  return (UUID_BASE.test(base) && UUID_EXTS.includes(ext))
    || (LEGACY_BASE.test(base) && LEGACY_EXTS.includes(ext))
}

export function staffPhotoUrl(id) {
  if (!id) return null
  return backendUrl(`${MEDIA_IMAGES_PATH}/${encodeURIComponent(id)}`)
}

/** URL of a static placeholder image under params.fileURL. */
export function placeholderUrl(params, name) {
  const p = params || {}
  return (p.fileURL || '') + (name || p.defaultImage || 'default.png')
}

/** Resolve a staffPhoto value to a displayable URL, falling back to a placeholder. */
export function resolveStaffPhoto(photo, params, placeholder) {
  if (!photo) return placeholderUrl(params, placeholder)
  if (isMediaImageId(photo)) return staffPhotoUrl(photo)
  return ((params && params.fileURL) || '') + photo
}

export async function uploadStaffPhoto(file, restkey) {
  if (!file || file.size === 0 || file.size > MAX_STAFF_PHOTO_BYTES) {
    throw new Error('Select a non-empty image no larger than 2 MiB.')
  }
  const form = new FormData()
  form.append('file', file)

  // Do not set Content-Type: the browser must supply the multipart boundary.
  const response = await fetch(backendUrl(MEDIA_IMAGES_PATH), {
    method: 'POST',
    headers: { Authorization: `Bearer ${restkey}` },
    body: form,
  })
  if (!response.ok) {
    const text = await response.text()
    let message = `Image upload failed (${response.status})`
    try {
      const problem = JSON.parse(text)
      if (typeof problem.detail === 'string') message = problem.detail
    } catch (e) {
      // A reverse proxy may return HTML/text instead of the API's problem JSON.
      message += '. Please retry or contact support.'
    }
    const error = new Error(message)
    error.status = response.status
    throw error
  }
  return response.json()
}

/**
 * Component mixin: staffPhotoSrc() resolves photos and swaps in the placeholder
 * once an image fails to load (onStaffPhotoError), without retrying broken URLs.
 */
export const staffPhotoMixin = {
  data() {
    return { failedStaffPhotos: {} }
  },
  methods: {
    staffPhotoSrc(photo, params, placeholder) {
      const url = resolveStaffPhoto(photo, params, placeholder)
      return this.failedStaffPhotos[url] ? placeholderUrl(params, placeholder) : url
    },
    onStaffPhotoError(url) {
      if (url && !this.failedStaffPhotos[url]) this.$set(this.failedStaffPhotos, url, true)
    },
    drillStaffPhoto(paramdata, staffId) {
      const list = paramdata && paramdata.staff_det && paramdata.staff_det.staff
      const staff = list && list[staffId]
      return this.staffPhotoSrc(staff && staff.staffPhoto, paramdata && paramdata.params_ref && paramdata.params_ref.params, 'default.png')
    },
  },
}
