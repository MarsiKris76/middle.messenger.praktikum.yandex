const userItemTpl = `
    <div class='search__user-item{{#if isActive}}{{isActive}}{{/if}}' data-user-id='{{id}}'>
        <strong>{{login}}</strong>
        ({{first_name}} {{second_name}})
        {{{crossIcon}}}
    </div>
`
export default userItemTpl;
