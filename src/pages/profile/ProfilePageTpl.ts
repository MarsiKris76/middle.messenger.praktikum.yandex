const profilePageTpl = `
    <div class='avatar__form'>
        {{{avatar}}}
        {{{avatarSelectBtn}}} <!--в дальнейшем нужно будет связать кнопку с инпутом-->
        {{{avatarInput}}}
    </div>
    <hr class='divider'>
    {{{changePasswordForm}}}
    <hr class='divider'>
    {{{changeProfileForm}}}
`

export default profilePageTpl;