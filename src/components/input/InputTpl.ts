const inputTpl = `
    <input type='{{type}}'
           name='{{name}}'
           {{#if accept}} accept='{{accept}}'{{/if}}
           {{#if placeholder}} placeholder='{{placeholder}}'{{/if}}
           class='input_base {{classes}}'>
`;

export default inputTpl;
