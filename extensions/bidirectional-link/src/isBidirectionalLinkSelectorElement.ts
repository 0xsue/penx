import {
  BidirectionalLinkSelectorElement,
  ELEMENT_BIDIRECTIONAL_LINK_SELECTOR,
} from './types'

export function isBidirectionalLinkSelectorElement(
  node: any,
): node is BidirectionalLinkSelectorElement {
  return node.type === ELEMENT_BIDIRECTIONAL_LINK_SELECTOR
}
