import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

// import '../../provider/auth.dart';
import '../../provider/chat.dart';

import '../../widgets/MyDrwr.dart';
import '../../widgets/buildTextField.dart';

enum ModeofChat { join, create }

class ChatCreation extends StatefulWidget {
  static const routeName = '/chatCreation';
  @override
  _ChatCreationState createState() => _ChatCreationState();
}

class _ChatCreationState extends State<ChatCreation>
    with SingleTickerProviderStateMixin {
  bool isPrivate = false;
  AnimationController _controller;
  Animation<double> _opacityAnimation;
  final _roomNameC = TextEditingController();
  ModeofChat currentChatMode = ModeofChat.join;

  @override
  void initState() {
    _controller =
        AnimationController(vsync: this, duration: Duration(milliseconds: 300));
    _opacityAnimation = Tween(begin: 0.0, end: 1.0)
        .animate(CurvedAnimation(parent: _controller, curve: Curves.easeIn));
    super.initState();
  }

  void _switchModeOfChat() {
    if (currentChatMode == ModeofChat.join) {
      setState(() {
        currentChatMode = ModeofChat.create;
      });
      _controller.forward();
    } else {
      setState(() {
        currentChatMode = ModeofChat.join;
      });
      _controller.reverse();
    }
  }

  void _createRoom() {
    Provider.of<ChatProvider>(context, listen: false)
        .createRoom(_roomNameC.text, isPrivate);
  }

  void _joinRoom() {
    // Provider.of<ChatProvider>(context, listen: false)
    //     .joinRoom(_roomNameC.text, isPrivate);
  }

  @override
  Widget build(BuildContext context) {
    final deviceSize = MediaQuery.of(context).size;
    return Scaffold(
      appBar: AppBar(
        title: Text("EduServe Chat"),
      ),
      drawer: MyDrwr(),
      backgroundColor: Theme.of(context).backgroundColor,
      body: Center(
        child: Card(
          color: Theme.of(context).cardColor,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(10.0),
          ),
          elevation: 8.0,
          child: AnimatedContainer(
            duration: Duration(milliseconds: 300),
            curve: Curves.easeIn,
            height: currentChatMode == ModeofChat.create ? 350 : 225,
            constraints: BoxConstraints(
                minHeight: currentChatMode == ModeofChat.create ? 350 : 225),
            width: deviceSize.width * 0.75,
            padding: EdgeInsets.all(16.0),
            child: SingleChildScrollView(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                children: <Widget>[
                  BuildTextField(context, _roomNameC, 'Room Name',
                      TextInputType.text, false),
                  SizedBox(
                    height: 20,
                  ),
                  AnimatedContainer(
                    duration: Duration(milliseconds: 300),
                    constraints: BoxConstraints(
                      minHeight: currentChatMode == ModeofChat.create ? 100 : 0,
                      maxHeight: currentChatMode == ModeofChat.create ? 200 : 0,
                    ),
                    curve: Curves.easeIn,
                    child: FadeTransition(
                      opacity: _opacityAnimation,
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: <Widget>[
                          Text("Is This Private Chat ?"),
                          Switch(
                            value: isPrivate,
                            onChanged: (value) {
                              setState(() {
                                isPrivate = value;
                              });
                            },
                            activeTrackColor: Colors.orange,
                            activeColor: Colors.deepOrange,
                          ),
                        ],
                      ),
                    ),
                  ),
                  FlatButton(
                    child: Text(
                        '${currentChatMode == ModeofChat.join ? 'Create Room' : 'Join Room'} Instead ?'),
                    onPressed: _switchModeOfChat,
                    padding:
                        EdgeInsets.symmetric(horizontal: 30.0, vertical: 4),
                    materialTapTargetSize: MaterialTapTargetSize.shrinkWrap,
                    textColor: Theme.of(context).primaryColor,
                  ),
                  SizedBox(
                    height: 20,
                  ),
                  RaisedButton(
                    child: Text(
                        '${currentChatMode == ModeofChat.join ? 'Join Room Now' : 'Create Room Now'}'),
                    onPressed: currentChatMode == ModeofChat.join
                        ? _joinRoom
                        : _createRoom,
                    color: Theme.of(context).primaryColor,
                    splashColor: Colors.deepOrange,
                  )
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }

  @override
  void dispose() {
    super.dispose();
    _controller.dispose();
  }
}
