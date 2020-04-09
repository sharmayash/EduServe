const String loginUser = r'''
  query LoginUser($credentials: String!, $password: String!) {
    loginUser(credentials: $credentials, password: $password){
      userId
      userEmail
      username
      token
      tokenExpiration
    }
  }
''';
