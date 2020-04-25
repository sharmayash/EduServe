import 'package:flutter/foundation.dart' show kIsWeb, ValueNotifier;
import 'package:graphql_flutter/graphql_flutter.dart';

get hostName {
  if (kIsWeb) {
    return "localhost"; // For chrome
  } else {
    // return "10.0.2.2"; //Set "No Proxy" in android emulator settings.
    return "192.168.43.27"; // Set "manual proxy" with IP = yourIP and port = 4000 in emulator
  }
}

class Config {
  static final HttpLink httpLink =
      HttpLink(uri: "http://$hostName:4000/graphql");

  static final Link link = httpLink;

  static ValueNotifier<GraphQLClient> initailizeClient() {
    ValueNotifier<GraphQLClient> client = ValueNotifier(GraphQLClient(
      link: link,
      cache: OptimisticCache(dataIdFromObject: typenameDataIdFromObject),
    ));
    return client;
  }
}
