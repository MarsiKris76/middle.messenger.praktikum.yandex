const messageTpl = `
    <div class="message-feed__message {{getMessageDirection isIncoming}}">
        {{text}}
    </div>
`;

export default messageTpl;