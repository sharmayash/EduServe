import 'dart:convert';

import 'package:flutter/cupertino.dart';
import 'package:socket_io_client/socket_io_client.dart' as IO;

class ChatProvider with ChangeNotifier {
  String _authToken;
  String _userId;
  IO.Socket socket = IO.io('http://localhost:4000', <String, dynamic>{
    'transports': ['websocket'],
    'extraHeaders': {'foo': 'bar'} // optional
  });

  ChatProvider(this._authToken, this._userId);

  seeIfConnected() {
    socket.on('connect', (_) {
      print('connect userID :- $_userId token :- $_authToken');
    });
  }

  Future<void> createRoom(String _roomName, bool _isPrivate) async {
    socket.emit(
        'create',
        json.encode({
          'room_name': _roomName,
          'is_private': _isPrivate,
          'user_id': _userId
        }));
  }
}
