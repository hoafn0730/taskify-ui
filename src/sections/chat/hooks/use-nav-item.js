// ----------------------------------------------------------------------

export function useNavItem({ currentUserId, conversation }) {
    const { messages, participants, type } = conversation;

    const participantsInConversation = participants.filter((participant) => participant.userId !== currentUserId);

    const lastMessage = messages[messages.length - 1];

    const group = participantsInConversation.length > 1 && type === 'group';

    const displayName = participantsInConversation.map((participant) => participant.displayName).join(', ');

    const hasOnlineInGroup = group ? participantsInConversation.map((item) => item.status).includes('online') : false;

    let displayText = '';

    if (lastMessage) {
        const sender = lastMessage.senderId === currentUserId ? 'You: ' : '';

        const message = lastMessage.contentType === 'image' ? 'Sent a photo' : lastMessage.content;

        displayText = `${sender}${message}`;
    }

    return {
        group,
        displayName,
        displayText,
        participants: participantsInConversation,
        lastActivity: lastMessage?.createdAt,
        hasOnlineInGroup,
    };
}
