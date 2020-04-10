import 'package:flutter/material.dart';

class MyDrwr extends StatelessWidget {
  Widget buildListTile(
      BuildContext context, String title, Function tapHandler) {
    return ListTile(
      title: Text(title, style: Theme.of(context).textTheme.headline1),
      onTap: tapHandler,
    );
  }

  @override
  Widget build(BuildContext context) {
    return Drawer(
      child: Container(
        color: Theme.of(context).backgroundColor,
        child: Column(
          children: <Widget>[
            Container(
              height: 100,
              color: Theme.of(context).primaryColor,
              width: double.infinity,
              padding: EdgeInsets.all(20),
              alignment: Alignment.center,
              child: Text(
                "EduServe",
                style: TextStyle(
                  fontWeight: FontWeight.w900,
                  fontSize: 20,
                  letterSpacing: 2.5,
                ),
              ),
            ),
            SizedBox(
              height: 20,
            ),
            buildListTile(context, "Log In", () {
              Navigator.of(context).pushNamed('/login');
            }),
            buildListTile(context, "Sign Up", () {
              Navigator.of(context).pushNamed('/signup');
            }),
          ],
        ),
      ),
    );
  }
}
