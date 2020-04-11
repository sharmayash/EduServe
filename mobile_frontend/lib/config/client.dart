import 'package:flutter/cupertino.dart';
import 'package:graphql_flutter/graphql_flutter.dart';

String hostName = "localhost"; // For chrome
// String hostName = "10.0.2.2"; //Set "No Proxy" in android emulator settings.
// String hostName = "192.168.43.27"; // Set "manual proxy" with IP = yourIP and port = 4000.

class Config {
  static final HttpLink httpLink =
      HttpLink(uri: "http://$hostName:4000/graphql");

  static final WebSocketLink webSocketLink = WebSocketLink(
    url: "ws://$hostName:4000/graphql",
    config: SocketClientConfig(
      autoReconnect: true,
      inactivityTimeout: Duration(seconds: 30),
    ),
  );

  static final Link link = httpLink.concat(webSocketLink);

  static ValueNotifier<GraphQLClient> initailizeClient() {
    ValueNotifier<GraphQLClient> client = ValueNotifier(GraphQLClient(
      link: link,
      cache: OptimisticCache(dataIdFromObject: typenameDataIdFromObject),
    ));
    return client;
  }
}
