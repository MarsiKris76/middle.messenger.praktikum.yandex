const messengerPageTpl = `
    {{{toolPanel}}}
    {{{chatList}}}
    <div class='messenger__chat-content'>
        <div class='messenger__message-feed'>
            Выбери чат, что бы начать переписку.
        </div>
        {{{messageForm}}}
    </div>
`;

export default messengerPageTpl;
