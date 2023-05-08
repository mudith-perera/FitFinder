import 'package:flutter/material.dart';
import 'package:fitfinder/auth_service.dart';
import 'package:collection/collection.dart';

class ManageSchedule extends StatefulWidget {
  final AuthService authService;
  final String userId;
  final Function onScheduleUpdated;

  ManageSchedule(
      {required this.authService,
      required this.userId,
      required this.onScheduleUpdated});

  @override
  _ManageScheduleState createState() => _ManageScheduleState();
}

class _ManageScheduleState extends State<ManageSchedule> {
  String selectedDay = 'Sunday';
  String exercise = '';
  String reps = '';
  String time = '';
  String instructions = '';
  int? editIndex;
  String addExerciseButtonLabel = 'Add Exercise';

  TextEditingController exerciseController = TextEditingController();
  TextEditingController repsController = TextEditingController();
  TextEditingController timeController = TextEditingController();
  TextEditingController instructionsController = TextEditingController();

  List<Map<String, dynamic>> schedule = [];

  @override
  void initState() {
    super.initState();
    _loadSchedule();
  }

  Future<void> _loadSchedule() async {
    try {
      List<Map<String, dynamic>> loadedSchedule =
          await widget.authService.fetchSchedule(widget.userId);

      setState(() {
        schedule = loadedSchedule ?? [];
        // initialize as empty list if null
      });
    } catch (e) {
      print('Error loading schedule: $e');
    }
  }

  void _handleDayChange(String? value) {
    setState(() {
      selectedDay = value!;
    });
  }

  void _handleExerciseChange(String value) {
    setState(() {
      exercise = value;
    });
  }

  void _handleRepsChange(String value) {
    setState(() {
      reps = value;
    });
  }

  void _handleTimeChange(String value) {
    setState(() {
      time = value;
    });
  }

  void _handleInstructionsChange(String value) {
    setState(() {
      instructions = value;
    });
  }

  void _handleEdit(int index) {
    Map<String, dynamic> selectedSchedule =
        schedule.firstWhere((day) => day['day'] == selectedDay);
    setState(() {
      editIndex = index;
      exerciseController.text = selectedSchedule['exercises'][index] ?? '';
      repsController.text = selectedSchedule['reps'][index] ?? '';
      timeController.text = selectedSchedule['time'][index] ?? '';
      instructionsController.text =
          selectedSchedule['instructions'][index] ?? '';
      addExerciseButtonLabel = 'Update Exercise';

      // Update the variables with the values from the controllers
      exercise = exerciseController.text;
      reps = repsController.text;
      time = timeController.text;
      instructions = instructionsController.text;
    });
  }

  Future<void> _handleRemove(String day, int index) async {
    try {
      final Map<String, dynamic> updatedSchedule =
          await widget.authService.deleteExercise(widget.userId, day, index);
      setState(() {
        schedule = [...schedule]; // create a copy of the list
        // update the relevant day's exercises in the copied list
        schedule
            .firstWhere((day) => day['day'] == selectedDay)['exercises']
            .removeAt(index);
        schedule
            .firstWhere((day) => day['day'] == selectedDay)['reps']
            .removeAt(index);
        schedule
            .firstWhere((day) => day['day'] == selectedDay)['time']
            .removeAt(index);
        schedule
            .firstWhere((day) => day['day'] == selectedDay)['instructions']
            .removeAt(index);
        exercise = '';
        reps = '';
        time = '';
        instructions = '';
      });
      await _loadSchedule();
      widget.onScheduleUpdated();
    } catch (error) {
      print('Error removing exercise: $error');
    }
  }

  Future<void> _handleUpdate() async {
    // Get the current values from the controllers
    exercise = exerciseController.text ?? '';
    reps = repsController.text ?? '';
    time = timeController.text ?? '';
    instructions = instructionsController.text ?? '';

    // Check if the exercise field is empty
    if (exercise.isEmpty) {
      _showError('Exercise is required');
      return;
    }

    try {
      Map<String, dynamic>? selectedSchedule =
          schedule.firstWhereOrNull((day) => day['day'] == selectedDay);

      if (selectedSchedule == null) {
        _showError('Selected schedule not found');
        return;
      }

      String? selectedExercise =
          selectedSchedule['exercises']?[editIndex!] as String?;
      if (selectedExercise == null) {
        _showError('Selected exercise not found');
        return;
      }

      final Map<String, dynamic> updatedSchedule =
          await widget.authService.updateExercise(
        widget.userId,
        selectedDay,
        selectedExercise,
        exercise,
        reps,
        time,
        instructions,
      );

      if (updatedSchedule != null && updatedSchedule.isNotEmpty) {
        setState(() {
          exercise = '';
          reps = '';
          time = '';
          instructions = '';
          editIndex = null;
          addExerciseButtonLabel = 'Add Exercise';
        });

        await _loadSchedule();
        widget.onScheduleUpdated();
        exerciseController.clear();
        repsController.clear();
        timeController.clear();
        instructionsController.clear();
      } else {
        _showError('No schedule data received');
      }
    } catch (error) {
      print('Error updating exercise: $error');
    }
  }

  Future<void> _handleSubmit() async {
    // Get the current values from the controllers
    exercise = exerciseController.text ?? '';
    reps = repsController.text ?? '';
    time = timeController.text ?? '';
    instructions = instructionsController.text ?? '';

    // Check if the exercise field is empty
    if (exercise.isEmpty) {
      _showError('Exercise is required');
      return;
    }

    if (editIndex != null) {
      await _handleUpdate();
    } else {
      print(selectedDay);
      await widget.authService.addExercise(
          widget.userId, selectedDay, exercise, reps, time, instructions);
      // Trigger a rebuild of the widget
      setState(() {
        _loadSchedule();
        exercise = '';
        reps = '';
        time = '';
        instructions = '';
      });
      exerciseController.clear();
      repsController.clear();
      timeController.clear();
      instructionsController.clear();
      await _loadSchedule();
      widget.onScheduleUpdated();
    }
  }

  void _showError(String message) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(message),
        backgroundColor: Colors.red,
      ),
    );
  }

  @override
  void dispose() {
    exerciseController.dispose();
    repsController.dispose();
    timeController.dispose();
    instructionsController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Color(0xFF212529),
      appBar: AppBar(
        title: Text('Manage Schedule'),
        backgroundColor: Color(0xFF6a11cb),
      ),
      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              Container(
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(4),
                  color: Color(0xFF6a11cb),
                ),
                child: DropdownButtonHideUnderline(
                  child: DropdownButton<String>(
                    dropdownColor: Color(0xFF6a11cb),
                    value: selectedDay,
                    onChanged: (newValue) {
                      setState(() {
                        selectedDay = newValue!;
                      });
                    },
                    items: schedule.map<DropdownMenuItem<String>>((day) {
                      return DropdownMenuItem<String>(
                        value: day['day'],
                        child: Padding(
                          padding: const EdgeInsets.symmetric(horizontal: 8),
                          child: Text(
                            day['day'],
                            style: TextStyle(color: Colors.white),
                          ),
                        ),
                      );
                    }).toList(),
                  ),
                ),
              ),
              SizedBox(height: 8),
              Card(
                child: Padding(
                  padding: const EdgeInsets.all(8.0),
                  child: TextField(
                    controller: exerciseController,
                    onChanged: _handleExerciseChange,
                    decoration: InputDecoration(labelText: 'Exercise'),
                  ),
                ),
              ),
              Card(
                child: Padding(
                  padding: const EdgeInsets.all(8.0),
                  child: TextField(
                    controller: repsController,
                    onChanged: _handleRepsChange,
                    decoration: InputDecoration(labelText: 'Reps'),
                  ),
                ),
              ),
              Card(
                child: Padding(
                  padding: const EdgeInsets.all(8.0),
                  child: TextField(
                    controller: timeController,
                    onChanged: _handleTimeChange,
                    decoration: InputDecoration(labelText: 'Time'),
                  ),
                ),
              ),
              Card(
                child: Padding(
                  padding: const EdgeInsets.all(8.0),
                  child: TextField(
                    controller: instructionsController,
                    onChanged: _handleInstructionsChange,
                    decoration: InputDecoration(labelText: 'Instructions'),
                    maxLines: 4,
                  ),
                ),
              ),
              SizedBox(height: 16),
              ElevatedButton(
                onPressed: _handleSubmit,
                child: Text(addExerciseButtonLabel),
                style: ElevatedButton.styleFrom(
                  primary: Color(0xFF0b5ed7),
                  textStyle: TextStyle(fontWeight: FontWeight.bold),
                ),
              ),
              ListView.builder(
                shrinkWrap: true,
                itemCount: schedule.length,
                itemBuilder: (BuildContext context, int index) {
                  Map<String, dynamic> day = schedule[index];
                  if (day['day'] == selectedDay) {
                    return Column(
                      children:
                          day['exercises'].asMap().entries.map<Widget>((entry) {
                        int exerciseIndex = entry.key;
                        String exercise = entry.value;
                        return Card(
                          color: Color(0xFF6a11cb),
                          child: ListTile(
                            title: Text(exercise,
                                style: TextStyle(color: Colors.white)),
                            subtitle: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text('Reps: ${day['reps'][exerciseIndex]}',
                                    style: TextStyle(color: Colors.white)),
                                Text('Time: ${day['time'][exerciseIndex]}',
                                    style: TextStyle(color: Colors.white)),
                                Text(
                                    'Instructions: ${day['instructions'][exerciseIndex]}',
                                    style: TextStyle(color: Colors.white)),
                              ],
                            ),
                            trailing: Row(
                              mainAxisSize: MainAxisSize.min,
                              children: [
                                IconButton(
                                  icon: Icon(Icons.edit, color: Colors.white),
                                  onPressed: () => _handleEdit(exerciseIndex),
                                ),
                                IconButton(
                                  icon: Icon(Icons.delete, color: Colors.white),
                                  onPressed: () =>
                                      _handleRemove(selectedDay, exerciseIndex),
                                ),
                              ],
                            ),
                          ),
                        );
                      }).toList(),
                    );
                  } else {
                    return SizedBox.shrink();
                  }
                },
              ),
            ],
          ),
        ),
      ),
    );
  }
}
