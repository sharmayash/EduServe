import 'dart:async';

import 'package:flutter/foundation.dart';

import '../config/socketConfig.dart';

class ChatProvider with ChangeNotifier {
  // Auth Related variables
  String _userId;
  String _username;

  ChatProvider(this._userId, this._username);

  // Chat Related variables
  String _setRoomName;
  List _previouschats = [];
  List _notifications = [];

  // Getters

  String get roomName {
    return _setRoomName;
  }

  get chatMessages {
    return _previouschats;
  }

  seeIfConnected() {
    socket.on('connect', (_) {
      print('connect userID :- $_userId username :- $_username');
      socket.emit('test', 'data to server');
      socket.on("fromServer", (_) => print(_));
    });
  }

  Future<void> createRoom(String _roomName, bool _isPrivate) async {
    await socket.emitWithAck('create', {
      'room_name': _roomName,
      'is_private': _isPrivate,
      'user_id': _userId,
    }, ack: (error) {
      if (error == null) {
        _setRoomName = _roomName;
        print("Creating Room");
      } else {
        print("error");
      }
    });
    notifyListeners();
  }

  Future<void> joinRoom(String _roomName) async {
    await socket.emitWithAck('join', {
      'user_id': _userId,
      'username': _username,
      'room_name': _roomName,
    }, ack: (receivedAck) {
      final ackList = receivedAck as List;
      if (ackList[0] == null) {
        _setRoomName = _roomName;
        _previouschats = ackList[1];
        print("joining room");
      } else {
        print(ackList[0]);
      }
    });
    notifyListeners();
  }

  Future<void> sendMsg(text) async {
    final timeStamp = new DateTime.now().toIso8601String();
    final data = {
      'text': text,
      'user_id': _userId,
      'timestamp': timeStamp,
      'room_name': _setRoomName,
      'username': _username
    };
    print("sending message");

    await socket.emit('sendMsg', data);

    notifyListeners();
  }

  void newMsgReceived(data) {
    print(data);
    _previouschats.add(data);

    notifyListeners();
  }

  Future<void> newNotification(data) async {
    _notifications.add(data);

    notifyListeners();
  }
}
