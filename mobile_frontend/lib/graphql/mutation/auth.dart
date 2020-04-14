const String signUpUser = r'''
  mutation signUpUser($name: String!, $username: String!, $email: String!, $password: String!) {
    createUser(name: $name, username: $username, email: $email, password: $password) {
      userId
      username
      userEmail
      token
      tokenExpiration
    }
  }
''';
