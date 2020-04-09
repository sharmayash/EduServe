import 'package:flutter/material.dart';
import 'package:graphql_flutter/graphql_flutter.dart';

import './config/client.dart';
import './screens/homepage.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'EduServe',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: GraphQLProvider(
        client: Config.initailizeClient(),
        child: CacheProvider(child: MyHomePage()),
      ),
    );
  }
}
