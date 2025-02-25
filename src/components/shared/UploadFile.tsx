import classNames from 'classnames'
import { Dispatch, FC, SetStateAction, useCallback, useState } from 'react'
import { FileRejection, useDropzone } from 'react-dropzone'

interface UploadFileProps {
  maxFiles?: number
  className?: string
  selectedFiles: SelectedFile[]
  setSelectedFiles: Dispatch<SetStateAction<SelectedFile[]>>
}

export interface UploadFileRef {
  getFileUrls: () => string[]
  getSelectedFiles: () => SelectedFile[]
  setErrorMessage: Dispatch<SetStateAction<string | null>>
  selectedFiles: SelectedFile[]
}

const UploadFile: FC<UploadFileProps> = ({
  className,
  maxFiles = 1,
  selectedFiles,
  setSelectedFiles
}) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setErrorMessage(null)

      const newFiles = acceptedFiles.map((file) => ({
        name: file.name,
        url: URL.createObjectURL(file),
        file
      }))

      if (newFiles.length > maxFiles) {
        setSelectedFiles(newFiles.slice(0, maxFiles))
      } else {
        setSelectedFiles(() => [...newFiles].slice(0, maxFiles))
      }
    },
    [maxFiles]
  )

  const onDropRejected = useCallback((fileRejections: FileRejection[]) => {
    fileRejections.forEach(({ file, errors }) => {
      errors.forEach((err) => {
        if (err.code === 'file-too-large') {
          setErrorMessage(`File "${file.name}" is too large. Maximum size allowed is 5MB.`)
        }
        if (err.code === 'file-invalid-type') {
          setErrorMessage(
            `File "${file.name}" is not a supported format. Only .doc, .docx, and .pdf files are allowed.`
          )
        }
      })
    })
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    onDropRejected,
    accept: {
      'image/jpeg': [],
      'image/png': [],
      'image/gif': [],
      'image/webp': []
    },
    maxFiles,
    maxSize: 5 * 1024 * 1024 // Giới hạn 5MB
  })

  return (
    <div>
      <div
        {...getRootProps({
          className: classNames(
            'flex flex-1 h-full w-full h-[194px] flex-col px-3 py-[30px] items-center bg-gray-1 justify-center rounded-xl border transition-colors duration-300',
            isDragActive ? 'border-gray-3' : 'border-gray-2',
            className
          )
        })}
      >
        <input {...getInputProps()} />
        {selectedFiles.length > 0 ? (
          selectedFiles.map((file, index) => (
            <div key={index} className='relative h-full'>
              <img
                src={file.url}
                alt={file.name}
                className='h-full w-full rounded-lg object-cover shadow-md'
              />
            </div>
          ))
        ) : (
          <div className='flex flex-col items-center justify-start text-gray-3'>
            <p className='text-dongle-24 mb-10'>Kéo thả hoặc tải ảnh lên</p>
            <span className='mgc_pic_ai_fill mb-7 scale-[410%]' />
          </div>
        )}
      </div>
      {errorMessage && <div className='mt-2 text-red-500'>{errorMessage}</div>}
    </div>
  )
}

export default UploadFile
