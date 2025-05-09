const changeProfileFormTpl = `
    <form action='/user/profile' method='post' class='change_profile__form'>
        <section class='change_profile__inputs_row'>
            {{{login}}}
            {{{display_name}}}
        </section>
        <section class='change_profile__inputs_row'>
            {{{first_name}}}
            {{{second_name}}}
        </section>
        <section class='change_profile__inputs_row'>
            {{{email}}}
            {{{phone}}}
        </section>
        <section class='change_profile__submit'>
            {{{submitBtn}}}
        </section>
    </form>
`;
export default changeProfileFormTpl;
