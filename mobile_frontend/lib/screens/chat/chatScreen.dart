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
  final _scrollController = ScrollController();
  bool _isLoading = true;
  // var _isInit = true;

  // @override
  // void initState() {
  //   super.initState();
  // }

  // @override
  // void didChangeDependencies() {
  //   if (_isInit) {}
  //   _isInit = false;
  //   super.didChangeDependencies();
  // }

  void sendingMsg() {
    if (_msgC.text.isEmpty) {
      return;
    }
    Provider.of<ChatProvider>(context, listen: false)
        .sendMsg(_msgC.text)
        .then((_) => _msgC.clear());
  }

  @override
  Widget build(BuildContext context) {
    socket.on(
        'newMsg',
        (data) => {
              Provider.of<ChatProvider>(context, listen: false)
                  .newMsgReceived(data)
                  .then((_) => _scrollController
                      .jumpTo(_scrollController.position.maxScrollExtent))
            });

    socket.on(
        'notification',
        (data) => {
              Provider.of<ChatProvider>(context, listen: false)
                  .newNotification(data)
                  .then((_) => showSimpleNotification(Text(data["message"]),
                      background: Colors.orange[200])),
            });

    return Scaffold(
        appBar: AppBar(
          title: Text("EduServe Chat"),
        ),
        drawer: MyDrwr(),
        backgroundColor: Theme.of(context).backgroundColor,
        body: Column(
          children: <Widget>[
            Expanded(
              child: Consumer<ChatProvider>(
                builder: (ctx, chat, child) {
                  return _isLoading
                      ? Center(
                          child: Text("Loading ..."),
                        )
                      : ListView.builder(
                          itemCount: chat.chatMessages.length,
                          controller: _scrollController,
                          shrinkWrap: true,
                          itemBuilder: (BuildContext ctx2, index) {
                            return ListTile(
                                subtitle: Text(chat.chatMessages[index]
                                        ['timestamp']
                                    .toString()),
                                dense: true,
                                title: Text(chat.chatMessages[index]['text']
                                    .toString()));
                          });
                },
              ),
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
                        onPressed: () => sendingMsg())
                  ],
                )),
          ],
        ));
  }
}
