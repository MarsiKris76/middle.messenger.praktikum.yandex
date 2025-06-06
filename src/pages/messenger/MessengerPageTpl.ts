const messengerPageTpl = `
    {{{toolPanel}}}
    {{{chatList}}}
    <div class='messenger__chat-content'>
        <div class='messenger__message-feed'>
            {{{messages}}}
        </div>
        {{{messageForm}}}
    </div>
`;

export default messengerPageTpl;
