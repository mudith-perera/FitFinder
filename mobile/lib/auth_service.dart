import 'package:google_sign_in/google_sign_in.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'api_client.dart';

class AuthService {
  final ApiClient _apiClient = ApiClient();
  final GoogleSignIn _googleSignIn = GoogleSignIn(
    scopes: [
      'email',
      'openid',
      'https://www.googleapis.com/auth/userinfo.profile',
    ],
    clientId:
        '814415258055-mv8fm4il1t8m9mgruuf4tqgoos0vdkkh.apps.googleusercontent.com',
  );
  final FlutterSecureStorage _secureStorage = FlutterSecureStorage();

  Future<void> storeUserId(String userId) async {
    await _secureStorage.write(key: 'userId', value: userId);
  }

  Future<List<dynamic>> login(String email, String password) async {
    final response = await _apiClient.login(email, password);

    if (response['status'] == 'error') {
      throw Exception(response['message']);
    } else {
      final loggedUserDetails = [
        response["userType"],
        response["activeStatus"],
        response["firstname"],
        response["lastname"],
        response["email"],
        response["_id"],
        response["registeredGym"],
        response["registeredGymActivateStatus"],
      ];
      await _secureStorage.write(key: 'token', value: response['token']);
      await storeUserId(response["_id"]);
      return loggedUserDetails;
    }
  }

  Future<List<dynamic>> signInWithGoogle() async {
    try {
      final GoogleSignInAccount? googleUser = await _googleSignIn.signIn();
      if (googleUser == null) {
        throw Exception('Google Sign-In was cancelled');
      }
      final googleAuth = await googleUser.authentication;
      final String? token = googleAuth.idToken;
      if (token == null) {
        throw Exception('Google Sign-In failed: Missing idToken');
      }

      final response = await _apiClient.googleSignInUp(token);

      if (response['status'] == 'error') {
        throw Exception(response['message']);
      } else {
        final loggedUserDetails = [
          response["userType"],
          response["activeStatus"],
          response["firstname"],
          response["lastname"],
          response["email"],
          response["_id"],
          response["registeredGym"],
          response["registeredGymActivateStatus"],
        ];
        await _secureStorage.write(key: 'token', value: response['token']);
        await storeUserId(response["_id"]);
        return loggedUserDetails;
      }
    } catch (error) {
      throw Exception('Google Sign-In failed: $error');
    }
  }

  Future<List<dynamic>> getSchedule(String userId) async {
    try {
      final scheduleData = await _apiClient.getSchedule(userId);
      return scheduleData;
    } catch (error) {
      throw Exception('Error loading schedule: $error');
    }
  }

  Future<List<Map<String, dynamic>>> fetchSchedule(String userId) async {
    List<Map<String, dynamic>> schedule =
        await _apiClient.fetchSchedule(userId);
    for (Map<String, dynamic> day in schedule) {
      day['exercises'] = day['exercises'] ?? [];
      day['reps'] = day['reps'] ?? [];
      day['time'] = day['time'] ?? [];
      day['instructions'] = day['instructions'] ?? [];
    }
    return schedule;
  }

  Future<List<Map<String, dynamic>>> addExercise(String userId, String day,
      String exercise, String reps, String time, String instructions) async {
    return await _apiClient.addExercise(
        userId, day, exercise, reps, time, instructions);
  }

  Future<Map<String, dynamic>> deleteExercise(
      String userId, String day, int exerciseIndex) async {
    return await _apiClient.deleteExercise(userId, day, exerciseIndex);
  }

  Future<Map<String, dynamic>> updateExercise(
      String userId,
      String day,
      String oldExercise,
      String newExercise,
      String reps,
      String time,
      String instructions) async {
    Map<String, dynamic> result = await _apiClient.updateExercise(
        userId, day, oldExercise, newExercise, reps, time, instructions);
    if (result == null) {
      throw Exception('Error updating exercise');
    }
    return result;
  }

  Future<String> getToken() async {
    return await _secureStorage.read(key: 'token') ?? '';
  }

  Future<String?> getUserId() async {
    return await _secureStorage.read(key: 'userId');
  }

  Future<void> logout() async {
    await _secureStorage.delete(key: 'token');
    await _secureStorage.delete(key: 'userId');
    await _googleSignIn.signOut();
  }
}
