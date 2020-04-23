import 'package:flutter/cupertino.dart';
import 'package:socket_io_client/socket_io_client.dart' as IO;

class ChatProvider with ChangeNotifier {
  // Auth Related variables
  String _authToken;
  String _userId;
  IO.Socket socket = IO.io('http://192.168.43.27:4000', <String, dynamic>{
    'transports': ['websocket'],
  });

  ChatProvider(this._userId);

  // Chat Related variables
  String _setRoomName;
  List<Map> _previouschats = [];

  // Getters
  get roomName {
    return _setRoomName;
  }

  get chatMessages {
    return _previouschats;
  }

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
        _setRoomName = _roomName;
        print("Creating Room");
      } else {
        print(error);
      }
    });
  }

  Future<void> joinRoom(String _roomName, String _username) async {
    socket.emitWithAck('join', {
      'user_id': _userId,
      'username': _username,
      'room_name': _roomName,
    }, ack: (error, data) {
      if (error == null) {
        _setRoomName = _roomName;
        _previouschats = data;
        print("joining room");
      } else {
        print(error);
      }
    });
  }
}
