import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'auth_service.dart';
import 'logout_button.dart';
import 'package:fitfinder/manage_schedule.dart';

class HomePage extends StatefulWidget {
  final AuthService authService;

  HomePage({required this.authService});

  @override
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomePage>
    with SingleTickerProviderStateMixin {
  final AuthService authService = AuthService();
  String _selectedDay = "";
  List<dynamic> _schedule = [];
  String? _userId;
  String? _userEmail;
  late AnimationController _animationController;
  ValueNotifier<List<dynamic>> _scheduleNotifier = ValueNotifier([]);

  @override
  void initState() {
    super.initState();
    _animationController = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 1000),
    );
    _initializeData();
    _setCurrentDay();
    _animationController.forward();
  }

  void refreshSchedule() async {
    await _loadSchedule();
  }

  Future<void> _initializeData() async {
    await _loadUserId();
    await _loadSchedule();
    await _loadUserEmail();
  }

  _loadUserId() async {
    _userId = await widget.authService.getUserId();
  }

  _loadUserEmail() async {
    _userEmail = await widget.authService.getEmail();
  }

  _loadSchedule() async {
    if (_userId != null) {
      final schedule = await widget.authService.getSchedule(_userId!);
      _scheduleNotifier.value = schedule;
      setState(() {
        _schedule = schedule;
      });
    }
  }

  _setCurrentDay() {
    final daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    final currentDayIndex = DateTime.now().weekday;
    final currentDay = daysOfWeek[currentDayIndex];
    setState(() {
      _selectedDay = currentDay;
    });
  }

  _logout() async {
    await widget.authService.logout();
    Navigator.pushReplacementNamed(context, '/login');
  }

  @override
  void dispose() {
    _animationController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    // Check if the _schedule list is not empty and the _selectedDay is in the _schedule list
    final currentDaySchedule = _schedule.isNotEmpty &&
            _schedule.any((day) => day['day'] == _selectedDay)
        ? _schedule.firstWhere((day) => day['day'] == _selectedDay)
        : {'exercises': [], 'reps': [], 'time': [], 'instructions': []};

    return Scaffold(
      backgroundColor: Color(0xFF212529),
      appBar: AppBar(
        backgroundColor: Color(0xFF6a11cb), // Set AppBar color to purple
        title: Text(
          'FitFinder',
          style:
              TextStyle(color: Colors.white), // Set AppBar text color to white
        ),
        actions: [
          LogoutButton(authService: authService),
        ],
      ),
      body: Column(
        children: [
          Padding(
            padding: EdgeInsets.symmetric(vertical: 8, horizontal: 16),
            child: Text(
              'Welcome!, $_userEmail',
              style: GoogleFonts.roboto(
                fontSize: 20,
                fontWeight: FontWeight.bold,
                color: Colors.white,
              ),
            ),
          ),
          ElevatedButton(
            onPressed: () async {
              await Navigator.push(
                context,
                MaterialPageRoute(
                  builder: (context) => _userId != null
                      ? ManageSchedule(
                          authService: authService,
                          userId: _userId!,
                          onScheduleUpdated: refreshSchedule,
                        )
                      : Center(child: CircularProgressIndicator()),
                ),
              );
              refreshSchedule();
            },
            child: Text('Manage Schedule'),
            style: ElevatedButton.styleFrom(
              primary: Color(
                  0xFF6a11cb), // Replace 'Colors.blue' with your desired color.
            ),
          ),
          DropdownButton<String>(
            value: _selectedDay,
            onChanged: (String? newValue) {
              setState(() {
                _selectedDay = newValue!;
              });
            },
            dropdownColor:
                Color(0xFF212529), // Set dropdown background color to black
            style: TextStyle(
                color: Colors.white), // Set dropdown text color to white
            items: _schedule.map<DropdownMenuItem<String>>((dynamic day) {
              return DropdownMenuItem<String>(
                value: day['day'],
                child: Text(
                  day['day'],
                  style: TextStyle(
                      color: Colors
                          .white), // Set dropdown item text color to white
                ),
              );
            }).toList(),
          ),
          Expanded(
            child: ListView.builder(
              itemCount: currentDaySchedule['exercises'].length,
              itemBuilder: (context, index) {
                final exercise = currentDaySchedule['exercises'][index];
                final reps = currentDaySchedule['reps'][index];
                final time = currentDaySchedule['time'][index];
                final instructions = currentDaySchedule['instructions'][index];

                return FadeTransition(
                  opacity: Tween<double>(begin: 0, end: 1).animate(
                    CurvedAnimation(
                      parent: _animationController,
                      curve: Interval(
                        index * 0.1,
                        1.0,
                        curve: Curves.easeInOut,
                      ),
                    ),
                  ),
                  child: _buildExerciseCard(
                    exercise: exercise,
                    reps: reps,
                    time: time,
                    instructions: instructions,
                  ),
                );
              },
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildExerciseCard({
    required String exercise,
    required String reps,
    required String time,
    required String instructions,
  }) {
    return Card(
      color: Color(0xFF2B2E36),
      margin: EdgeInsets.symmetric(vertical: 8, horizontal: 16),
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
      child: Padding(
        padding: EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              exercise,
              style: GoogleFonts.roboto(
                fontSize: 18,
                fontWeight: FontWeight.bold,
                color: Colors.white,
              ),
            ),
            SizedBox(height: 8),
            if (reps.isNotEmpty)
              Text(
                'Reps: $reps',
                style: GoogleFonts.roboto(
                  color: Colors.white,
                ),
              ),
            if (time.isNotEmpty)
              Text(
                'Time: ${time} min',
                style: GoogleFonts.roboto(
                  color: Colors.white,
                ),
              ),
            if (instructions.isNotEmpty)
              Text(
                'Instructions: $instructions',
                style: GoogleFonts.roboto(
                  color: Colors.white,
                ),
              ),
          ],
        ),
      ),
    );
  }
}
