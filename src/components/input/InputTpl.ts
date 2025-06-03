const inputTpl = `
    <input type='{{type}}'
           name='{{name}}'
           {{#if accept}} accept='{{accept}}'{{/if}}
           {{#if placeholder}} placeholder='{{placeholder}}'{{/if}}
           class='input_base {{classes}}'
           {{#if value}} value='{{value}}'{{/if}}
           {{#if id}} id='{{id}}'{{/if}}>
`;

export default inputTpl;
