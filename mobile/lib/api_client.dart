import 'dart:convert';
import 'package:http/http.dart' as http;

class ApiClient {
  static const String _baseUrl = "http://10.0.2.2:5000";

  Future<Map<String, dynamic>> login(String email, String password) async {
    final response = await http.post(
      Uri.parse("$_baseUrl/api/users/getUserEmailPwd/"),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({"email": email, "password": password}),
    );
    return jsonDecode(response.body);
  }

  Future<List<dynamic>> getSchedule(String userId) async {
    final response = await http.get(
      Uri.parse('$_baseUrl/api/schedule/$userId'),
    );

    if (response.statusCode == 200) {
      return jsonDecode(response.body);
    } else {
      throw Exception('Failed to load schedule');
    }
  }

  Future<Map<String, dynamic>> googleSignInUp(String token) async {
    final response = await http.post(
      Uri.parse("$_baseUrl/api/users/googleSignInUpMobile/"),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer $token',
      },
    );
    return jsonDecode(response.body);
  }

  Future<List<Map<String, dynamic>>> fetchSchedule(String userId) async {
    final response =
        await http.get(Uri.parse('$_baseUrl/api/schedule/$userId'));
    final decodedData = json.decode(response.body) as List;
    return decodedData.map((data) => data as Map<String, dynamic>).toList();
  }

  Future<List<Map<String, dynamic>>> addExercise(String userId, String day,
      String exercise, String reps, String time, String instructions) async {
    print(day);
    final response = await http.post(
      Uri.parse('$_baseUrl/api/schedule/add/$userId'),
      headers: {
        'Content-Type': 'application/json',
      },
      body: json.encode({
        'day': day,
        'exercise': exercise,
        'reps': reps,
        'time': time,
        'instructions': instructions,
      }),
    );
    final decodedData = json.decode(response.body)['schedule'] as List;
    return decodedData.map((data) => data as Map<String, dynamic>).toList();
  }

  Future<Map<String, dynamic>> deleteExercise(
      String userId, String day, int exerciseIndex) async {
    final response = await http.post(
      Uri.parse('$_baseUrl/api/schedule/delete/$userId'),
      headers: {
        'Content-Type': 'application/json',
      },
      body: json.encode({
        'day': day,
        'exerciseIndex': exerciseIndex,
      }),
    );
    final decodedData = json.decode(response.body) as Map<String, dynamic>;
    return decodedData;
  }

  Future<Map<String, dynamic>> updateExercise(
      String userId,
      String day,
      String oldExercise,
      String newExercise,
      String reps,
      String time,
      String instructions) async {
    final response = await http.post(
      Uri.parse('$_baseUrl/api/schedule/update/$userId'),
      headers: {
        'Content-Type': 'application/json',
      },
      body: json.encode({
        'day': day,
        'oldExercise': oldExercise,
        'newExercise': newExercise,
        'reps': reps,
        'time': time,
        'instructions': instructions,
      }),
    );
    final decodedData = json.decode(response.body) as Map<String, dynamic>;
    final scheduleData = decodedData['schedule'] as List;
    final processedScheduleData =
        scheduleData.map((data) => data as Map<String, dynamic>).toList();
    return {
      'status': 'success',
      'schedule': processedScheduleData,
    };
  }
}
