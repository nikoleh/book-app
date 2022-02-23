
import { BookCategory } from '@book-app-types'
import { InputLabel, MenuItem, FormControl, Select } from '@mui/material'

interface Props {
  categories: BookCategory[],
  onSelect: (categoryId: string) => void
}

export const CategorySelector = (props: Props) => {
  const { categories, onSelect } = props
  return (
    <FormControl variant='standard' sx={{ minWidth: 200 }}>
      <InputLabel id='category-select-label'>
          Choose category
      </InputLabel>
      <Select 
        id='category-select'
        labelId='category-select-label'
        onChange={event => {
          if (event.target && typeof event.target.value === 'string')
            onSelect(event.target.value)
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

