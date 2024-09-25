export const capitalizeFirstLetter = (val) => {
    if (!val) return '';
    return `${val.charAt(0).toUpperCase()}${val.slice(1)}`;
};

export const generatePlaceholderCard = (column) => {
    return {
        id: `${column.id}-placeholder-card`,
        uuid: `${column.id}-placeholder-card`,
        boardId: column.boardId,
        columnId: column.id,
        archived: false,
        FE_PlaceholderCard: true,
    };
};
