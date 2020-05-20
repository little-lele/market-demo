import instance from "./utils.js"
export function loginCheck(username, password) {
    return instance({
        url: 'login',
        method: 'POST',
        params: { username, password }
    })
}
export function getMenuList() {
    return instance({
        url: '/menus',
        method: 'GET'
    })
}

export function getGoodsList(query, pagenum, pagesize) {
    return instance({
        url: 'goods',
        method: 'GET',
        params: {
            query,
            pagenum,
            pagesize
        }
    })
}

// 查询用户列表
export function getUsersData(query, pagenum, pagesize) {
    return instance({
        url: '/users',
        method: 'GET',
        params: {
            query,
            pagenum,
            pagesize
        }
    })
}

// 查询角色列表
export function getRolesData() {
    return instance({
        url: '/roles',
        method: 'GET',
    })
}

// 查询权限列表
export function getRightsData(type) {
    return instance({
        url: `rights/${type}`,
        method: 'GET',
        params: {
            type,

        }
    })
}

// 查询订单列表
export function getOrdersData(query, pagenum, pagesize) {
    return instance({
        url: 'orders',
        method: 'GET',
        params: {
            query,
            pagenum,
            pagesize

        }
    })
}