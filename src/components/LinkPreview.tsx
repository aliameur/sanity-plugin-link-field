import {useEffect, useState} from 'react'
import {PreviewProps, useSchema} from 'sanity'

export const LinkPreview = (props: PreviewProps) => {
  const {internalLink, text} = props as {
    internalLink?: string | undefined
    text?: {value: string; _key: string}[]
  }
  const schema = useSchema()
  const [subtitle, setSubtitle] = useState<string | undefined>(undefined)
  const en = text?.find((entry: {_key: string}) => entry._key === 'en')

  useEffect(() => {
    const fetchData = async () => {
      if (!internalLink) return

      const internalDocPreview = schema.get(internalLink)?.preview
      const internalDocTitle = internalDocPreview?.select
        ? internalDocPreview?.prepare?.(internalDocPreview.select)?.title
        : undefined
      if (internalDocTitle) {
        setSubtitle(internalDocTitle)
      }
    }
    fetchData()
  }, [schema, internalLink])
  return props.renderDefault({
    ...props,
    subtitle: subtitle || props.subtitle,
    title: en?.value || text?.[0]?.value || 'Link',
    // title: 'Link',
  })
}
