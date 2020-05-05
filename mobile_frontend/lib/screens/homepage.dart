import 'package:flutter/material.dart';
import 'package:mobile_frontend/provider/auth.dart';
import 'package:provider/provider.dart';

import '../widgets/MyDrwr.dart';

class MyHomePage extends StatefulWidget {
  @override
  _MyHomePageState createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  var auth;

  @override
  void didChangeDependencies() {
    auth = Provider.of<Auth>(context);
    super.didChangeDependencies();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: Text("EduServe"),
        ),
        drawer: MyDrwr(),
        backgroundColor: Theme.of(context).backgroundColor,
        body: auth.isAuth
            ? Center(
                child: Text('Welcome ${auth.username}'),
              )
            : FutureBuilder(
                future: auth.tryAutoLogin(),
                builder: (ctx, authResSnapShot) =>
                    authResSnapShot.connectionState == ConnectionState.waiting
                        ? Center(
                            child: Text("Loading..."),
                          )
                        : Center(
                            child: Text("Welcome login / sign up please"),
                          )));
  }
}
