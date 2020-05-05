import 'dart:async';
import 'dart:convert';
import 'package:flutter/widgets.dart';
import 'package:shared_preferences/shared_preferences.dart';

import '../graphql/index.dart';
import '../config/client.dart';

class Auth with ChangeNotifier {
  String _token;
  String _userId;
  String _username;
  String _userEmail;
  DateTime _expiryDate;

  Timer _authTimer;
  String _errors;

  //Getters

  bool get isAuth {
    return _token != null;
  }

  String get userId {
    return _userId;
  }

  String get username {
    return _username;
  }

  String get token {
    if (_expiryDate != null &&
        _expiryDate.isAfter(DateTime.now()) &&
        _token != null) {
      return _token;
    }
    return null;
  }

  String get errors {
    return _errors;
  }

  // Functions

  Future<bool> tryAutoLogin() async {
    final prefs = await SharedPreferences.getInstance();
    if (!prefs.containsKey('userData')) {
      print(false);
      return false;
    }
    final extractedUserData =
        json.decode(prefs.getString('userData')) as Map<String, Object>;
    final expiryDate = DateTime.parse(extractedUserData['expiryDate']);

    if (expiryDate.isBefore(DateTime.now())) {
      print("False");
      return false;
    }
    _token = extractedUserData['token'];
    _userId = extractedUserData['userId'];
    _username = extractedUserData['username'];
    _userEmail = extractedUserData['userEmail'];
    _expiryDate = expiryDate;
    notifyListeners();
    _autoLogout();
    return true;
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

    _token = loginData['token'];
    _userId = loginData['userId'];
    _username = loginData['username'];
    _userEmail = loginData['userEmail'];
    _expiryDate = DateTime.now().add(
      Duration(
        hours: int.parse(
          loginData['tokenExpiration'].toString(),
        ),
      ),
    );

    notifyListeners();
    final prefs = await SharedPreferences.getInstance();
    final userData = json.encode(
      {
        'token': _token,
        'userId': _userId,
        'username': _username,
        'useremail': _userEmail,
        'expiryDate': _expiryDate.toIso8601String(),
      },
    );
    prefs.setString('userData', userData);
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
    _token = data['token'];
    _userId = data['userId'];
    _username = data['username'];
    _userEmail = data['userEmail'];
    _expiryDate = DateTime.now().add(
      Duration(
        hours: int.parse(
          data['tokenExpiration'].toString(),
        ),
      ),
    );

    notifyListeners();
    final prefs = await SharedPreferences.getInstance();
    final userData = json.encode(
      {
        'token': _token,
        'userId': _userId,
        'username': _username,
        'useremail': _userEmail,
        'expiryDate': _expiryDate.toIso8601String(),
      },
    );
    prefs.setString('userData', userData);
  }

  Future<void> logout() async {
    _token = null;
    _userId = null;
    _username = null;
    _userEmail = null;
    _expiryDate = null;
    if (_authTimer != null) {
      _authTimer.cancel();
      _authTimer = null;
    }
    notifyListeners();
    final prefs = await SharedPreferences.getInstance();
    // prefs.remove('userData');
    prefs.clear();
  }

  void _autoLogout() {
    if (_authTimer != null) {
      _authTimer.cancel();
    }
    final timeToExpiry = _expiryDate.difference(DateTime.now()).inSeconds;
    _authTimer = Timer(Duration(seconds: timeToExpiry), logout);
  }
}
