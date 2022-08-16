import { Address, BigInt, store, Bytes } from "@graphprotocol/graph-ts"
import {
  CollectionFound as CollectionFoundEvent,
  ItemBought as ItemBoughtEvent,
  ItemListed as ItemListedEvent,
  ItemRemoved as ItemRemovedEvent
} from "../generated/NFTMarketplace/NFTMarketplace"
import {ActiveItem, ItemBought, ItemListed, ItemRemoved, CollectionFound} from "../generated/schema"



export function handleCollectionFound(event: CollectionFoundEvent): void {
  let collectionFound = CollectionFound.load(getIdForCollection(event.params.nftAddress_))
  if(!collectionFound){
    collectionFound = new CollectionFound(getIdForCollection(event.params.nftAddress_))

    collectionFound.name = event.params.name_
    collectionFound.symbol = event.params.symbol_
    collectionFound.nftAddress = event.params.nftAddress_
    collectionFound.createdAt = event.block.timestamp

    collectionFound.save()
  }
}

export function handleItemListed(event: ItemListedEvent): void {
  let itemListed = ItemListed.load(getIdFromParams(event.params.tokenId_, event.params.nftAddress_))
  let activeItem = ActiveItem.load(getIdFromParams(event.params.tokenId_, event.params.nftAddress_))

  if(!itemListed){
    itemListed = new ItemListed(getIdFromParams(event.params.tokenId_, event.params.nftAddress_))
  }
  // v activeitem document will not exist if respective itemlisted document doesnt exist
  if(!activeItem){
    activeItem = new ActiveItem(getIdFromParams(event.params.tokenId_, event.params.nftAddress_))
  }
  
  // v populating the fields with their values
  itemListed.seller = event.params.seller_
  activeItem.seller = event.params.seller_

  itemListed.nftAddress = event.params.nftAddress_
  activeItem.nftAddress = event.params.nftAddress_

  itemListed.tokenId = event.params.tokenId_
  activeItem.tokenId = event.params.tokenId_

  itemListed.price = event.params.price_
  activeItem.price = event.params.price_

  itemListed.createdAt = event.block.timestamp
  activeItem.createdAt = event.block.timestamp

  itemListed.save()
  activeItem.save()


}

export function handleItemBought(event: ItemBoughtEvent): void {
  // save the event in our graph update activeitem table
  // get itembought object
  // we have to make an id for each event we'd with getIdfromparams()
  let itemBought = ItemBought.load(getIdFromParams(event.params.tokenId_, event.params.nftAddress_)) // we load an object using its id
  let activeItem = ActiveItem.load(getIdFromParams(event.params.tokenId_, event.params.nftAddress_))
  if(!itemBought){
    itemBought = new ItemBought(getIdFromParams(event.params.tokenId_, event.params.nftAddress_)) // new document from the 
  }
  // v populating the fields with their values
  itemBought.buyer = event.params.buyer_
  itemBought.nftAddress = event.params.nftAddress_
  itemBought.tokenId = event.params.tokenId_
  itemBought.createdAt = event.block.timestamp
  itemBought.price = event.params.price_

  let id = getIdFromParams(event.params.tokenId_, event.params.nftAddress_)  
  store.remove("ActiveItem", id)
  
  itemBought.save()
}

export function handleItemRemoved(event: ItemRemovedEvent): void {
  let itemRemoved = ItemRemoved.load(getIdFromParams(event.params.tokenId_, event.params.nftAddress_))
  let activeItem = ActiveItem.load(getIdFromParams(event.params.tokenId_, event.params.nftAddress_))
  if(!itemRemoved){
    itemRemoved = new ItemRemoved(getIdFromParams(event.params.tokenId_, event.params.nftAddress_))
  }

  itemRemoved.seller = event.params.seller_
  itemRemoved.nftAddress = event.params.nftAddress_
  itemRemoved.tokenId = event.params.tokenId_
  // v for an ItemRemoved its corresponding activeItem will already exist
  let id = getIdFromParams(event.params.tokenId_, event.params.nftAddress_)  
  store.remove("ActiveItem", id)

  itemRemoved.save()
}

function getIdFromParams(tokenId: BigInt, nftAddress: Address): string {
  // ^ params are declared with their type and string is the return type
  return tokenId.toHexString() + nftAddress.toHexString()
  // ^ that's how we make our id
}

function getIdForCollection(nftAddress: Address): string {
  return nftAddress.toHexString()
}
