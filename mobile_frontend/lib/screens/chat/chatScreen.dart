import 'package:flutter/material.dart';
import 'package:mobile_frontend/provider/chat.dart';
import 'package:provider/provider.dart';

import '../../provider/auth.dart';
// import '../../provider/chat.dart';

import '../../widgets/MyDrwr.dart';
import '../../widgets/buildTextField.dart';

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
                  child: Container(width: double.infinity, child: Container()
                      // StreamBuilder(
                      //     stream:
                      //         Provider.of<ChatProvider>(context, listen: false)
                      //             .chatMessages,
                      //     builder: (context, snapshot) {
                      //       snapshot.hasData
                      //           ? print(snapshot.data)
                      //           : print("obj");
                      //       return Text(
                      //           snapshot.hasData ? "${snapshot.data}" : "");
                      //     })
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
                          onPressed: () {
                            if (_msgC.text.isNotEmpty) {
                              Provider.of<ChatProvider>(context, listen: false)
                                  .sendMsg(_msgC.text)
                                  .then((_) => _msgC.text == '');
                            }
                          })
                    ],
                  )),
            ],
          );
        },
      ),
    );
  }
}
