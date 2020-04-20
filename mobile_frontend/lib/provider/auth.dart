import 'package:flutter/foundation.dart';
import 'package:mobile_frontend/graphql/index.dart';

import '../config/client.dart';

class Auth with ChangeNotifier {
  bool _isAuth = false;
  Map _userDetails;
  String _errors;

  bool get isAuth {
    return _isAuth;
  }

  Map get userDetails {
    return _userDetails;
  }

  String get errors {
    return _errors;
  }

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

    _userDetails = {
      'userId': loginData['userId'],
      'userEmail': loginData['userEmail'],
      'username': loginData['username'],
      'token': loginData['token'],
      'tokenExpiration': loginData['tokenExpiration'],
    };

    _isAuth = true;
    notifyListeners();
  }

  Future<void> signupProvider(String name, String username, String email,
      String password, context) async {
    final client = Config.initailizeClient();
    await client.value.mutate(
        CombineOps().signUpUser(name, username, email, password, context));

    notifyListeners();
  }

  Future<void> updateSignUpErrors(error) async {
    _errors = error.toString();
    notifyListeners();
  }

  Future<void> updateUserAfterSignUp(Map data) async {
    _userDetails = {
      'userId': data['userId'],
      'userEmail': data['userEmail'],
      'username': data['username'],
      'token': data['token'],
      'tokenExpiration': data['tokenExpiration'],
    };

    _isAuth = true;
    notifyListeners();
  }
}
