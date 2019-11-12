const devBaseUrl = ''
const apiUrl = devBaseUrl;//统一接口地址
const moduleApiUrl = {
    // 登录、权限、基础配置管理
    loginUrl : apiUrl, // 登录模块
    permission_manager : apiUrl + 'admin/', // 权限_管理
}
export {
    moduleApiUrl,
    apiUrl
}