import 'package:flutter/material.dart';
import 'auth_service.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'login_page.dart';
import 'home_page.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'FitFinder',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: RootWidget(),
      initialRoute: '/',
      routes: {
        '/login': (context) => LoginPage(),
      },
    );
  }
}

class RootWidget extends StatefulWidget {
  @override
  _RootWidgetState createState() => _RootWidgetState();
}

class _RootWidgetState extends State<RootWidget> {
  final AuthService _authService = AuthService();
  final FlutterSecureStorage _secureStorage = FlutterSecureStorage();

  Widget _defaultHome = LoginPage();

  @override
  void initState() {
    super.initState();
    _checkUserLoggedIn();
  }

  void _checkUserLoggedIn() async {
    final String? userId = await _secureStorage.read(key: 'userId');
    if (userId != null) {
      setState(() {
        _defaultHome = HomePage(authService: _authService);
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return _defaultHome;
  }
}
