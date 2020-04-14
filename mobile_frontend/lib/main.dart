import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import './provider/auth.dart';

import './screens/homepage.dart';
import './screens/auth/login.dart';
import './screens/auth/signup.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (ctx) => Auth()),
      ],
      child: MaterialApp(
        title: 'EduServe',
        debugShowCheckedModeBanner: false,
        theme: ThemeData(
            primarySwatch: Colors.orange,
            accentColor: Colors.orange[200],
            backgroundColor: Colors.grey[900],
            textTheme: ThemeData.dark().textTheme.copyWith(
                  headline1: TextStyle(
                    fontSize: 20,
                    letterSpacing: 2,
                    color: Colors.grey,
                    fontWeight: FontWeight.bold,
                  ),
                  headline2: TextStyle(
                    color: Colors.grey,
                  ),
                )),
        home: MyHomePage(),
        routes: {
          Login.routeName: (ctx) => Login(),
          SignUp.routeName: (ctx) => SignUp(),
        },
      ),
    );
  }
}
