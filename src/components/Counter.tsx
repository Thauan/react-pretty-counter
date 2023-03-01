import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react'
import './counter.css'

type Props = {
  value?: number
  name?: string
  color?: string
}

const Counter = ({ value = 1, name, color = '#F35B04' }: Props, ref: any) => {
  const [counter, setCounter] = useState(value)
  const counterRef = useRef<any>(null)

  useImperativeHandle(ref, () => ({
    increment: () => {
      handleValueChange(counter + 1)
    },
    decrement: () => {
      handleValueChange(counter - 1)
    },
  }))

  const changeValue = ({ newValue }: any) => {
    setCounter(newValue !== 100 ? newValue : 99)
  }

  const handleValueChange = (newValue: any | string | number, isField?: boolean) => {
    newValue = parseInt(newValue, 10)

    if (!newValue) {
      if (isField) {
        newValue = ''
      } else {
        newValue = 1
      }
    }
    if (newValue < 0) {
      newValue = 1
    }

    if (!isField) {
      counterRef.current.style.transform = newValue > counter ? 'translateY(-100%)' : 'translateY(100%)'
      counterRef.current.style.opacity = 0
      setTimeout(function () {
        counterRef.current.style.transitionDuration = '0s'
        counterRef.current.style.transform = newValue > counter ? 'translateY(100%)' : 'translateY(-100%)'
        counterRef.current.style.opacity = 0
        changeValue({ newValue: newValue })
        setTimeout(function () {
          counterRef.current.style.transitionDuration = '0.3s'
          counterRef.current.style.transform = 'translateY(0)'
          counterRef.current.style.opacity = 1
        }, 20)
      }, 250)
    } else {
      changeValue({ newValue: newValue })
    }
  }

  return (
    <div className='counter'>
      <button className='button' style={{ color: color }} onClick={() => handleValueChange(counter - 1)}>
        -
      </button>
      <div className='input-wrapper' style={{ backgroundColor: color }}>
        <input
          className='input'
          maxLength={2}
          name={name}
          type='text'
          value={counter}
          ref={counterRef}
          onChange={(e) => {
            e.preventDefault()
            handleValueChange(e.target.value, true)
          }}
        />
      </div>
      <button className='button' style={{ color: color }} onClick={() => handleValueChange(counter + 1)}>
        +
      </button>
    </div>
  )
}

export default forwardRef(Counter)
