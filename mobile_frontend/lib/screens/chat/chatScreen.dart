import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:overlay_support/overlay_support.dart';

import '../../provider/chat.dart';

import '../../config/socketConfig.dart';

import './chatMessages.dart';

import '../../widgets/MyDrwr.dart';
import '../../widgets/buildTextField.dart';

class ChatScreen extends StatefulWidget {
  static const routeName = '/chat';

  @override
  _ChatScreenState createState() => _ChatScreenState();
}

class _ChatScreenState extends State<ChatScreen> {
  final _msgC = TextEditingController();

  // var _isInit = true;

  @override
  void initState() {
    socket.on(
        'notification',
        (data) => Provider.of<ChatProvider>(context, listen: false)
            .newNotification(data)
            .then((_) => showSimpleNotification(Text(data["message"]),
                background: Colors.orange[200])));

    super.initState();
  }

  // @override
  // void didChangeDependencies() {
  // if (_isInit) {}
  // _isInit = false;
  // super.didChangeDependencies();
  // }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: Text("EduServe Chat"),
        ),
        drawer: MyDrwr(),
        backgroundColor: Theme.of(context).backgroundColor,
        body: Column(
          children: <Widget>[
            Expanded(
              child: ChatMessages(),
            ),
            Container(
                width: MediaQuery.of(context).size.width,
                color: Theme.of(context).accentColor,
                child: Row(
                  children: <Widget>[
                    Expanded(
                      child: BuildTextField(
                          context,
                          _msgC,
                          "Type Your Message Here ...",
                          TextInputType.text,
                          false),
                    ),
                    IconButton(
                        icon: Icon(Icons.send),
                        color: Colors.green[500],
                        onPressed: () {
                          if (_msgC.text.isEmpty) {
                            return;
                          }
                          Provider.of<ChatProvider>(context, listen: false)
                              .sendMsg(_msgC.text)
                              .then((_) => _msgC.clear());
                        })
                  ],
                )),
          ],
        ));
  }
}
