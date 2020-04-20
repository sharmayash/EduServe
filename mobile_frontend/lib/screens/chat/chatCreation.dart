import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import 'package:mobile_frontend/provider/chat.dart';

class ChatCreation extends StatefulWidget {
  static const routeName = '/chatCreation';

  @override
  _ChatCreationState createState() => _ChatCreationState();
}

class _ChatCreationState extends State<ChatCreation> {
  @override
  void initState() {
    super.initState();
    Provider.of<ChatProvider>(context, listen: false).createRoom("baap", false);
    // Provider.of<ChatProvider>(context, listen: false).seeIfConnected().then(
    //     () => Provider.of<ChatProvider>(context, listen: false)
    //         .createRoom("baap", false));
  }

  @override
  Widget build(BuildContext context) {
    return Container();
  }
}
