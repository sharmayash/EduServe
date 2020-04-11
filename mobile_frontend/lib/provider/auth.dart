import 'package:flutter/foundation.dart';
import 'package:mobile_frontend/graphql/index.dart';

import '../config/client.dart';

class Auth with ChangeNotifier {
  bool isAuth = false;
  Map userDetails;

  Future<void> loginProvider(String credentials, String password) async {
    final client = Config.initailizeClient();
    final loginRes = await client.value
        .query(CombineOps().loginClient(credentials, password));

    if (loginRes.hasException) {
      print(loginRes.exception.toString());
    }

    if (loginRes.loading) {
      print("Loading...");
    }

    if (loginRes.data == null) {
      print("No Data");
    }

    final loginData = loginRes.data['loginUser'];

    userDetails = {
      'userId': loginData['userId'],
      'userEmail': loginData['userEmail'],
      'username': loginData['username'],
      'token': loginData['token'],
      'tokenExpiration': loginData['tokenExpiration'],
    };

    isAuth = true;
    notifyListeners();
  }
}
