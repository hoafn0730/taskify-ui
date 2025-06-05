// ----------------------------------------------------------------------

export function useMessage({ message, participants, currentUserId }) {
    const sender = participants?.find((participant) => participant.id === message.senderId);

    const senderDetails =
        message.senderId === currentUserId
            ? { type: 'me' }
            : { avatar: sender?.avatar, displayName: sender?.displayName.split(' ')[0] };

    const me = senderDetails.type === 'me';

    const hasImage = message.contentType === 'image';

    return { hasImage, me, senderDetails };
}
