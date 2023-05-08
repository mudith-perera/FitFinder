import 'package:flutter/material.dart';
import 'auth_service.dart';
import 'home_page.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:google_sign_in/google_sign_in.dart';

class LoginPage extends StatefulWidget {
  @override
  _LoginPageState createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  final TextEditingController _emailController = TextEditingController();
  final TextEditingController _passwordController = TextEditingController();
  final AuthService _authService = AuthService();

  bool _loginError = false;

  Widget _buildLogo() {
    return Image.asset(
      'assets/images/logo.png',
      width: 150,
      height: 150,
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Color(0xFF212529),
      body: Padding(
        padding: EdgeInsets.symmetric(horizontal: 20),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            _buildLogo(),
            Text(
              'Login',
              style: GoogleFonts.roboto(
                fontSize: 32,
                fontWeight: FontWeight.bold,
                color: Colors.white,
              ),
            ),
            SizedBox(height: 20),
            _buildEmailTextField(),
            SizedBox(height: 10),
            _buildPasswordTextField(),
            SizedBox(height: 20),
            ElevatedButton(
              onPressed: () async {
                try {
                  final loggedUserDetails = await _authService.login(
                    _emailController.text,
                    _passwordController.text,
                  );
                  Navigator.pushReplacement(
                    context,
                    MaterialPageRoute(
                      builder: (context) => HomePage(authService: _authService),
                    ),
                  );
                } catch (e) {
                  print('Error logging in: $e');
                  setState(() {
                    _loginError = true;
                  });
                  ScaffoldMessenger.of(context).showSnackBar(
                    SnackBar(
                      content: Text(
                        'Incorrect username or password',
                        style: TextStyle(color: Colors.white),
                      ),
                      backgroundColor: Color(0xFFFF592A),
                      duration: Duration(seconds: 3),
                    ),
                  );
                }
              },
              child: Text('Login'),
            ),
            SizedBox(height: 10),
            TextButton(
              onPressed: () async {
                try {
                  final loggedUserDetails =
                      await _authService.signInWithGoogle();
                  Navigator.pushReplacement(
                    context,
                    MaterialPageRoute(
                      builder: (context) => HomePage(authService: _authService),
                    ),
                  );
                } catch (e) {
                  print('Error logging in with Google: $e');
                  // Show error message to the user, for example using a Snackbar or a dialog.
                }
              },
              child: Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  Image.asset(
                    'assets/images/google.png',
                    height: 20.0,
                  ),
                  SizedBox(width: 5),
                  Text(
                    'Login with Google',
                    style: TextStyle(color: Colors.white),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  TextField _buildEmailTextField() {
    return TextField(
      controller: _emailController,
      keyboardType: TextInputType.emailAddress,
      decoration: InputDecoration(
        labelText: 'Email',
        labelStyle: TextStyle(color: Colors.white),
        border: OutlineInputBorder(),
        enabledBorder: OutlineInputBorder(
          borderSide:
              BorderSide(color: _loginError ? Colors.red : Colors.white),
        ),
        focusedBorder: OutlineInputBorder(
          borderSide:
              BorderSide(color: _loginError ? Colors.red : Colors.white),
        ),
      ),
      style: TextStyle(color: Colors.white),
    );
  }

  TextField _buildPasswordTextField() {
    return TextField(
      controller: _passwordController,
      obscureText: true,
      decoration: InputDecoration(
        labelText: 'Password',
        labelStyle: TextStyle(color: Colors.white),
        border: OutlineInputBorder(),
        enabledBorder: OutlineInputBorder(
          borderSide:
              BorderSide(color: _loginError ? Colors.red : Colors.white),
        ),
        focusedBorder: OutlineInputBorder(
          borderSide:
              BorderSide(color: _loginError ? Colors.red : Colors.white),
        ),
      ),
      style: TextStyle(color: Colors.white),
    );
  }
}
