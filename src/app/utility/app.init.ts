import {KeycloakService} from 'keycloak-angular';

export function initializeKeycloak(keycloak: KeycloakService) : () => Promise<boolean> {
  return () =>
    keycloak.init({
      config: {
        url: 'http://localhost:8080/auth',
        realm: 'SpringBootKeycloak',
        clientId: 'login-app'
      },
      loadUserProfileAtStartUp: true,
      initOptions: {
        onLoad: 'login-required',
        flow: 'standard'

      }
    });
}
