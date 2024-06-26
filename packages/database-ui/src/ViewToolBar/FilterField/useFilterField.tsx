import { useState } from 'react'
import { useDatabaseContext } from '@penx/database-context'
import {
  ConjunctionType,
  Filter,
  OperatorType,
} from '@penx/model-types/src/interfaces/INode'

export function useFilterField() {
  const { currentView, columns } = useDatabaseContext()
  const [filters, setFilters] = useState<Filter[]>([])

  const { filters: filtersDb = [], viewColumns = [] } = currentView.props

  const deleteFilter = (columnId: string) => {
    setFilters(filters.filter((s) => s.columnId !== columnId))
  }

  const addFilter = () => {
    const viewColumn = viewColumns.find(
      (c) => !filters.map((i) => i.columnId).includes(c.columnId),
    )!

    if (viewColumn) {
      const column = viewColumns.find((c) => c.columnId === viewColumn.columnId)
      if (column) {
        setFilters([
          ...filters,
          {
            operator: OperatorType.EQUAL,
            columnId: column.columnId,
            conjunction: ConjunctionType.AND,
            value: '',
          },
        ])
      }
    }
  }

  const updateFilter = (
    columnId: string,
    newColumnId: string,
    props?: Partial<Filter>,
  ) => {
    const filterIndex = filters.findIndex((item) => item.columnId === columnId)
    if (filterIndex >= 0) {
      filters[filterIndex] = {
        ...filters[filterIndex],
        columnId: newColumnId,
        ...props,
      } as Filter
    }

    setFilters([...filters])
  }

  return {
    filters,
    filtersDb,
    columns,
    viewColumns,
    currentView,
    setFilters,
    deleteFilter,
    addFilter,
    updateFilter,
  }
}
