import 'package:flutter/material.dart';
import 'package:overlay_support/overlay_support.dart';
import 'package:provider/provider.dart';

import '../../provider/chat.dart';

import '../../config/socketConfig.dart';

import '../../widgets/MyDrwr.dart';
import '../../widgets/buildTextField.dart';

class ChatScreen extends StatefulWidget {
  static const routeName = '/chat';

  @override
  _ChatScreenState createState() => _ChatScreenState();
}

class _ChatScreenState extends State<ChatScreen> {
  final _msgC = TextEditingController();
  // final _scrollController = ScrollController();

  // var _isInit = true;

  @override
  void initState() {
    socket.on('newMsg', (data) {
      Provider.of<ChatProvider>(context, listen: false).newMsgReceived(data);
    });

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
    List chatMessages = Provider.of<ChatProvider>(context).chatMessages;

    return Scaffold(
        appBar: AppBar(
          title: Text("EduServe Chat"),
        ),
        drawer: MyDrwr(),
        backgroundColor: Theme.of(context).backgroundColor,
        body: Column(
          children: <Widget>[
            Expanded(
                child: ListView.builder(
                    itemCount: chatMessages.length,
                    // controller: _scrollController,
                    reverse: true,
                    itemBuilder: (_, index) {
                      return ListTile(
                          subtitle:
                              Text(chatMessages[index]['timestamp'].toString()),
                          dense: true,
                          title: Text(chatMessages[index]['text'].toString()));
                    })),
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
