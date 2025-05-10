const changePasswordForm = `
    <form action='/user/password' method='post' class='change_password__form'>
        <section class='change_password__inputs_row'>
            {{{newPassword}}}
            {{{re_newPassword}}}
        </section>
        <section class='change_password__inputs_row'>
            {{{oldPassword}}}
            <div class='change_password__submit'>
                {{{submitBtn}}}
            </div>
        </section>
    </form>
`;

export default changePasswordForm;
