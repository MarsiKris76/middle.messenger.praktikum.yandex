const loginFormTpl = `
    <form action="/auth/signin" method="post" class="login__form">
        <section class="registration__inputs_row">
            {{{ login }}}
        </section>
        <section class="registration__inputs_row">
            {{{ password }}}
        </section>
        <section class="login__submit">
            {{{ submitBtn }}}
        </section>
    </form>
`;

export default loginFormTpl;