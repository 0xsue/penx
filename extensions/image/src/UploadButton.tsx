import { useRef } from 'react'
import { Box, FowerHTMLProps } from '@fower/react'
import { UploadCloud } from 'lucide-react'
import { Spinner } from 'uikit'

interface Props extends FowerHTMLProps<'div'> {
  uploading: boolean
  handleFile: (file: File) => void
}

export const UploadButton = ({ handleFile, uploading, ...rest }: Props) => {
  const hiddenFileInput = useRef<HTMLInputElement>(null)

  const handleClick = () => {
    hiddenFileInput.current?.click?.()
  }
  return (
    <Box {...rest}>
      <Box
        as="a"
        onClick={handleClick}
        gray500
        bgTransparent
        w-100p
        toCenterY
        gap2
        textSM
        brand500--hover
      >
        {!uploading && <UploadCloud size={20} />}
        {!uploading && <Box>Upload a image</Box>}
        {uploading && (
          <Box toCenterY gapX2>
            <Spinner square5 />
            <Box>Uploading...</Box>
          </Box>
        )}
      </Box>
      <input
        type="file"
        accept="image/*"
        onChange={(event) => {
          const fileUploaded = event.target.files?.[0]!
          handleFile(fileUploaded)
        }}
        ref={hiddenFileInput}
        style={{ display: 'none' }}
      />
    </Box>
  )
}
