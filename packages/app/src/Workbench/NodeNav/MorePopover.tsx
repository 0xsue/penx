import { Box } from '@fower/react'
import { LogOut, MoreHorizontal, StarOff, Trash2 } from 'lucide-react'
import {
  Button,
  MenuItem,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from 'uikit'
import { useActiveSpace } from '@penx/hooks'
import { store } from '@penx/store'

export const MorePopover = () => {
  const { activeSpace } = useActiveSpace()
  return (
    <Popover placement="bottom-end">
      <PopoverTrigger asChild>
        <Button size="sm" variant="ghost" colorScheme="gray500" isSquare>
          <MoreHorizontal />
        </Button>
      </PopoverTrigger>
      <PopoverContent w-260 column>
        {/* <MenuItem gap2 onClick={async () => {}}>
          <StarOff size={18} />
          <Box>Remove from Favorites</Box>
        </MenuItem>

        <MenuItem gap2 onClick={async () => {}}>
          <LogOut size={18} />
          <Box>Export</Box>
        </MenuItem> */}

        <MenuItem
          gap2
          onClick={async () => {
            const [node] = store.node.getActiveNodes()
            if (activeSpace.isOutliner) {
              store.node.deleteNode(node.id)
            } else {
              store.catalogue.deleteNode(node.id)
            }
          }}
        >
          <Trash2 size={18} />
          <Box>Delete node</Box>
        </MenuItem>
      </PopoverContent>
    </Popover>
  )
}
