import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  CollectionFound,
  ItemBought,
  ItemListed,
  ItemRemoved
} from "../generated/NFTMarketplace/NFTMarketplace"

export function createCollectionFoundEvent(
  name_: string,
  symbol_: string,
  nftAddress_: Address
): CollectionFound {
  let collectionFoundEvent = changetype<CollectionFound>(newMockEvent())

  collectionFoundEvent.parameters = new Array()

  collectionFoundEvent.parameters.push(
    new ethereum.EventParam("name_", ethereum.Value.fromString(name_))
  )
  collectionFoundEvent.parameters.push(
    new ethereum.EventParam("symbol_", ethereum.Value.fromString(symbol_))
  )
  collectionFoundEvent.parameters.push(
    new ethereum.EventParam(
      "nftAddress_",
      ethereum.Value.fromAddress(nftAddress_)
    )
  )

  return collectionFoundEvent
}

export function createItemBoughtEvent(
  buyer_: Address,
  nftAddress_: Address,
  tokenId_: BigInt,
  price_: BigInt
): ItemBought {
  let itemBoughtEvent = changetype<ItemBought>(newMockEvent())

  itemBoughtEvent.parameters = new Array()

  itemBoughtEvent.parameters.push(
    new ethereum.EventParam("buyer_", ethereum.Value.fromAddress(buyer_))
  )
  itemBoughtEvent.parameters.push(
    new ethereum.EventParam(
      "nftAddress_",
      ethereum.Value.fromAddress(nftAddress_)
    )
  )
  itemBoughtEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId_",
      ethereum.Value.fromUnsignedBigInt(tokenId_)
    )
  )
  itemBoughtEvent.parameters.push(
    new ethereum.EventParam("price_", ethereum.Value.fromUnsignedBigInt(price_))
  )

  return itemBoughtEvent
}

export function createItemListedEvent(
  seller_: Address,
  nftAddress_: Address,
  tokenId_: BigInt,
  price_: BigInt
): ItemListed {
  let itemListedEvent = changetype<ItemListed>(newMockEvent())

  itemListedEvent.parameters = new Array()

  itemListedEvent.parameters.push(
    new ethereum.EventParam("seller_", ethereum.Value.fromAddress(seller_))
  )
  itemListedEvent.parameters.push(
    new ethereum.EventParam(
      "nftAddress_",
      ethereum.Value.fromAddress(nftAddress_)
    )
  )
  itemListedEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId_",
      ethereum.Value.fromUnsignedBigInt(tokenId_)
    )
  )
  itemListedEvent.parameters.push(
    new ethereum.EventParam("price_", ethereum.Value.fromUnsignedBigInt(price_))
  )

  return itemListedEvent
}

export function createItemRemovedEvent(
  seller_: Address,
  nftAddress_: Address,
  tokenId_: BigInt
): ItemRemoved {
  let itemRemovedEvent = changetype<ItemRemoved>(newMockEvent())

  itemRemovedEvent.parameters = new Array()

  itemRemovedEvent.parameters.push(
    new ethereum.EventParam("seller_", ethereum.Value.fromAddress(seller_))
  )
  itemRemovedEvent.parameters.push(
    new ethereum.EventParam(
      "nftAddress_",
      ethereum.Value.fromAddress(nftAddress_)
    )
  )
  itemRemovedEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId_",
      ethereum.Value.fromUnsignedBigInt(tokenId_)
    )
  )

  return itemRemovedEvent
}
