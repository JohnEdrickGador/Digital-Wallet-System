from rest_framework import authentication
from rest_framework.exceptions import AuthenticationFailed

class BearerAuthentication(authentication.TokenAuthentication):
    keyword = 'Bearer'

    def authenticate_credentials(self, key):
        model = self.get_model()
        try:
            token = model.objects.select_related('user').get(key = key)
        except model.DoesNotExist:
            raise AuthenticationFailed(('Invalid Token'))
        

        if not token.user.is_active:
            raise AuthenticationFailed(('User is inactive or deleted'))
        
        return (token.user, token)