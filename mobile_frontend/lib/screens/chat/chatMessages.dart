import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:lazy_load_scrollview/lazy_load_scrollview.dart';

import '../../provider/chat.dart';
import '../../config/socketConfig.dart';

class ChatMessages extends StatefulWidget {
  @override
  _ChatMessagesState createState() => _ChatMessagesState();
}

class _ChatMessagesState extends State<ChatMessages> {
  final _scrollController = ScrollController();
  bool _isLoading = false;

  @override
  void initState() {
    socket.on('newMsg', (data) {
      Provider.of<ChatProvider>(context, listen: false).newMsgReceived(data);
      _scrollController.jumpTo(_scrollController.position.maxScrollExtent);
    });

    super.initState();
  }

  Future _loadMoreChats() async {
    setState(() {
      _isLoading = true;
    });

    // TODO: Increase chatMessages limit / here just load more data
    // await

    setState(() {
      _isLoading = false;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Consumer<ChatProvider>(
      builder: (ctx, chat, _) {
        return chat.chatMessages.isEmpty
            ? Center(child: Text("No chats Yet !!! Start a New One."))
            : LazyLoadScrollView(
                onEndOfPage: _loadMoreChats,
                isLoading: _isLoading,
                scrollOffset: 100,
                child: ListView.builder(
                    itemCount: chat.chatMessages.length,
                    reverse: true,
                    controller: _scrollController,
                    itemBuilder: (_, index) {
                      return ListTile(
                          subtitle: Text(
                              chat.chatMessages[index]['timestamp'].toString()),
                          dense: true,
                          title: Text(
                              chat.chatMessages[index]['text'].toString()));
                    }),
              );
      },
    );
  }
}
