import 'package:graphql_flutter/graphql_flutter.dart';

class Config {
  static final HttpLink httpLink =
      HttpLink(uri: "http://localhost:4000/graphql");

  // static final AuthLink authLink = AuthLink(
  //   getToken: () async => "",
  // );

  static final WebSocketLink webSocketLink = WebSocketLink(
    url: "ws://localhost:4000/graphql",
    config: SocketClientConfig(
      autoReconnect: true,
      inactivityTimeout: Duration(seconds: 30),
    ),
  );

  static final Link link = httpLink.concat(webSocketLink);

  static GraphQLClient initailizeClient() {
    GraphQLClient client = GraphQLClient(
      link: link,
      cache: OptimisticCache(dataIdFromObject: typenameDataIdFromObject),
    );
    return client;
  }
}
