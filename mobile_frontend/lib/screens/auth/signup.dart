import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../../provider/auth.dart';

class SignUp extends StatelessWidget {
  static const routeName = '/signup';

  final _nameC = TextEditingController();
  final _usernameC = TextEditingController();
  final _emailC = TextEditingController();
  final _passwordC = TextEditingController();

  _signupNow(BuildContext context) {
    if (_nameC.text.isEmpty &&
        _usernameC.text.isEmpty &&
        _emailC.text.isEmpty &&
        _passwordC.text.isEmpty) {
      return;
    }

    Provider.of<Auth>(context, listen: false)
        .signupProvider(
            _nameC.text, _usernameC.text, _emailC.text, _passwordC.text)
        .then((_) => Navigator.of(context).popUntil(ModalRoute.withName('/')));
  }

  Widget _buildTextField(
      BuildContext ctx, controller, label, keyboardType, obscureText) {
    return Container(
      padding: EdgeInsets.symmetric(horizontal: 20),
      margin: EdgeInsets.symmetric(horizontal: 50),
      decoration: BoxDecoration(
          border: Border.all(color: Theme.of(ctx).accentColor, width: 3),
          borderRadius: BorderRadius.all(Radius.circular(50))),
      child: TextField(
        controller: controller,
        keyboardType: keyboardType,
        obscureText: obscureText,
        onSubmitted: (_) => _signupNow(ctx),
        style: TextStyle(
          color: Colors.grey,
        ),
        cursorColor: Colors.grey,
        decoration: InputDecoration(
            labelStyle: TextStyle(color: Colors.grey),
            border: InputBorder.none,
            labelText: label),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Sign Up"),
      ),
      backgroundColor: Theme.of(context).backgroundColor,
      body: SingleChildScrollView(
        child: Container(
          // color: Colors.amber,
          height: MediaQuery.of(context).size.height * 0.88,
          child: Column(
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            crossAxisAlignment: CrossAxisAlignment.center,
            children: <Widget>[
              _buildTextField(
                  context, _nameC, "Full Name", TextInputType.text, false),
              _buildTextField(context, _usernameC, "Username / Profile Handle",
                  TextInputType.text, false),
              _buildTextField(
                  context, _emailC, "Email", TextInputType.emailAddress, false),
              _buildTextField(
                  context, _passwordC, "Password", TextInputType.text, true),
              RaisedButton(
                  color: Colors.green[500],
                  child: Text("Sign Up"),
                  onPressed: () => _signupNow(context))
            ],
          ),
        ),
      ),
    );
  }
}
