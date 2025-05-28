const messengerPageTpl = `
    {{{toolPanel}}}
    <div class='messenger__chat-list'>
        {{{chatItems}}}
    </div>
    <div class='messenger__chat-content'>
        <div class='messenger__message-feed'>
            {{{messages}}}
        </div>
        {{{messageForm}}}
    </div>
`;

export default messengerPageTpl;
