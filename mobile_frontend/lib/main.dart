import 'package:flutter/material.dart';
import 'package:mobile_frontend/screens/chat/chatScreen.dart';
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
            accentColor: Colors.grey[800],
            backgroundColor: Colors.grey[900],
            textTheme: ThemeData.dark().textTheme.copyWith(
                  headline1: TextStyle(
                    fontSize: 20,
                    letterSpacing: 2,
                    color: Colors.grey,
                    fontWeight: FontWeight.bold,
                  ),
                  headline6: TextStyle(
                    color: Colors.grey[300],
                  ),
                )),
        home: MyHomePage(),
        routes: {
          Login.routeName: (ctx) => Login(),
          SignUp.routeName: (ctx) => SignUp(),
          ChatScreen.routeName: (ctx) => ChatScreen(),
        },
      ),
    );
  }
}
