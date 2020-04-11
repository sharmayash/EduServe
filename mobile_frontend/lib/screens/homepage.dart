import 'package:flutter/material.dart';
import 'package:mobile_frontend/provider/auth.dart';
import 'package:provider/provider.dart';

import '../widgets/MyDrwr.dart';

class MyHomePage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        appBar: AppBar(
          title: Text("EduServe"),
        ),
        drawer: MyDrwr(),
        backgroundColor: Theme.of(context).backgroundColor,
        body: Consumer<Auth>(
          builder: (ctx, auth, _) {
            return Container(
              height: MediaQuery.of(context).size.height,
              width: MediaQuery.of(context).size.width,
              child: Center(
                child: Text(auth.isAuth
                    ? 'Welcome ${auth.userDetails["username"]}'
                    : 'Welcome'),
              ),
            );
          },
        ),
      ),
    );
  }
}
