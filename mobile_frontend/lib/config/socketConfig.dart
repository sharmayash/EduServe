import 'package:socket_io_client/socket_io_client.dart' as IO;

import './client.dart';

IO.Socket _socketClient = IO.io('http://$hostName:4000', <String, dynamic>{
  'transports': ['websocket'],
});

get socket {
  return _socketClient;
}
