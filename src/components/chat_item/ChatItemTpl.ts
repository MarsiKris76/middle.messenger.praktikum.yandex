const chatItemTpl = `
    <div {{#if id}} id='{{id}}'{{/if}} class='chat-item'>
        <div class='chat-item__content'>
            {{{deleteChat}}}
            {{{addUser}}}
            <div class='chat-item__text'>
                <div title='{{name}}' class='chat-item__name'>
                    {{name}}
                </div>
                <div title='{{text}}' class='chat-item__preview'>
                    {{text}}
                </div>
            </div>
        </div>
    </div>
`;

export default chatItemTpl;
