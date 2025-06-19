const messageTpl = `
    <div class="message-feed__message {{getMessageDirection isOutgoing}}">
        {{text}}
    </div>
`;

export default messageTpl;
