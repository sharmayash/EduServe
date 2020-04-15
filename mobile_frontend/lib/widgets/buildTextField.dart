import 'package:flutter/material.dart';

class BuildTextField extends StatefulWidget {
  final ctx;
  final controller;
  final label;
  final keyboardType;
  final obscureText;
  BuildTextField(this.ctx, this.controller, this.label, this.keyboardType,
      this.obscureText);

  @override
  _BuildTextFieldState createState() => _BuildTextFieldState();
}

class _BuildTextFieldState extends State<BuildTextField> {
  @override
  Widget build(BuildContext context) {
    return Container(
      padding: EdgeInsets.symmetric(horizontal: 20),
      decoration: BoxDecoration(
          border: Border.all(color: Theme.of(widget.ctx).accentColor, width: 3),
          borderRadius: BorderRadius.all(Radius.circular(10))),
      child: TextField(
        controller: widget.controller,
        keyboardType: widget.keyboardType,
        obscureText: widget.obscureText,
        // onSubmitted: (_) => _onSubmitFunc,
        style: TextStyle(
          color: Colors.grey,
        ),
        cursorColor: Colors.grey,
        decoration: InputDecoration(
            labelStyle: TextStyle(color: Colors.grey),
            border: InputBorder.none,
            labelText: widget.label),
      ),
    );
  }
}
