import 'package:intl/intl.dart';
import 'package:bubble/bubble.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../../provider/chat.dart';
import '../../config/socketConfig.dart';

class ChatMessages extends StatefulWidget {
  @override
  _ChatMessagesState createState() => _ChatMessagesState();
}

class _ChatMessagesState extends State<ChatMessages> {
  final _scrollController = ScrollController();

  @override
  void initState() {
    socket.on('newMsg', (data) {
      Provider.of<ChatProvider>(context, listen: false).newMsgReceived(data);
      _scrollController.jumpTo(_scrollController.position.extentInside);
    });

    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Consumer<ChatProvider>(
      builder: (ctx, chat, _) {
        return chat.chatMessages.isEmpty
            ? Center(child: Text("No chats Yet !!! Start a New One."))
            : ListView.builder(
                itemCount: chat.chatMessages.length,
                controller: _scrollController,
                itemBuilder: (_, index) {
                  if (chat.chatMessages[index]['sender']['username'] ==
                      chat.username) {
                    return Bubble(
                        elevation: 10.0,
                        color: Colors.lightGreen[300],
                        padding: BubbleEdges.all(15),
                        alignment: Alignment.topRight,
                        shadowColor: Colors.lightGreen[200],
                        radius: Radius.circular(10.0),
                        margin: BubbleEdges.only(
                            top: 10,
                            bottom: 10,
                            left: MediaQuery.of(context).size.width * 0.4,
                            right: MediaQuery.of(context).size.width * 0.05),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.end,
                          children: <Widget>[
                            Text(chat.chatMessages[index]['text']),
                            SizedBox(
                              height: 10,
                            ),
                            Text(DateFormat('⏲ HH:mm  📆 MMM, d').format(
                                DateTime.parse(
                                    chat.chatMessages[index]['timestamp'])))
                          ],
                        ));
                  } else {
                    return Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: <Widget>[
                        Container(
                          margin: EdgeInsets.fromLTRB(
                              MediaQuery.of(context).size.width * 0.07,
                              20,
                              0,
                              0),
                          child: Text(
                            chat.chatMessages[index]['sender']['username'],
                          ),
                        ),
                        Bubble(
                            elevation: 10.0,
                            color: Colors.lightBlue,
                            padding: BubbleEdges.all(15),
                            alignment: Alignment.topLeft,
                            shadowColor: Colors.lightBlue[300],
                            radius: Radius.circular(10.0),
                            margin: BubbleEdges.only(
                                top: 10,
                                bottom: 10,
                                left: MediaQuery.of(context).size.width * 0.05,
                                right: MediaQuery.of(context).size.width * 0.4),
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: <Widget>[
                                Text(chat.chatMessages[index]['text']),
                                SizedBox(
                                  height: 10,
                                ),
                                Text(DateFormat('⏲ HH:mm  📆 MMM, d').format(
                                    DateTime.parse(
                                        chat.chatMessages[index]['timestamp'])))
                              ],
                            )),
                      ],
                    );
                  }
                });
      },
    );
  }
}
