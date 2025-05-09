const loginFormTpl = `
    <form id='form' action="/auth/signin" method="post" class="login__form">
        {{{login}}}
        {{{password}}}
        {{{submitBtn}}}
    </form>
`;

export default loginFormTpl;
