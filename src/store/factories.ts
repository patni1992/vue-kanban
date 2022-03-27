const cardFactory = ({ name, listId, cardsInList }: CreateCard): Card => {
  const currentDate = new Date()
  return {
    name,
    listId,
    id: currentDate.getMilliseconds(),
    createdAt: currentDate.toString(),
    updatedAt: currentDate.toString(),
    order: cardsInList.length ? cardsInList[cardsInList.length - 1].order : 0,
  }
}

export { cardFactory }
