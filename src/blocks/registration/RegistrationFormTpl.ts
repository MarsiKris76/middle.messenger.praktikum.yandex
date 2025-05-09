const registrationFormTpl = `
    <form action='/auth/signup' method='post' class='registration__form'>
        <section class='registration__inputs_row'>
            {{{login}}}
        </section>
        <section class='registration__inputs_row'>
            {{{password}}}
            {{{re_password}}}
        </section>
        <section class='registration__inputs_row'>
            {{{first_name}}}
            {{{second_name}}}
        </section>
        <section class='registration__inputs_row'>
            {{{email}}}
            {{{phone}}}
        </section>
        <section class='registration__submit'>
            {{{submitBtn}}}
        </section>
    </form>
`;

export default registrationFormTpl;