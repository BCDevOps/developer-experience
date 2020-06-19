import groovy.transform.Field
import org.artifactory.api.context.ContextHelper
import org.artifactory.api.security.SecurityService
import org.artifactory.api.security.UserGroupService
import org.artifactory.factory.InfoFactoryHolder
import org.artifactory.security.UserInfo
import org.artifactory.security.props.auth.ApiKeyManager

@Field
final String internalUserName = '_internal'

@Field
final String envPassword = 'ART_INTERNAL_PASSWORD'

createInternalUserIfNeeded()

void createInternalUserIfNeeded() {
    String password = System.getenv(envPassword)
    if (password == null || password.length() == 0) {
        def passFile = new File('/run/secrets/internalPass')
        if (passFile.exists()) {
            password = passFile.text.trim()
        } else {
            log.warn "Created password for user $internalUserName, which is deprecated."
            password = 'b6a50c8a15ece8753e37cbe5700bf84f'
        }
    }

    UserGroupService userGroupService = ContextHelper.get().beanForType(UserGroupService)
    SecurityService securityService = ContextHelper.get().beanForType(SecurityService)
    ApiKeyManager apiKeyManager = ContextHelper.get().beanForType(ApiKeyManager)
    UserInfo user = userGroupService.findOrCreateExternalAuthUser(internalUserName, false)
    def saltedPassword = securityService.generateSaltedPassword(password)
    def newUser = InfoFactoryHolder.get().copyUser(user)
    // We should decide if we use a fixed password on the first start for convenience
    // or if we fail fast on other services if no API_KEY is provided
    newUser.setPassword(saltedPassword)
    newUser.setAdmin(false)
    newUser.setPasswordDisabled(false)
    newUser.setInternalGroups(Collections.emptySet())
    newUser.setGroups(Collections.emptySet())
    userGroupService.updateUser(newUser, false)
}
