class HeaderManager {
  constructor(currentPath, menuItems) {
    this.currentPath = currentPath
    this.menuItems = menuItems
    this.init()
  }

  decodeToken(token) {
    const base64Url = token.split('.')[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
        })
        .join('')
    )
    return JSON.parse(jsonPayload)
  }

  getBasePath() {
    const depth = (this.currentPath.match(/\//g) || []).length
    return depth ? '../'.repeat(depth) : ''
  }

  createMenuItem(item, basePath) {
    const li = document.createElement('li')
    li.className = 'header__item'

    if (item.id) li.id = item.id

    const a = document.createElement('a')
    a.className = 'header__link'
    a.href = basePath + item.href
    a.textContent = item.text

    if (item.href === this.currentPath) a.classList.add('active')

    li.appendChild(a)
    return li
  }

  createHeader() {
    const basePath = this.getBasePath()
    const header = document.createElement('header')
    header.className = 'header'

    const nav = document.createElement('nav')
    nav.className = 'header__nav'
    const ul = document.createElement('ul')
    ul.className = 'header__list'

    this.menuItems.forEach(item => {
      if (!item.meta.requireAuth || RequestManager.isAuthenticated()) {
        const li = this.createMenuItem(item, basePath)
        ul.appendChild(li)
      }
    })

    nav.appendChild(ul)
    header.appendChild(nav)
    document.body.insertBefore(header, document.body.firstChild)

    const token = localStorage.getItem('jwt_token')
    const userLink = document.getElementById('users-link')
    const authLink = document.getElementById('auth-link')
    const signupLink = document.getElementById('signup-link')

    if (token) {
      const user = this.decodeToken(token)

      if (user) {
        signupLink.style.display = 'none'
        userLink.style.display = 'block'
        authLink.innerHTML = `<a href="#" class="header__link" id="logout-link">Logout (${user.username})</a>`
      }
    }

    document.getElementById('auth-link').addEventListener('click', async event => {
      if (event.target.id === 'logout-link') {
        event.preventDefault()
        await RequestManager.onLogout()
        localStorage.removeItem('jwt_token')
        location.reload()
      }
    })
  }

  init() {
    this.createHeader()
  }
}
