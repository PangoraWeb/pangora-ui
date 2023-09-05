import { Card, Input as InputBase } from '@nextui-org/react'

export default function Input({
  endContent,
  type,
  label,
  isRequired,
  isClearable,
  labelPlacement,
  placeholder,
  size,
  startContent,
}: {
  endContent?: React.ReactElement
  startContent?: React.ReactElement
  type?: string
  label?: string
  isRequired?: boolean
  isClearable?: boolean
  labelPlacement?: 'outside' | 'outside-left' | 'inside'
  placeholder?: string
  size?: 'sm' | 'md' | 'lg'
}) {
  return (
    <Card isBlurred>
      <InputBase
        type={type}
        label={label}
        isRequired={isRequired}
        endContent={endContent}
        classNames={{
          inputWrapper: '!bg-opacity-0',
        }}
        isClearable={isClearable}
        labelPlacement={labelPlacement}
        placeholder={placeholder}
        size={size}
        startContent={startContent}
      />
    </Card>
  )
}

/*
import {
  Card,
  Input as InputBase,
  forwardRef,
  useInput,
} from '@nextui-org/react'
import { useMemo } from 'react'

export default function Input({
  endContent,
  type,
  label,
  isRequired,
  isClearable,
  labelPlacement,
  placeholder,
  size,
  startContent,
}: {
  endContent?: React.ReactElement
  startContent?: React.ReactElement
  type?: string
  label?: string
  isRequired?: boolean
  isClearable?: boolean
  labelPlacement?: 'outside' | 'outside-left' | 'inside'
  placeholder?: string
  size?: 'sm' | 'md' | 'lg'
}) {
  return (
    <Card isBlurred>
      <InputBase
        type={type}
        label={label}
        isRequired={isRequired}
        endContent={endContent}
        className="bg-transparent !data-[focus=true]:bg-transparent !data-[hover=true]:bg-transparent"
        classNames={{
          errorMessage:
            'bg-transparent !data-[focus=true]:bg-transparent !data-[hover=true]:bg-transparent',
          clearButton:
            'bg-transparent !data-[focus=true]:bg-transparent !data-[hover=true]:bg-transparent',
          base: 'bg-transparent !data-[focus=true]:bg-transparent !data-[hover=true]:bg-transparent',
          mainWrapper:
            'bg-transparent !data-[focus=true]:bg-transparent !data-[hover=true]:bg-transparent',
          innerWrapper:
            'bg-transparent !data-[focus=true]:bg-transparent !data-[hover=true]:bg-transparent',
          input:
            'bg-transparent !data-[focus=true]:bg-transparent !data-[hover=true]:bg-transparent',
          description:
            'bg-transparent !data-[focus=true]:bg-transparent !data-[hover=true]:bg-transparent',
          helperWrapper:
            'bg-transparent !data-[focus=true]:bg-transparent !data-[hover=true]:bg-transparent',
          label:
            'bg-transparent !data-[focus=true]:bg-transparent !data-[hover=true]:bg-transparent',
          inputWrapper:
            'bg-transparent !data-[hover=true]:bg-transparent !data-[focus=true]:bg-transparent',
        }}
        isClearable={isClearable}
        labelPlacement={labelPlacement}
        placeholder={placeholder}
        size={size}
        startContent={startContent}
      />
    </Card>
  )
}
*/
