export interface IOptions {
  id: number
  value: string
  label: string
}

export interface IFilterProps {
  filterName: string
  options: IOptions[]
}
