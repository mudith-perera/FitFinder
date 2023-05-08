import 'package:flutter/material.dart';
import 'package:fitfinder/auth_service.dart';

class LogoutButton extends StatelessWidget {
  final AuthService authService;

  LogoutButton({required this.authService});

  @override
  Widget build(BuildContext context) {
    return IconButton(
      icon: Icon(Icons.logout),
      onPressed: () async {
        await authService.logout();
        Navigator.pushReplacementNamed(context, '/login');
      },
    );
  }
}
