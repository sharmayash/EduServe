import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import './provider/auth.dart';
import './provider/chat.dart';

import './screens/homepage.dart';
import './screens/auth/login.dart';
import './screens/auth/signup.dart';
import './screens/chat/chatScreen.dart';
import './screens/chat/chatCreation.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (ctx) => Auth()),
        ChangeNotifierProxyProvider<Auth, ChatProvider>(
          update: (ctx, auth, chats) => ChatProvider(
              auth.userDetails['token'], auth.userDetails['userId']),
          create: null,
        )
      ],
      child: MaterialApp(
        title: 'EduServe',
        debugShowCheckedModeBanner: false,
        theme: ThemeData(
            primarySwatch: Colors.orange,
            accentColor: Colors.grey[600],
            cardColor: Colors.grey[800],
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
        // home: ChatCreation(),
        routes: {
          Login.routeName: (ctx) => Login(),
          SignUp.routeName: (ctx) => SignUp(),
          ChatScreen.routeName: (ctx) => ChatScreen(),
          ChatCreation.routeName: (ctx) => ChatCreation(),
        },
      ),
    );
  }
}
