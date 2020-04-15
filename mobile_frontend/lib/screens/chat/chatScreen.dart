import 'package:flutter/material.dart';
import 'package:mobile_frontend/widgets/buildTextField.dart';
import 'package:provider/provider.dart';

import '../../provider/auth.dart';
import '../../widgets/MyDrwr.dart';

class ChatScreen extends StatelessWidget {
  static const routeName = '/chat';
  final _msgC = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("EduServe Chat"),
      ),
      drawer: MyDrwr(),
      backgroundColor: Theme.of(context).backgroundColor,
      body: Consumer<Auth>(
        builder: (ctx, auth, _) {
          return Column(
            children: <Widget>[
              Expanded(
                child: SingleChildScrollView(
                  child: Container(
                    width: double.infinity,
                    child: Column(
                      // Later replace it with ListView / StreamBuilder
                      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                      children: <Widget>[
                        Text(auth.isAuth
                            ? 'Hey ${auth.userDetails["username"]}, chat with someone'
                            : 'Welcome'),
                      ],
                    ),
                  ),
                ),
              ),
              Container(
                  width: MediaQuery.of(context).size.width,
                  color: Theme.of(context).accentColor,
                  child: Row(
                    children: <Widget>[
                      Expanded(
                        child: BuildTextField(
                            ctx,
                            _msgC,
                            "Type Your Message Here ...",
                            TextInputType.text,
                            false),
                      ),
                      IconButton(
                          icon: Icon(Icons.send),
                          color: Colors.green[500],
                          onPressed: () {})
                    ],
                  )),
            ],
          );
        },
      ),
    );
  }
}
