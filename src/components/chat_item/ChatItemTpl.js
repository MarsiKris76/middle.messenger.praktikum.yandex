const chatItemTpl = `
    <div class='chat-item'>
        <div class='chat-item__content'>
            {{{avatar}}}
            <div class='chat-item__text'>
                <div class='chat-item__name'>
                    {{name}}
                </div>
                <div class='chat-item__preview'>
                    {{text}}
                </div>
            </div>
        </div>
    </div>
`;

export default chatItemTpl;