import 'package:graphql_flutter/graphql_flutter.dart';

import '../graphql/query/auth.dart' as queries;

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
}
