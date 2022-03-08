import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import CircularProgress from '@mui/material/CircularProgress'

import {
  updatePatterns,
} from '../../actions/text'

import { 
  getTextPatterns,
  creatSVGNode,
  embedFont,
} from '../../utils/svgHandler'

import TextPattern from '../text-pattern'
import { IconFont } from '../icons'

import './index.styl'

const DEFAULT_TEXT = '皮耶羅筆刷'
const FONT_SIZES = [16, 18, 20, 22, 24, 28]

const fontFamilyOptions = [
  { value: null, label: '系統字體'}, 
  { value: 'font-seto', label: '瀨戶字體'},
  { value: 'font-jf-openhuninn', label: '粉圓體'},
  { value: 'font-kouzansousho', label: '青柳草書'},
  { value: 'font-aoyagireisho', label: '青柳隷書'},
  { value: 'font-hdzb', label: '篆體'},
]

const fontData = {
  'font-seto': {
    name: 'font-seto',
    url: 'font/sp-setofont.woff',
  },
  'font-jf-openhuninn': {
    name: 'font-jf-openhuninn',
    url: 'font/jf-openhuninn-11.woff',
  },
  'font-hdzb': {
    name: 'font-hdzb',
    url: 'font/zhuanti.woff',
  },
  'font-kouzansousho': {
    name: 'font-kouzansousho',
    url: 'font/KouzanBrushFontSousyo.woff',
  },
  'font-aoyagireisho': {
    name: 'font-aoyagireisho',
    url: 'font/aoyagireisyosimo_ttf_2_01.woff',
  },
}

const TextEditor = ({ onClose }) => {
  const dispatch = useDispatch()

  const [text, setText] = useState(DEFAULT_TEXT)
  const [fontSize, setFontSize] = useState(FONT_SIZES[3])
  const [fontFamily, setFontFamily] = useState(fontFamilyOptions[0])
  const [isConverting, setIsConverting] = useState(false)

  const [patterns, setPatterns] = useState([])

  const convertTextToPattern = async (update = false) => {
    setIsConverting(true)

    const font = fontFamily.value 
      ? await embedFont([fontData[fontFamily.value]])
      : []

    const textString = text.trim().replace(/[\n\r|\n|\r\n|\s]/g, '')
    const newPatterns = await getTextPatterns(textString, fontSize, font)

    setPatterns(newPatterns)
    if (update) {
      dispatch(updatePatterns(newPatterns))      
    }
    setIsConverting(false)
  }

  const handleConfirm = () => {
    dispatch(updatePatterns(patterns))
    onClose()
  }

  const handleCancel = () => {
    onClose()
  }

  useEffect(() => {
    ;(async () => {
      convertTextToPattern(true)
    })()
  }, [])

  return (
    <div className={classNames('text-editor', { 'text-editor--converting': isConverting }) }>
      <div className="text-editor__input-wrap">
        <TextField 
          label="文字區塊"
          value={text}
          className="text-editor__input"
          multiline
          variant="filled"
          rows={2}
          onChange={e => setText(e.currentTarget.value)}
        />
      </div>
      <div className="text-editor__setting-wrap">
        大小:  
        <Select
          labelId="size-select"
          value={fontSize}
          onChange={(e) => setFontSize(e.target.value)}
        >
          {
            FONT_SIZES.map(size => (
              <MenuItem key={size} value={size}>{size}</MenuItem>
            ))
          }
        </Select>
        字型:  
        <Select
          labelId="family-select"
          value={fontFamily}
          onChange={(e) => setFontFamily(e.target.value)}
        >
          {
            fontFamilyOptions.map(font => (
              <MenuItem key={font.label} value={font}>
                <span style={{fontFamily: font.value}}>
                {font.label}
                </span>
              </MenuItem>
            ))
          }
        </Select>
      </div>
      <div className="text-editor__tool-wrap">
        <Button onClick={() => convertTextToPattern()}>
          <IconFont style="convert-img" />轉換點陣圖
        </Button>
      </div>
      <div className="text-editor__pattern-wrap">
        {
          patterns.map((pattern, i) => (
            <TextPattern key={`pattern-${i}`} pattern={pattern} className="text-editor__pattern" />
          ))
        }
      </div>
      <div className="text-editor__tool-wrap">
        <Button onClick={() => handleConfirm()}>
          確認
        </Button>
        <Button onClick={() => handleCancel()}>
          取消
        </Button>
      </div>
      {
        isConverting && <CircularProgress className="text-editor__loader" />
      }
    </div>
  )
}

TextEditor.propTypes = {}

export default TextEditor
