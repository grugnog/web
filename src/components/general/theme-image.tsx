import Image, { ImageProps } from 'next/image'
import { useTheme } from 'next-themes'

// render a image with darkmode support
export const ThemedImage = (
  props: ImageProps & {
    srcDark?: ImageProps['src']
    imgPlaceholder?: ImageProps['src']
  }
) => {
  const { resolvedTheme } = useTheme()

  let src: ImageProps['src'] = props.imgPlaceholder || ''

  if (resolvedTheme) {
    if (resolvedTheme === 'light') {
      src = props.src
    } else if (props.srcDark && resolvedTheme === 'dark') {
      // all dark images get prefix dark_
      src = props.srcDark
    } else {
      src = props.src
    }
  }

  if (!src) {
    return null
  }

  return (
    <Image
      src={src}
      width={props.width}
      height={props.height}
      alt={props.alt}
      quality={props.quality}
      className={props.className}
    />
  )
}
