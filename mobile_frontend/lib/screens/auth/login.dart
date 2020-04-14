import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../../provider/auth.dart';

class Login extends StatelessWidget {
  static const routeName = '/login';

  @override
  Widget build(BuildContext context) {
    final _credentialC = TextEditingController();
    final _passwordC = TextEditingController();

    _loginNow() {
      if (_credentialC.text.isEmpty && _passwordC.text.isEmpty) {
        return;
      }

      Provider.of<Auth>(context, listen: false)
          .loginProvider(_credentialC.text, _passwordC.text)
          .then((_) => Navigator.of(context).popUntil(ModalRoute.withName('/')))
          .then((_) =>
              print(Provider.of<Auth>(context, listen: false).userDetails));
    }

    return Scaffold(
      appBar: AppBar(
        title: Text("Login"),
      ),
      backgroundColor: Theme.of(context).backgroundColor,
      body: SingleChildScrollView(
        child: Container(
          // color: Colors.amber,
          height: MediaQuery.of(context).size.height * 0.887,
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.center,
            children: <Widget>[
              Container(
                padding: EdgeInsets.symmetric(horizontal: 20, vertical: 10),
                margin: EdgeInsets.symmetric(horizontal: 50, vertical: 5),
                decoration: BoxDecoration(
                    border: Border.all(
                        color: Theme.of(context).accentColor, width: 3),
                    borderRadius: BorderRadius.all(Radius.circular(50))),
                child: TextField(
                  controller: _credentialC,
                  onSubmitted: (_) => _loginNow,
                  style: TextStyle(
                    color: Colors.grey,
                  ),
                  cursorColor: Colors.grey,
                  decoration: InputDecoration(
                      labelStyle: TextStyle(color: Colors.grey),
                      border: InputBorder.none,
                      labelText: 'username / email'),
                ),
              ),
              Container(
                padding: EdgeInsets.symmetric(horizontal: 20, vertical: 10),
                margin: EdgeInsets.symmetric(horizontal: 50, vertical: 30),
                decoration: BoxDecoration(
                    border: Border.all(
                        color: Theme.of(context).accentColor, width: 3),
                    borderRadius: BorderRadius.all(Radius.circular(50))),
                child: TextField(
                  controller: _passwordC,
                  onSubmitted: (_) => _loginNow,
                  style: TextStyle(
                    color: Colors.grey,
                  ),
                  obscureText: true,
                  cursorColor: Colors.grey,
                  decoration: InputDecoration(
                      labelStyle: TextStyle(color: Colors.grey),
                      border: InputBorder.none,
                      labelText: 'Password'),
                ),
              ),
              RaisedButton(
                  color: Colors.green[500],
                  child: Text("Login Now"),
                  onPressed: _loginNow)
            ],
          ),
        ),
      ),
    );
  }
}
