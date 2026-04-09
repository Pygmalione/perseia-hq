export const allowedUploadKinds = ['image', 'video', 'pdf'] as const

export type UploadKind = (typeof allowedUploadKinds)[number]

export function detectUploadKind(file: { type: string }): UploadKind {
  if (file.type.startsWith('image/')) return 'image'
  if (file.type.startsWith('video/')) return 'video'
  return 'pdf'
}
