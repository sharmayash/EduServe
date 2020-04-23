import 'dart:convert';

import 'package:flutter/cupertino.dart';
import 'package:socket_io_client/socket_io_client.dart' as IO;

class ChatProvider with ChangeNotifier {
  String _authToken;
  String _userId;
  IO.Socket socket = IO.io('http://192.168.43.27:4000', <String, dynamic>{
    'transports': ['websocket'],
    'extraHeaders': {'foo': 'bar'} // optional
  });

  ChatProvider(this._authToken, this._userId);

  seeIfConnected() {
    socket.on('connect', (_) {
      print('connect userID :- $_userId token :- $_authToken');
      socket.emit('test', 'data to server');
      socket.on("fromServer", (_) => print(_));
    });
  }

  Future<void> createRoom(String _roomName, bool _isPrivate) async {
    socket.emitWithAck('create', {
      'room_name': _roomName,
      'is_private': _isPrivate,
      'user_id': _userId,
    }, ack: (error) {
      if (error == null) {
        print("Creating Room");
      } else {
        print(error);
      }
    });
  }

  Future<void> joinRoom(String _roomName, bool _isPrivate) async {
    socket.emitWithAck(
        'join',
        json.encode({
          'room_name': _roomName,
          'is_private': _isPrivate,
          'user_id': _userId
        }), ack: (error, data) {
      if (error == null) {
        print("All Ok Do something");
      } else {
        print(error);
      }
    });
  }
}
