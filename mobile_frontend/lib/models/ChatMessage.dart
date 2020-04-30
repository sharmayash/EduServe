class ChatMessage {
  String text;
  String sender;
  String senderId;
  String roomName;
  DateTime timestamp;

  ChatMessage(
      {this.text, this.sender, this.timestamp, this.roomName, this.senderId});
}
