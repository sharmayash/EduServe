import 'package:flutter/cupertino.dart';
import 'package:provider/provider.dart';
import 'package:graphql_flutter/graphql_flutter.dart';

import '../provider/auth.dart';
import './query/auth.dart' as queries;
import './mutation/auth.dart' as mutations;

class CombineOps {
  QueryOptions loginClient(String credentials, String password) {
    final QueryOptions _options = QueryOptions(
      documentNode: gql(queries.loginUser),
      variables: <String, dynamic>{
        'credentials': credentials,
        'password': password
      },
    );
    return _options;
  }

  MutationOptions signUpUser(String name, String username, String email,
      String password, BuildContext context) {
    final MutationOptions _options = MutationOptions(
        documentNode: gql(mutations.signUpUser),
        variables: <String, dynamic>{
          'name': name,
          'username': username,
          'email': email,
          'password': password
        },
        onError: (error) {
          print('$error lineeeeeeeee');
        },
        onCompleted: (data) {
          if (data != null) {
            Provider.of<Auth>(context, listen: false)
                .updateUserAfterSignUp(data.data['createUser']);
          }
        });
    return _options;
  }
}
