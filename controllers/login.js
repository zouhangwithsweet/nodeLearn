async (ctx, next) => {
    let mail = ctx.request.body.email || ''
    let password = ctx.request.body.password || ''

    if (email === 'admin@example.com' && password === '123456') {
        ctx.render('signin-ok.html', {
            title: 'Sign in ok',
            name: 'Mr Node'
        })
    } else {
        ctx.render('signin-failed.html', {
            title: 'Sign in failed'
        })
    }
}
