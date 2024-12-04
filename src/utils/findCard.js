const findCard = (card, board) => {
    const column = board.columns.find((col) => col.id === card.columnId);

    return column.cards.find((c) => c.id === card.id);
};

export default findCard;
