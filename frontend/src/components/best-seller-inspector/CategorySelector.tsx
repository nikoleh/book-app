import { useState } from 'react'
import { BookCategory } from '@book-app-types'
import { InputLabel, MenuItem, FormControl, Select } from '@mui/material'

interface Props {
  categories: BookCategory[],
  onSelect: (categoryId: string) => void
}

export const CategorySelector = (props: Props) => {
  const [selected, setSelected] = useState<string>('')
  const { categories, onSelect } = props

  const handleSelect = (categoryId: string) => {
    setSelected(categoryId)
    onSelect(categoryId)
  }

  return (
    <FormControl variant='standard' sx={{ minWidth: 200 }}>
      <InputLabel id='category-select-label'>
          Choose category
      </InputLabel>
      <Select 
        id='category-select'
        labelId='category-select-label'
        value={selected}
        onChange={event => {
          if (event.target && typeof event.target.value === 'string')
            handleSelect(event.target.value)
        }}>
        {categories.map((category, index) => (
          <MenuItem
            key={`category-${index}`}
            value={category.id}>
            {category.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl> 
  )
}

