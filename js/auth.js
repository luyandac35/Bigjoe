window.BJ = window.BJ || {}

BJ.getCart = function () {
    return JSON.parse(localStorage.getItem('bigJoeCart') || '[]')
}

BJ.saveCart = function (cart) {
    localStorage.setItem('bigJoeCart', JSON.stringify(cart))
    BJ.initNav()
}

BJ.cartCount = function () {
    return BJ.getCart().reduce(function (sum, item) {
        return sum + Number(item.qty || 0)
    }, 0)
}

window.addToCart = function (name, price, itemId) {
    var cart = BJ.getCart()

    var existing = cart.find(function (item) {
        return item.itemId === itemId
    })

    if (existing) {
        existing.qty += 1
    } else {
        cart.push({
            name: name,
            price: Number(price),
            qty: 1,
            itemId: itemId
        })
    }

    BJ.saveCart(cart)
    BJ.showToast(name + ' added to cart!')
}

BJ.showToast = function (message, type) {
    var old = document.getElementById('toast')
    if (old) old.remove()

    var toast = document.createElement('div')
    toast.id = 'toast'
    toast.textContent = message
    toast.style.position = 'fixed'
    toast.style.bottom = '25px'
    toast.style.right = '25px'
    toast.style.padding = '14px 20px'
    toast.style.borderRadius = '8px'
    toast.style.color = 'white'
    toast.style.fontWeight = 'bold'
    toast.style.zIndex = '9999'
    toast.style.boxShadow = '0 8px 20px rgba(0,0,0,.2)'
    toast.style.background = type === 'error' ? '#c8102e' : '#28a745'

    document.body.appendChild(toast)

    setTimeout(function () {
        toast.remove()
    }, 3000)
}

BJ.statusBadge = function (status) {
    var colors = {
        pending: '#ffc107',
        confirmed: '#2196f3',
        preparing: '#ff9800',
        ready: '#28a745',
        done: '#198754',
        collected: '#6f42c1',
        delivered: '#28a745',
        cancelled: '#dc3545'
    }

    var color = colors[status] || '#777'
    status = status || 'pending'

    return '<span class="badge" style="background:' + color + '">' +
        status.charAt(0).toUpperCase() + status.slice(1) +
        '</span>'
}

BJ.getProfile = async function () {
    if (typeof _db === 'undefined') return null

    var userResult = await _db.auth.getUser()
    var user = userResult.data.user

    if (!user) return null

    var profileResult = await _db
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

    if (profileResult.error) return null

    var profile = profileResult.data
    profile.user = user

    return profile
}

BJ.requireAdmin = async function () {
    var profile = await BJ.getProfile()

    if (!profile) {
        window.location.href = 'login.html'
        return null
    }

    if (profile.role !== 'admin') {
        if (profile.role === 'staff') {
            window.location.href = 'kitchen.html'
        } else {
            window.location.href = 'index.html'
        }
        return null
    }

    return profile
}

BJ.requireStaffOrAdmin = async function () {
    var profile = await BJ.getProfile()

    if (!profile) {
        window.location.href = 'login.html'
        return null
    }

    if (profile.role !== 'admin' && profile.role !== 'staff') {
        window.location.href = 'index.html'
        return null
    }

    return profile
}

BJ.logout = async function () {
    await _db.auth.signOut()
    window.location.href = 'index.html'
}

BJ.getRoleTabs = function (role, active) {
    if (role === 'admin') {
        return '' +
            '<a href="dashboard.html" class="' + (active === 'dashboard' ? 'active' : '') + '">📊 Dashboard</a>' +
            '<a href="kitchen.html" class="' + (active === 'kitchen' ? 'active' : '') + '">👨‍🍳 Kitchen</a>' +
            '<a href="products.html" class="' + (active === 'products' ? 'active' : '') + '">🍔 Products</a>' +
            '<a href="inventory.html" class="' + (active === 'inventory' ? 'active' : '') + '">📦 Inventory</a>' +
            '<a href="customers.html" class="' + (active === 'customers' ? 'active' : '') + '">👥 current user</a>' +
            '<a href="reports.html" class="' + (active === 'reports' ? 'active' : '') + '">📈 Reports</a>' +
            '<a href="ai.html" class="' + (active === 'ai' ? 'active' : '') + '">🤖 AI</a>' +
            '<a href="iot.html" class="' + (active === 'iot' ? 'active' : '') + '">📡 IoT</a>' +
            '<a href="orders.html">🔎 Trace Order</a>' +
            '<a href="#" onclick="BJ.logout();return false">🚪 Logout</a>'
    }

    if (role === 'staff') {
        return '' +
            '<a href="kitchen.html" class="' + (active === 'kitchen' ? 'active' : '') + '">👨‍🍳 Kitchen</a>' +
            '<a href="orders.html">🔎 Trace Order</a>' +
            '<a href="#" onclick="BJ.logout();return false">🚪 Logout</a>'
    }

    return ''
}

BJ.initNav = async function () {
    var nav = document.querySelector('.nav-links')
    if (!nav) return

    var count = BJ.cartCount()
    var profile = await BJ.getProfile()

    if (profile && profile.role === 'admin') {
        nav.innerHTML =
            '<a href="dashboard.html">Dashboard</a>' +
            '<a href="kitchen.html">Kitchen</a>' +
            '<a href="products.html">Products</a>' +
            '<a href="inventory.html">Inventory</a>' +
            '<a href="customers.html">Customers</a>' +
            '<a href="reports.html">Reports</a>' +
            '<a href="ai.html">AI</a>' +
            '<a href="iot.html">IoT</a>' +
            '<a href="orders.html">Trace Order</a>' +
            '<a href="#" onclick="BJ.logout();return false">Logout</a>'
        return
    }

    if (profile && profile.role === 'staff') {
        nav.innerHTML =
            '<a href="kitchen.html">Kitchen</a>' +
            '<a href="orders.html">Trace Order</a>' +
            '<a href="#" onclick="BJ.logout();return false">Logout</a>'
        return
    }

    nav.innerHTML =
        '<a href="index.html">Home</a>' +
        '<a href="menu.html">Menu</a>' +
        '<a href="promos.html">Promos</a>' +
        '<a href="cart.html">Cart <span class="cart-count">' + count + '</span></a>' +
        '<a href="orders.html">Track Orders</a>' +
        '<a href="faq.html">FAQ</a>' +
        '<a href="login.html">Admin Login</a>'
}
