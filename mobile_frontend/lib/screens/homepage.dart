import 'package:flutter/material.dart';
// import 'package:graphql_flutter/graphql_flutter.dart';
// import 'package:mobile_frontend/graphql/index.dart';

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
        body: Container(
          height: MediaQuery.of(context).size.height,
          width: MediaQuery.of(context).size.width,
          child: Center(
            child: Text("Welcome"),
          ),
        ),
      ),
    );
  }
}
