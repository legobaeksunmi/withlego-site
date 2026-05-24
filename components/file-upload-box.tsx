"use client"

import { useState, useRef, useCallback, useEffect } from "react"
import { Upload, X, FileText, Image as ImageIcon, FolderOpen } from "lucide-react"

interface FileUploadBoxProps {
  onFileSelect: (file: File) => void
  onMultiFileSelect?: (files: File[]) => void
  multiple?: boolean
  accept: "image" | "document" | "all"
  isUploading?: boolean
  uploadedFile?: { fileName: string; fileUrl: string } | null
  onRemove?: () => void
  previewUrl?: string | null
  error?: string | null
  success?: boolean
  className?: string
}

// 이미지 전용 (사진 앨범)
const IMAGE_ACCEPT = ".png,.jpg,.jpeg,.webp,.gif"
// 문서/파일 전용 (파일 관리자)
const FILE_ACCEPT = ".pdf,.xlsx,.xls,.docx,.doc,.pptx,.ppt,.hwp,.hwpx,.zip,.txt,.csv"

const ACCEPT_MAP = {
  image: {
    accept: IMAGE_ACCEPT,
    mimeTypes: ["image/png", "image/jpeg", "image/webp", "image/gif"],
    label: "PNG, JPG, JPEG, WebP, GIF"
  },
  document: {
    accept: `${IMAGE_ACCEPT},${FILE_ACCEPT}`,
    mimeTypes: [
      "application/pdf", 
      "image/png", "image/jpeg", "image/webp", "image/gif",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", 
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document", 
      "application/msword",
      "application/vnd.openxmlformats-officedocument.presentationml.presentation", 
      "application/vnd.ms-powerpoint",
      "application/x-hwp", "application/haansofthwp",
      "application/zip", "application/x-zip-compressed",
      "text/plain", "text/csv"
    ],
    label: "이미지, PDF, 문서, 엑셀, ZIP"
  },
  all: {
    accept: "*/*",
    mimeTypes: ["*/*"],
    label: "모든 파일"
  }
}

export function FileUploadBox({
  onFileSelect,
  onMultiFileSelect,
  multiple = false,
  accept,
  isUploading = false,
  uploadedFile,
  onRemove,
  previewUrl,
  error,
  success,
  className = ""
}: FileUploadBoxProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [localError, setLocalError] = useState<string | null>(null)
  const imageInputRef = useRef<HTMLInputElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const dropZoneRef = useRef<HTMLDivElement>(null)

  const acceptConfig = ACCEPT_MAP[accept]

  const validateFile = useCallback((file: File): boolean => {
    setLocalError(null)
    
    // "all" 타입은 모든 파일 허용
    if (accept === "all") {
      if (file.size > 10 * 1024 * 1024) {
        setLocalError("파일 크기는 10MB 이하여야 합니다.")
        return false
      }
      return true
    }
    
    const isValidType = acceptConfig.mimeTypes.some(type => {
      if (type.includes("*")) {
        return file.type.startsWith(type.replace("*", ""))
      }
      return file.type === type || file.name.toLowerCase().endsWith(type.split("/")[1])
    })

    const ext = file.name.toLowerCase().split(".").pop()
    const validExtensions = acceptConfig.accept.split(",").map(e => e.replace(".", ""))
    const isValidExtension = ext ? validExtensions.includes(ext) : false

    if (!isValidType && !isValidExtension) {
      setLocalError(`지원하지 않는 파일 형식입니다. (${acceptConfig.label})`)
      return false
    }

    if (file.size > 10 * 1024 * 1024) {
      setLocalError("파일 크기는 10MB 이하여야 합니다.")
      return false
    }

    return true
  }, [accept, acceptConfig])

  const handleFile = useCallback((file: File) => {
    if (validateFile(file)) {
      onFileSelect(file)
    }
  }, [validateFile, onFileSelect])

  const handleMultiFiles = useCallback((files: File[]) => {
    const validFiles = files.filter(f => validateFile(f))
    if (validFiles.length > 0 && onMultiFileSelect) {
      onMultiFileSelect(validFiles)
    } else if (validFiles.length > 0) {
      // Fallback to single file
      onFileSelect(validFiles[0])
    }
  }, [validateFile, onMultiFileSelect, onFileSelect])

  // 이미지 선택 (사진 앨범)
  const handleImageClick = () => {
    if (!isUploading && imageInputRef.current) {
      imageInputRef.current.click()
    }
  }

  // 파일 선택 (파일 관리자)
  const handleFileClick = () => {
    if (!isUploading && fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return
    
    if (multiple && files.length > 0) {
      handleMultiFiles(Array.from(files))
    } else {
      handleFile(files[0])
    }
    e.target.value = ""
  }

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (dropZoneRef.current && !dropZoneRef.current.contains(e.relatedTarget as Node)) {
      setIsDragging(false)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
    
    const files = e.dataTransfer.files
    if (!files || files.length === 0) return

    if (multiple && files.length > 0) {
      handleMultiFiles(Array.from(files))
    } else {
      handleFile(files[0])
    }
  }

  const handlePaste = useCallback((e: ClipboardEvent | React.ClipboardEvent) => {
    const clipboardData = 'clipboardData' in e ? e.clipboardData : (e as ClipboardEvent).clipboardData
    const items = clipboardData?.items
    if (!items) return

    const pastedFiles: File[] = []
    for (let i = 0; i < items.length; i++) {
      const item = items[i]
      if (item.kind === "file") {
        const file = item.getAsFile()
        if (file) pastedFiles.push(file)
      }
    }

    if (pastedFiles.length === 0) return
    
    e.preventDefault()

    if (multiple && pastedFiles.length > 0) {
      handleMultiFiles(pastedFiles)
    } else {
      handleFile(pastedFiles[0])
    }
  }, [multiple, handleFile, handleMultiFiles])

  // 전역 붙여넣기 이벤트 핸들러 (포커스 없이도 동작)
  useEffect(() => {
    const globalPasteHandler = (e: ClipboardEvent) => {
      // 입력 필드에 포커스가 있으면 무시
      const activeElement = document.activeElement
      if (activeElement && (activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA')) {
        return
      }
      handlePaste(e)
    }

    document.addEventListener('paste', globalPasteHandler)
    return () => document.removeEventListener('paste', globalPasteHandler)
  }, [handlePaste])

  // If there's a preview image (logo)
  if (previewUrl) {
    return (
      <div className={`relative ${className}`}>
        <div className="relative rounded-xl border-2 border-rose-200 p-4 bg-white">
          <img 
            src={previewUrl} 
            alt="Preview" 
            className="block h-16 w-auto mx-auto object-contain"
            style={{ display: "block" }}
          />
          {onRemove && (
            <button
              type="button"
              onClick={onRemove}
              className="absolute top-2 right-2 p-1 bg-rose-100 rounded-full hover:bg-rose-200 text-rose-500"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    )
  }

  // If there's an uploaded file (document) - single file display
  if (uploadedFile) {
    const isImage = /\.(jpg|jpeg|png|webp|gif)$/i.test(uploadedFile.fileName)
    return (
      <div className={`relative ${className}`}>
        <div className="flex items-center justify-between p-3 rounded-xl bg-rose-50 border border-rose-200">
          <div className="flex items-center gap-2 min-w-0">
            {isImage ? (
              <ImageIcon className="h-4 w-4 text-rose-400 shrink-0" />
            ) : (
              <FileText className="h-4 w-4 text-rose-400 shrink-0" />
            )}
            <span className="text-sm text-gray-700 truncate">{uploadedFile.fileName}</span>
          </div>
          {onRemove && (
            <button
              type="button"
              onClick={onRemove}
              className="p-1 hover:bg-rose-100 rounded-full text-gray-400 hover:text-rose-500 shrink-0"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        {success && !error && (
          <p className="mt-2 text-xs text-green-600">파일 업로드 완료</p>
        )}
      </div>
    )
  }

  const displayError = error || localError
  const showDualButtons = accept === "document" || accept === "all"

  return (
    <div className={className}>
      <div
        ref={dropZoneRef}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onPaste={handlePaste}
        tabIndex={0}
        className={`
          flex flex-col items-center justify-center gap-3 p-6 rounded-xl 
          border-2 border-dashed transition-all
          focus:outline-none focus:ring-2 focus:ring-rose-300
          ${isDragging 
            ? "border-rose-400 bg-rose-50" 
            : "border-rose-200 bg-white"
          }
          ${isUploading ? "opacity-50 cursor-not-allowed" : ""}
        `}
      >
        {isUploading ? (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-rose-300 border-t-rose-500 rounded-full animate-spin" />
            <span className="text-sm text-gray-500">업로드 중...</span>
          </div>
        ) : (
          <>
            <Upload className="h-6 w-6 text-gray-400" />
            <span className="text-sm text-gray-500 text-center">
              드래그 / Ctrl+V 또는 아래 버튼 선택
            </span>
            
            {showDualButtons ? (
              <div className="flex gap-2 w-full">
                <button
                  type="button"
                  onClick={handleImageClick}
                  disabled={isUploading}
                  className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 text-sm font-medium transition-colors border border-rose-200"
                >
                  <ImageIcon className="h-4 w-4" />
                  사진 선택
                </button>
                <button
                  type="button"
                  onClick={handleFileClick}
                  disabled={isUploading}
                  className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg bg-gray-50 hover:bg-gray-100 text-gray-700 text-sm font-medium transition-colors border border-gray-200"
                >
                  <FolderOpen className="h-4 w-4" />
                  파일 선택
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={handleImageClick}
                disabled={isUploading}
                className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 text-sm font-medium transition-colors border border-rose-200"
              >
                <ImageIcon className="h-4 w-4" />
                이미지 선택
              </button>
            )}
            
            <span className="text-xs text-gray-400">{acceptConfig.label}</span>
          </>
        )}
        
        {/* 이미지 전용 input (사진 앨범에서 선택) */}
        <input
          ref={imageInputRef}
          type="file"
          className="hidden"
          onChange={handleInputChange}
          disabled={isUploading}
          accept={accept === "image" ? IMAGE_ACCEPT : `${IMAGE_ACCEPT}`}
          multiple={multiple}
        />
        
        {/* 파일 전용 input (파일 관리자에서 선택) - capture 없음 */}
        {showDualButtons && (
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            onChange={handleInputChange}
            disabled={isUploading}
            accept={FILE_ACCEPT}
            multiple={multiple}
          />
        )}
      </div>
      {displayError && (
        <p className="mt-2 text-xs text-red-500">{displayError}</p>
      )}
    </div>
  )
}
